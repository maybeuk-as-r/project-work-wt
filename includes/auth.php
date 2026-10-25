<?php
declare(strict_types=1);

// Start a protected browser session.
session_set_cookie_params([
    'httponly' => true,
    'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
    'samesite' => 'Lax',
]);
session_start();
require_once __DIR__ . '/../config/db.php';

// Return the signed-in user.
function user(): ?array
{
    return $_SESSION['user'] ?? null;
}

// Protect a page and optional roles.
function require_login(array $roles = []): array
{
    $current = user();
    if (!$current) {
        header('Location: ' . url('pages/login.php'));
        exit;
    }
    if ($roles && !in_array($current['role'], $roles, true)) {
        header('Location: ' . url('dashboard.php'));
        exit;
    }
    return $current;
}

// Store a safe user session after login.
function login(array $account): void
{
    session_regenerate_id(true);
    $_SESSION['user'] = [
        'id' => (int) $account['id'],
        'full_name' => $account['full_name'],
        'email' => $account['email'],
        'role' => $account['role'],
    ];
}

// Create one token per session.
function csrf(): string
{
    $_SESSION['csrf'] ??= bin2hex(random_bytes(32));
    return $_SESSION['csrf'];
}

// Reject forged form submissions.
function check_csrf(): void
{
    if (!hash_equals($_SESSION['csrf'] ?? '', $_POST['csrf'] ?? '')) {
        http_response_code(419);
        exit('Invalid form token. Please go back and try again.');
    }
}

// Escape text for HTML output.
function e(?string $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}

// Redirect with an optional message.
function redirect(string $path, string $message = ''): never
{
    if ($message) $_SESSION['flash'] = $message;
    header('Location: ' . url($path));
    exit;
}

// Build paths for root or subfolder installs.
function url(string $path = ''): string
{
    $script = $_SERVER['SCRIPT_NAME'] ?? '';
    if (!str_contains($path, '/') && str_contains($script, '/pages/')) {
        return rtrim(dirname($script), '/') . '/' . $path;
    }
    $marker = strpos($script, '/pages/');
    $base = $marker === false ? rtrim(dirname($script), '/') : substr($script, 0, $marker);
    return $base . '/' . ltrim($path, '/');
}

// Read a message once.
function flash(): ?string
{
    $message = $_SESSION['flash'] ?? null;
    unset($_SESSION['flash']);
    return $message;
}

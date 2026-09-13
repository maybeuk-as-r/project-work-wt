<?php
declare(strict_types=1);
session_start();
require_once __DIR__ . '/../config/db.php';

function user(): ?array
{
    return $_SESSION['user'] ?? null;
}

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

function csrf(): string
{
    $_SESSION['csrf'] ??= bin2hex(random_bytes(32));
    return $_SESSION['csrf'];
}

function check_csrf(): void
{
    if (!hash_equals($_SESSION['csrf'] ?? '', $_POST['csrf'] ?? '')) {
        http_response_code(419);
        exit('Invalid form token. Please go back and try again.');
    }
}

function e(?string $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}

function redirect(string $path, string $message = ''): never
{
    if ($message) $_SESSION['flash'] = $message;
    header('Location: ' . url($path));
    exit;
}

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

function flash(): ?string
{
    $message = $_SESSION['flash'] ?? null;
    unset($_SESSION['flash']);
    return $message;
}

<?php
require_once __DIR__ . '/../includes/auth.php';
if (user()) redirect('/dashboard.php');
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    check_csrf();
    $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    $password = $_POST['password'] ?? '';
    $stmt = db()->prepare('SELECT id, full_name, email, password, role FROM users WHERE email=? AND is_active=1');
    $stmt->execute([$email]);
    $found = $stmt->fetch();
    if ($found && password_verify($password, $found['password'])) {
        unset($found['password']); $_SESSION['user'] = $found; redirect('/dashboard.php');
    }
    $error = 'Invalid email or password.';
}
?>
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Login | Smart Attendance</title><link rel="stylesheet" href="../css/style.css"></head><body class="auth-page"><div class="auth-shell"><div class="auth-visual"><a class="brand light" href="../index.php"><span class="brand-mark">SA</span><span>Smart Attendance</span></a><div><span class="eyebrow">SECURE PORTAL</span><h1>Attendance at a glance.</h1><p>Sign in to access your role-based dashboard and attendance information.</p></div><div class="auth-note">Admin • Teacher • Student</div></div><div class="auth-form-wrap"><a class="back-link" href="../index.php">← Back to home</a><div class="form-box"><span class="eyebrow">WELCOME BACK</span><h2>Sign in</h2><p class="muted">Use your assigned account to continue.</p><?php if ($error): ?><p class="error"><?= e($error) ?></p><?php endif; ?><form method="post"><input type="hidden" name="csrf" value="<?= e(csrf()) ?>"><div class="form-group"><label>Email address</label><input name="email" type="email" placeholder="you@example.com" required value="<?= e($_POST['email'] ?? '') ?>"></div><div class="form-group"><label>Password</label><div class="password-field"><input id="loginPassword" name="password" type="password" placeholder="Your password" required><button type="button" class="show-password" data-target="loginPassword">Show</button></div></div><button class="btn btn-primary full" type="submit">Sign In</button></form><p class="muted">New student? <a href="register.php">Create an account</a></p><p class="muted"><strong>Demo:</strong> admin@smart.test / password</p></div></div></div><script src="../js/app.js"></script></body></html>

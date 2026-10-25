<?php
require_once __DIR__ . '/../includes/auth.php';
$error = '';

// Register a student with a hashed password.
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    check_csrf();
    $name = trim($_POST['full_name'] ?? ''); $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL); $password = $_POST['password'] ?? '';
    if (strlen($name) < 2 || !$email || strlen($password) < 6) $error = 'Enter a name, valid email and a password of at least 6 characters.';
    else {
        try { db()->prepare("INSERT INTO users (full_name,email,password,role) VALUES (?,?,?,'student')")->execute([$name, $email, password_hash($password, PASSWORD_DEFAULT)]); redirect('pages/login.php', 'Account created. Please sign in.'); }
        catch (PDOException $e) { $error = 'That email address is already registered.'; }
    }
}
?>
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Register | Smart Attendance</title><link rel="stylesheet" href="../css/style.css"></head><body class="auth-page"><div class="auth-shell"><div class="auth-visual"><a class="brand light" href="../index.php"><span class="brand-mark">SA</span><span>Smart Attendance</span></a><div><span class="eyebrow">STUDENT PORTAL</span><h1>Start tracking better.</h1><p>Create a student account to view your attendance once your administrator assigns you to a class.</p></div></div><div class="auth-form-wrap"><a class="back-link" href="../index.php">← Back to home</a><div class="form-box"><span class="eyebrow">CREATE ACCOUNT</span><h2>Register</h2><?php if ($error): ?><p class="error"><?= e($error) ?></p><?php endif; ?><form method="post"><input type="hidden" name="csrf" value="<?= e(csrf()) ?>"><div class="form-group"><label>Full name</label><input name="full_name" required value="<?= e($_POST['full_name'] ?? '') ?>"></div><div class="form-group"><label>Email address</label><input name="email" type="email" required value="<?= e($_POST['email'] ?? '') ?>"></div><div class="form-group"><label>Password</label><input name="password" type="password" minlength="6" required></div><button class="btn btn-primary full" type="submit">Create Student Account</button></form><p class="muted">Already registered? <a href="login.php">Sign in</a></p></div></div></div></body></html>

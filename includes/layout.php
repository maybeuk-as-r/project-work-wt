<?php
require_once __DIR__ . '/auth.php';

// Render the shared dashboard header.
function page_start(string $title, ?array $current = null): void
{
    $current ??= user();
    $role = $current['role'] ?? '';
    $name = $current['full_name'] ?? 'Guest';
    ?>
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title><?= e($title) ?> | Smart Attendance</title><link rel="stylesheet" href="<?= e(url('css/style.css')) ?>"></head><body class="dashboard-body"><div class="dashboard-layout"><aside class="sidebar"><a class="brand" href="<?= e(url('index.php')) ?>"><span class="brand-mark">SA</span><span>Smart Attendance</span></a><div class="side-role"><span class="avatar"><?= e(strtoupper(substr($name, 0, 1))) ?></span><div><strong><?= e($name) ?></strong><small><?= e(ucfirst($role)) ?> Portal</small></div></div><nav class="side-nav"><a href="<?= e(url('/dashboard.php')) ?>">⌂ <span>Dashboard</span></a><?php if ($role === 'admin'): ?><a href="<?= e(url('pages/users.php')) ?>">👥 <span>Users</span></a><a href="<?= e(url('pages/classes.php')) ?>">▦ <span>Classes</span></a><?php endif; ?><?php if ($role === 'teacher'): ?><a href="<?= e(url('pages/classes.php')) ?>">▦ <span>My Classes</span></a><a href="<?= e(url('pages/attendance.php')) ?>">✓ <span>Attendance</span></a><?php endif; ?><?php if ($role === 'student'): ?><a href="<?= e(url('pages/attendance.php')) ?>">✓ <span>My Attendance</span></a><?php endif; ?><a href="<?= e(url('pages/reports.php')) ?>">▥ <span>Reports</span></a><a href="<?= e(url('pages/profile.php')) ?>">◉ <span>Profile</span></a></nav><a class="logout" href="<?= e(url('pages/logout.php')) ?>">↪ <span>Logout</span></a></aside><main class="main-area"><header class="topbar"><button class="mobile-sidebar" aria-label="Menu">☰</button><div><p class="breadcrumb">Portal / <?= e($title) ?></p><h1><?= e($title) ?></h1></div><div class="top-user"><span class="avatar"><?= e(strtoupper(substr($name, 0, 1))) ?></span><div class="top-user-text"><strong><?= e($name) ?></strong><small><?= e(ucfirst($role)) ?></small></div></div></header><?php if ($note = flash()): ?><div class="panel" style="border-color:#80bf91;color:#1c7d39"><?= e($note) ?></div><?php endif; ?>
<?php }

// Close the shared dashboard layout.
function page_end(): void { ?>
</main></div><script src="<?= e(url('js/app.js')) ?>"></script></body></html>
<?php }

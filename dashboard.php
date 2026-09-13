<?php
require_once __DIR__ . '/includes/layout.php';
$me = require_login();
$pdo = db();
if ($me['role'] === 'admin') {
    $stats = [
        ['Total Students', $pdo->query("SELECT COUNT(*) FROM users WHERE role='student'")->fetchColumn(), 'Registered learners'],
        ['Total Teachers', $pdo->query("SELECT COUNT(*) FROM users WHERE role='teacher'")->fetchColumn(), 'Teaching staff'],
        ['Classes', $pdo->query('SELECT COUNT(*) FROM classes')->fetchColumn(), 'Active classes'],
        ['Today Records', $pdo->query('SELECT COUNT(*) FROM attendance WHERE attendance_date=CURDATE()')->fetchColumn(), 'Attendance entries'],
    ];
} elseif ($me['role'] === 'teacher') {
    $stats = [
        ['My Classes', $pdo->prepare('SELECT COUNT(*) FROM classes WHERE teacher_id=?'), 'Assigned classes'],
        ['Today Records', $pdo->prepare('SELECT COUNT(*) FROM attendance a JOIN classes c ON c.id=a.class_id WHERE c.teacher_id=? AND a.attendance_date=CURDATE()'), 'Recorded today'],
    ];
    foreach ($stats as &$stat) { $stat[1]->execute([$me['id']]); $stat[1] = $stat[1]->fetchColumn(); }
} else {
    $stmt = $pdo->prepare("SELECT COUNT(*), COALESCE(SUM(status IN ('present','late')),0) FROM attendance WHERE student_id=?"); $stmt->execute([$me['id']]); [$total, $present] = $stmt->fetch(PDO::FETCH_NUM);
    $stats = [['Attendance', $total ? round($present / $total * 100) . '%' : '—', 'Overall rate'], ['Recorded Sessions', $total, 'Available history']];
}
page_start(ucfirst($me['role']) . ' Dashboard', $me); ?>
<section class="stats-grid"><?php foreach ($stats as $s): ?><div class="stat-card"><span><?= e((string)$s[0]) ?></span><strong><?= e((string)$s[1]) ?></strong><small class="positive"><?= e((string)$s[2]) ?></small></div><?php endforeach; ?></section>
<section class="panel"><div class="panel-heading"><div><h2>Welcome back, <?= e(explode(' ', $me['full_name'])[0]) ?></h2><p><?= $me['role'] === 'admin' ? 'Use the sidebar to manage users and classes.' : ($me['role'] === 'teacher' ? 'Create or update attendance from your class list.' : 'Review your latest attendance records and profile.') ?></p></div><?php if ($me['role'] === 'teacher'): ?><a class="btn btn-primary" href="<?= e(url('pages/attendance.php')) ?>">Record Attendance</a><?php elseif ($me['role'] === 'admin'): ?><a class="btn btn-primary" href="<?= e(url('pages/users.php')) ?>">Manage Users</a><?php else: ?><a class="btn btn-primary" href="<?= e(url('pages/attendance.php')) ?>">View History</a><?php endif; ?></div></section>
<?php page_end(); ?>

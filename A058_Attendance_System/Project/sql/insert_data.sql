USE smart_attendance;

-- Demo account password: password
INSERT INTO users (id, full_name, email, password, role) VALUES
(1, 'System Admin', 'admin@smart.test', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'admin'),
(2, 'Aisha Khan', 'teacher@smart.test', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'teacher'),
(3, 'Rohan Mehta', 'student@smart.test', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'student'),
(4, 'Priya Shah', 'priya@smart.test', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'student');

INSERT INTO classes (id, class_code, class_name, teacher_id) VALUES
(1, 'BCA-101', 'Web Technology', 2),
(2, 'BCA-102', 'Database Systems', 2);

INSERT INTO enrollments (class_id, student_id) VALUES
(1, 3), (1, 4), (2, 3);

INSERT INTO attendance (class_id, student_id, attendance_date, status, recorded_by) VALUES
(1, 3, CURDATE(), 'present', 2),
(1, 4, CURDATE(), 'late', 2),
(2, 3, DATE_SUB(CURDATE(), INTERVAL 1 DAY), 'present', 2);

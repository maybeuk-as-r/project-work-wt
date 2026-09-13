# Smart Attendance Management System — PHP & MySQL

## Features
- Three role-specific dashboards: Admin, Teacher and Student
- Admin CRUD for user accounts and classes
- Student enrollment management
- Teacher attendance create, update and delete operations
- Student attendance history and role-filtered reports

## Technologies
- PHP 8+
- MySQL / MariaDB
- PDO
- HTML5, CSS3 and Vanilla JavaScript

## How to run with XAMPP/WAMP
1. Extract this folder into `htdocs` (XAMPP) or `www` (WAMP).
2. Start Apache and MySQL.
3. Open phpMyAdmin and import `database.sql`.
4. Check MySQL settings in `config/db.php` (XAMPP defaults are `root` with no password).
5. Open `http://localhost/project-work-wt-main/`.

## Demo accounts
- Admin: `admin@smart.test` / `password`
- Teacher: `teacher@smart.test` / `password`
- Student: `student@smart.test` / `password`

## Pages
- `index.php` — responsive home page
- `pages/login.php` and `pages/register.php` — authentication
- `dashboard.php` — role-based dashboard
- `pages/users.php` — admin user CRUD
- `pages/classes.php` — class and enrollment CRUD
- `pages/attendance.php` — attendance CRUD and history
- `pages/reports.php` — role-filtered attendance reports
- `pages/profile.php` — profile update

## Security
The application uses prepared queries, password hashing, role checks and CSRF-protected forms.

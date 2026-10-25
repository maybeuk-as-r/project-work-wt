# Smart Attendance Management System

## Overview

This project is a PHP and MySQL web application for managing academic attendance. It offers separate Administrator, Teacher and Student dashboards with role-based access.

## Features

- User, class and enrollment management
- Teacher attendance create and update workflow
- Student attendance history and reports
- Authenticated PHP sessions with role checks
- Password hashing with `password_hash` and login verification with `password_verify`
- CSRF protection and PDO prepared queries

## Prerequisites

- XAMPP or WAMP
- PHP 8 or later with PDO MySQL enabled
- MySQL or MariaDB
- A modern web browser

## Folder Layout

- `src/` contains the PHP source code, CSS and JavaScript files.
- `sql/` contains the database setup scripts.

## Database Setup

1. Start Apache and MySQL in XAMPP or WAMP.
2. Open phpMyAdmin.
3. Run the scripts in this order:
   1. `sql/create_database.sql`
   2. `sql/create_tables.sql`
   3. `sql/insert_data.sql`
4. Confirm the database connection settings in `src/config/db.php`.

## Running the Project

1. Copy the contents of `Project/src` into a new folder inside XAMPP `htdocs` or WAMP `www`.
2. Open that folder through localhost, for example `http://localhost/smart-attendance/`.
3. Sign in with one of the demo accounts.

## Demo Accounts

| Role | Email | Password |
| --- | --- | --- |
| Administrator | `admin@smart.test` | `password` |
| Teacher | `teacher@smart.test` | `password` |
| Student | `student@smart.test` | `password` |

## Configuration

Default XAMPP database settings use host `localhost`, user `root` and an empty password. Update `src/config/db.php` if your local MySQL configuration differs.

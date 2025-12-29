CREATE TABLE users (
  email VARCHAR(100) PRIMARY KEY,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'student') NOT NULL
);

INSERT INTO users (email, password, role) VALUES
('admin1@sunbeam.com', 'adminpass1', 'admin'),
('student1@gmail.com', 'pass123', 'student'),
('student2@gmail.com', 'pass234', 'student'),
('student3@gmail.com', 'pass345', 'student'),
('student4@gmail.com', 'pass456', 'student'),
('student5@gmail.com', 'pass567', 'student'),
('student6@gmail.com', 'pass678', 'student'),
('student7@gmail.com', 'pass789', 'student'),
('student8@gmail.com', 'pass890', 'student'),
('student9@gmail.com', 'pass901', 'student');

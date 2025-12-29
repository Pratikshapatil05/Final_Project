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

----------Courses Table-----------

CREATE TABLE courses (
  course_id int NOT NULL AUTO_INCREMENT,
  course_name varchar(100) NOT NULL,
  description varchar(255) DEFAULT NULL,
  fees int NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  video_expire_days int NOT NULL,
  PRIMARY KEY (course_id)
)

INSERT INTO courses
(course_id, course_name, description, fees, start_date, end_date, video_expire_days)
VALUES
(1, 'Old Java', 'Core Java Basics', 20000, '2025-01-01', '2025-03-01', 59),

(2, 'C Programming', 'Procedural Programming', 18000, '2025-02-01', '2025-04-01', 59),

(3, 'Full Stack Development', 'HTML, CSS, JS, React, Node', 45000, '2025-05-10', '2025-12-10', 214),

(4, 'Data Science', 'Python, ML, Deep Learning', 55000, '2025-06-01', '2025-12-05', 187),

(5, 'Cyber Security', 'Ethical Hacking, Network Security', 40000, '2025-10-01', '2026-02-01', 123),

(6, 'AI & Machine Learning', 'Neural Networks, NLP', 60000, '2025-11-01', '2026-03-01', 120),

(7, 'DevOps Engineering', 'CI/CD, Docker, Kubernetes', 58000, '2025-12-01', '2026-04-01', 121),

(8, 'Cloud Computing', 'AWS, Azure, DevOps Basics', 50000, '2026-01-10', '2026-05-10', 120),

(9, 'Android Development', 'Kotlin, Android Studio', 42000, '2026-02-01', '2026-06-01', 120),

(10, 'Web Designing', 'HTML, CSS, UI/UX, Bootstrap', 30000, '2026-03-01', '2026-07-01', 122),

(11, 'Networking Essentials', 'Routing, Switching, CCNA Basics', 32000, '2026-04-01', '2026-08-01', 122);


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


----------student table---------

CREATE TABLE students (
  reg_no int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  course_id int NOT NULL,
  mobile_no bigint NOT NULL,
  profile_pic blob,
  PRIMARY KEY (reg_no),
  KEY fk_students_users (email),
  KEY fk_students_courses (course_id),
  CONSTRAINT fk_students_courses FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_students_users FOREIGN KEY (email) REFERENCES users (email) ON DELETE CASCADE ON UPDATE CASCADE
)

INSERT INTO students
(reg_no, name, email, course_id, mobile_no, profile_pic)
VALUES
(101, 'Aarav Patil', 'student1@gmail.com', 5, 9876543201, NULL),

(102, 'Riya Sharma', 'student2@gmail.com', 1, 9876543202, NULL),

(103, 'Kabir Singh', 'student3@gmail.com', 2, 9876543203, NULL),

(104, 'Anaya Mehta', 'student4@gmail.com', 2, 9876543204, NULL),

(105, 'Ishaan Deshmukh', 'student5@gmail.com', 3, 9876543205, NULL),

(106, 'Saanvi Joshi', 'student6@gmail.com', 3, 9876543206, NULL),

(107, 'Vivaan Kulkarni', 'student7@gmail.com', 1, 9876543207, NULL),

(108, 'Diya Rane', 'student8@gmail.com', 2, 9876543208, NULL),

(109, 'Atharv Pawar', 'student9@gmail.com', 3, 9876543209, NULL);




----------------videos table--------------------
CREATE TABLE videos (
    video_id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description VARCHAR(255),
    youtube_url VARCHAR(255) NOT NULL,
    added_at DATE NOT NULL,
    CONSTRAINT fk_videos_courses 
        FOREIGN KEY (course_id) 
        REFERENCES courses(course_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);




INSERT INTO videos
(video_id, course_id, title, description, youtube_url, added_at)
VALUES
(1, 1, 'Intro to Full Stack', 'Overview of full stack development', 'https://youtu.be/fsd101', '2025-01-01'),

(2, 2, 'Data Science Basics', 'What is data science?', 'https://youtu.be/ds102', '2025-02-01'),

(3, 3, 'Cyber Security Intro', 'Basics of security', 'https://youtu.be/cs103', '2025-05-10'),

(4, 4, 'Cloud Intro', 'AWS and Azure overview', 'https://youtu.be/cloud104', '2025-06-01'),

(5, 5, 'AI Overview', 'Understanding AI & ML', 'https://youtu.be/ai105', '2025-10-01'),

(6, 6, 'Web Design Basics', 'HTML & CSS introduction', 'https://youtu.be/wd106', '2025-11-01'),

(7, 7, 'Android Setup', 'Kotlin & Android Studio setup', 'https://youtu.be/ad107', '2025-12-01'),

(8, 8, 'DBMS Concepts', 'Database basics explained', 'https://youtu.be/db108', '2026-01-10'),

(9, 9, 'DevOps Starter', 'CI/CD basics', 'https://youtu.be/dev109', '2026-02-01'),

(10, 10, 'Python Introduction', 'Basics of Python', 'https://youtu.be/py110', '2026-03-01'),

(11, 11, 'Networking Basics', 'Routing & switching intro', 'https://youtu.be/net111', '2026-04-01');




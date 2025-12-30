import AppNavbar from "../components/AppNavbar";

function About() {
  return (
    <>
      <AppNavbar />
      <div className="container mt-5">
        <h2 className="mb-3">About This Project</h2>

        <p>
          This application is a full-stack learning management platform developed as part
          of a MERN internship project. It is designed to provide a secure, scalable, and
          user-friendly system for managing courses, students, and learning content.
        </p>

        <p>
          The platform supports role-based access, allowing administrators to create and
          manage courses and videos, while students can enroll in courses and access
          learning materials within defined time limits.
        </p>

        <p>
          With JWT-based authentication, protected APIs, and a clean React interface,
          this project demonstrates practical implementation of modern web technologies,
          focusing on real-world application design, security, and usability.
        </p>
      </div>
    </>
  );
}

export default About;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AppNavbar from "../../components/AppNavbar";
import { getAllCourses, deleteCourseById } from "../../services/courseService";
import { toast } from "react-toastify";

function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (token) {
      loadCourses();
    }
  }, [token]);

  const loadCourses = async (sDate, eDate) => {
    const result = await getAllCourses(token, sDate, eDate);

    if (result.status === "success") {
      setCourses(result.data);
    } else {
      toast.error(result.error);
      setCourses([]);
    }
  };

  const applyFilter = () => {
    if (!startDate || !endDate) {
      toast.warn("Please select both dates");
      return;
    }
    loadCourses(startDate, endDate);
  };

  const clearFilter = () => {
    setStartDate("");
    setEndDate("");
    loadCourses(); // load all courses again
  };

  const deleteCourse = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    const result = await deleteCourseById(courseId, token);

    if (result.status === "success") {
      toast.success("Course deleted");
      loadCourses(startDate, endDate);
    } else {
      toast.error(result.error);
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <>
      <AppNavbar />

      <div className="container mt-4">
        <h2 className="text-center mb-3">All Courses</h2>

        {/* 🔍 FILTER BOX */}
        <div className="row mb-4">
          <div className="col-md-3">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">End Date</label>
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="col-md-3 d-flex align-items-end">
            <button className="btn btn-primary me-2" onClick={applyFilter}>
              Filter
            </button>

            <button className="btn btn-secondary" onClick={clearFilter}>
              Clear
            </button>
          </div>
        </div>

        {/* 📋 TABLE */}
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Course Name</th>
              <th>Description</th>
              <th>Fees</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Expire Days</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  No courses found
                </td>
              </tr>
            ) : (
              courses.map((c) => (
                <tr key={c.course_id}>
                  <td>{c.course_id}</td>
                  <td>{c.course_name}</td>
                  <td>{c.description}</td>
                  <td>₹{c.fees}</td>
                  <td>{formatDate(c.start_date)}</td>
                  <td>{formatDate(c.end_date)}</td>
                  <td>{c.video_expire_days}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() =>
                        navigate("/admin/update-course", {
                          state: { course: c },
                        })
                      }
                    >
                      ✏️
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteCourse(c.course_id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AllCourses;

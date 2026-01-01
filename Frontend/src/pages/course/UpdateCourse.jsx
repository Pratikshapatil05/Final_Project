import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { updateCourse } from "../../services/courseService"
import AppNavbar from "../../components/AppNavbar"
import { toast } from "react-toastify"

function UpdateCourse() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const token = sessionStorage.getItem("token")

  if (!state?.course) {
    return <div className="container mt-4">No course data</div>
  }

  const [course, setCourse] = useState({
    course_name: "",
    description: "",
    start_date: "",
    end_date: "",
    fees: "",
    video_expire_days: ""
  })

  // PRE-FILL FORM
  useEffect(() => {
    setCourse({
      course_name: state.course.course_name,
      description: state.course.description,
      start_date: state.course.start_date?.slice(0, 10),
      end_date: state.course.end_date?.slice(0, 10),
      fees: state.course.fees,
      video_expire_days: state.course.video_expire_days
    })
  }, [state.course])

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value })
  }

  const submit = async () => {
    const result = await updateCourse(
      state.course.course_id,
      course,
      token
    )

    if (result.status === "success") {
      toast.success("Course updated successfully")
      navigate("/course/all-courses")
    } else {
      toast.error(result.error)
    }
  }

  return (
    <>
      <AppNavbar />

      <div className="container mt-4 w-50">
        <div className="shadow-lg border rounded p-4">

          <h2 className="mb-4 text-center">Update Course</h2>

          <div className="mb-3">
            <label className="form-label">Course Name</label>
            <input
              type="text"
              name="course_name"
              className="form-control"
              value={course.course_name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              type="text"
              name="description"
              className="form-control"
              value={course.description}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              name="start_date"
              className="form-control"
              value={course.start_date}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">End Date</label>
            <input
              type="date"
              name="end_date"
              className="form-control"
              value={course.end_date}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Fees</label>
            <input
              type="number"
              name="fees"
              className="form-control"
              value={course.fees}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Video Expire Days</label>
            <input
              type="number"
              name="video_expire_days"
              className="form-control"
              value={course.video_expire_days}
              onChange={handleChange}
            />
          </div>

          <button
            className="btn btn-success d-block mx-auto"
            onClick={submit}
          >
            Update Course
          </button>

        </div>
      </div>
    </>
  )
}

export default UpdateCourse
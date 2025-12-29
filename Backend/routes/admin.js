const express = require('express')
const pool = require('../db/pool')
const result = require('../utils/result')
const auth = require('../utils/auth')

const router = express.Router()

// GET /admin/enrolled-students (ADMIN)
router.get('/enrolled-students', auth.authAdmin, (req, res) => {

  const { course_id } = req.query

  let sql = `
    SELECT
      s.reg_no,
      s.name,
      s.email,
      s.mobile_no,
      c.course_id,
      c.course_name
    FROM students s
    INNER JOIN courses c
      ON s.course_id = c.course_id
  `

  let params = []

  
  if (course_id) {
    sql += ` WHERE s.course_id = ?`
    params.push(course_id)
  }

  pool.query(sql, params, (error, data) => {
    res.send(result.createResult(error, data))
  })
})

module.exports = router

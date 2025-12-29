const express = require('express')
const cryptojs = require('crypto-js')
const jwt = require('jsonwebtoken')

const pool = require('../db/pool')
const result = require('../utils/result')
const config = require('../utils/config')
const auth = require('../utils/auth')

const router = express.Router()

// POST /student/login
router.post('/login', (req, res) => {
  const { email, password } = req.body

  const hashedPassword = cryptojs.SHA256(password).toString()

  const sql = `
    SELECT email, role 
    FROM users 
    WHERE email = ? AND password = ?
  `

  pool.query(sql, [email, hashedPassword], (error, data) => {
    if (error) {
      res.send(result.createResult(error))
    } else if (data.length === 0) {
      res.send(result.createResult('Invalid email or password'))
    } else {
      const user = data[0]

      const payload = {
        email: user.email,
        role: user.role
      }

      const token = jwt.sign(payload, config.SECRET)

      const UserData = {
        email: user.email,
        role: user.role,
        token
      }

      res.send(result.createResult(null, UserData))
    }
  })
})

router.post('/register-to-course', (req, res) => {

  const { course_id, email, name, mobile_no } = req.body

  // 1. Check if user exists
  const checkUserSql = `SELECT email FROM users WHERE email = ?`

  pool.query(checkUserSql, [email], (error, users) => {
    if (error) {
      res.send(result.createResult(error))
    } 
    else {
      
      if (users.length === 0) {

    
        const hashedPassword = cryptojs.SHA256('sunbeam').toString()

        const insertUserSql = `
          INSERT INTO users (email, password, role)
          VALUES (?, ?, 'student')
        `

        pool.query(insertUserSql, [email, hashedPassword], (err1) => {
          if (err1) {
            res.send(result.createResult(err1))
          } else {
      
            insertIntoStudents()
          }
        })

      } else {

        insertIntoStudents()
      }
    }
  })

  
  function insertIntoStudents() {
    const insertStudentSql = `
      INSERT INTO students (name, email, course_id, mobile_no)
      VALUES (?, ?, ?, ?)
    `

    pool.query(
      insertStudentSql,
      [name, email, course_id, mobile_no],
      (error2, data) => {
        res.send(result.createResult(error2, data))
      }
    )
  }
})

router.put('/change-password',auth.authStudent, (req, res) => {

  const { newPassword, confirmPassword } = req.body
  const email = req.headers.email

  // validate passwords
  if (newPassword !== confirmPassword) {
    res.send(result.createResult('Passwords do not match'))
    return
  }

  const hashedPassword = cryptojs.SHA256(newPassword).toString()

  const sql = `UPDATE users SET password = ? WHERE email = ?`

  pool.query(sql, [hashedPassword, email], (error, data) => {
    res.send(result.createResult(error, data))
  })
})

// GET /student/my-courses
router.get('/my-courses',auth.authStudent, (req, res) => {

  const email = req.headers.email

  const sql = `
    SELECT
      c.course_id,
      c.course_name,
      c.description,
      c.fees,
      c.start_date,
      c.end_date
    FROM students s
    INNER JOIN courses c
      ON s.course_id = c.course_id
    WHERE s.email = ?
  `

  pool.query(sql, [email], (error, data) => {
    res.send(result.createResult(error, data))
  })
})

// GET /student/my-course-with-videos
router.get('/my-course-with-videos',auth.authStudent, (req, res) => {

  const email = req.headers.email

  const sql = `
    SELECT
      c.course_id,
      c.course_name,
      c.description AS course_description,
      c.video_expire_days,
      v.video_id,
      v.title,
      v.description AS video_description,
      v.youtube_url,
      v.added_at
    FROM students s
    INNER JOIN courses c
      ON s.course_id = c.course_id
    INNER JOIN videos v
      ON v.course_id = c.course_id
    WHERE s.email = ?
      AND DATEDIFF(CURDATE(), v.added_at) <= c.video_expire_days
  `

  pool.query(sql, [email], (error, data) => {
    res.send(result.createResult(error, data))
  })
})



module.exports = router
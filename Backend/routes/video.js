const express = require('express')
const pool = require('../db/pool')
const result = require('../utils/result')
const auth = require('../utils/auth')

const router = express.Router()

// GET /video/all-videos
router.get('/all-videos', (req, res) => {

  const { course_id } = req.query

  let sql = `
    SELECT 
      video_id,
      course_id,
      title,
      description,
      youtube_url,
      added_at
    FROM videos
  `

  let params = []


  if (course_id) {
    sql += ` WHERE course_id = ?`
    params.push(course_id)
  }

  pool.query(sql, params, (error, data) => {
    res.send(result.createResult(error, data))
  })
})

// POST : /video/add
router.post('/add', auth.authAdmin, (req, res) => {

  const {
    course_id,
    title,
    youtube_url,
    description
  } = req.body

  const sql = `
    INSERT INTO videos
    (course_id, title, youtube_url, description, added_at)
    VALUES (?, ?, ?, ?, CURDATE())
  `

  pool.query(
    sql,
    [course_id, title, youtube_url, description],
    (error, data) => {
      res.send(result.createResult(error, data))
    }
  )
})

// PUT /video/update/:video_id (ADMIN)
router.put('/update/:video_id', auth.authAdmin, (req, res) => {

  const { video_id } = req.params
  const {
    course_id,
    title,
    youtube_url,
    description
  } = req.body

  const sql = `
    UPDATE videos
    SET
      course_id = ?,
      title = ?,
      youtube_url = ?,
      description = ?
    WHERE video_id = ?
  `

  pool.query(
    sql,
    [course_id, title, youtube_url, description, video_id],
    (error, data) => {
      res.send(result.createResult(error, data))
    }
  )
})

// DELETE /video/delete/:video_id (ADMIN)
router.delete('/delete/:video_id', auth.authAdmin, (req, res) => {

  const { video_id } = req.params

  const sql = `DELETE FROM videos WHERE video_id = ?`

  pool.query(sql, [video_id], (error, data) => {
    res.send(result.createResult(error, data))
  })
})



module.exports = router

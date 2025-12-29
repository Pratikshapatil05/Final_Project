const express = require('express')


const auth = require('./utils/auth')
const studentRouter = require('./routes/student')
const courseRouter = require('./routes/course')
const videoRouter = require('./routes/video')
const adminRouter = require('./routes/admin')

const app = express()

app.use(express.json())

// JWT middleware
app.use(auth.authUser)

// routes

app.use('/student', studentRouter)
app.use('/course', courseRouter)
app.use('/video', videoRouter)
app.use('/admin', adminRouter)

app.listen(4000, () => {
  console.log('Server running on port 4000')
})

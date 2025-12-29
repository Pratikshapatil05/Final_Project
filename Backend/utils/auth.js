const jwt = require('jsonwebtoken')

const config = require('./config')
const result = require('./result')

function authUser(req, res, next) {
   
  const publicRoutes = [
        '/student/login',
        '/student/register-to-course',
        '/course/all-active-courses'
    ]

    // allow public routes
    if (publicRoutes.includes(req.originalUrl)) {
        return next()
    }
    
    else {
        const token = req.headers.token
        if (!token)
            res.send(result.createResult('Token is missing'))
        else {
            try {
                const payload = jwt.verify(token, config.SECRET)
              
                req.headers.uid = payload.uid
                req.headers.email = payload.email
                req.headers.role = payload.role
                next()
            } catch (ex) {
                res.send(result.createResult('Token is Invalid'))
            }
        }
    }
}

function authAdmin(req, res, next) { 
  if (req.headers.role === 'admin') { 
    next() 
  } else { 
    res.send(result.createResult('Admin access only')) 
  } 
} 
 
function authStudent(req, res, next) { 
  if (req.headers.role === 'student') { 
    next() 
  } else { 
    res.send(result.createResult('Student access only')) 
  } 
} 
 
module.exports = { authUser, authAdmin, authStudent }
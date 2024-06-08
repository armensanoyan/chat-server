import router from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const users = [{ username: 'user1', password: bcrypt.hashSync('password1', 8) }]

router.post('/register', (req, res) => {
  const { username, password } = req.body
  if (users.find(u => u.username === username)) {
    res.status(400).json({ message: 'User already exists' })
  } else {
    users.push({ username, password: bcrypt.hashSync(password, 8) })
    res.status(201).json({ message: 'User created' })
  }
})

router.post('/login', (req, res) => {
  const { username, password } = req.body
  const user = users.find(u => u.username === username)
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ username }, 'secret', { expiresIn: '1h' })
    res.status(200).json({ token })
  } else {
    res.status(401).json({ message: 'Invalid credentials' })
  }
})

router.use('/logout', (req, res, next) => {
  // Logout logic here
  //  use redis to remove jwt token
  res.status(200).json({ message: 'Logout successful' })
})

export default router

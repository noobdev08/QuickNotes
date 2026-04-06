import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db.js'

const router = express.Router();

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    try {
        const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES (?,?)`)
        const result = insertUser.run(username, hashedPassword)
        res.status(201).json({ id: result.lastInsertRowid, username })
    } catch (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(409).json({ message: 'Username already taken' })
        }
        res.status(500).json({ message: 'Server error' })
    }
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const findUser = db.prepare(`SELECT * FROM users WHERE username = ?`)
    const user = findUser.get(username)

    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }

    const correctPass = bcrypt.compareSync(password, user.password);

    if(correctPass){
        const token = jwt.sign({ id: user.id }, process.env.JWT_AUTH, {expiresIn: '24h'});
        res.status(200).json({ token: token})
    } else {
        res.status(400).json({message: "Password is incorrect"})
    }
})


export default router;

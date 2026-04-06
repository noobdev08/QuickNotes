import jwt from 'jsonwebtoken';
import 'dotenv/config'

function authenticateToken(req, res, next){
    const token = req.headers['authorization']
    
    if(!token){
        return res.status(401).send("No token found")
    }

    jwt.verify(token, process.env.JWT_AUTH, (err, decode) => {
        if (err) return res.status(403).send("Invalid token")
        req.id = decode.id
        next()
    })
}

export default authenticateToken
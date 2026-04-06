import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import noteRoutes from './routes/notesRoute.js';
import authRoutes from './routes/authRoute.js'
import authenticateToken from './middleware/authMiddleware.js';

const PORT = process.env.PORT || 5000
const app = express();

// Enable CORS
app.use(cors());

// Endpoints
app.use(express.json())
app.use('/notes', authenticateToken, noteRoutes);
app.use('/auth', authRoutes);


app.listen(PORT, ()=> {
    console.log(`Server Started At: ${PORT}`)
})



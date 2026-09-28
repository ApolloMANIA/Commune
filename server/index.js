import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose, { set } from 'mongoose';
import authRoutes from './routes/AuthRoutes.js';
import contactRoutes from './routes/ContactRoutes.js';
import setupSocket from './socket.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const databaseURL = process.env.DATABASE_URL;

app.set('trust proxy', 1);

const allowedOrigins = [
    process.env.ORIGIN,
    "http://localhost:5173",
    "http://127.0.0.1:5173",
].filter(Boolean);

app.use(
    cors({
        origin: allowedOrigins,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        credentials: true,
    })
);

app.get('/health', (_req, res) => {
    res.status(200).send('ok');
});

app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

setupSocket(server);

mongoose.connect(databaseURL).then(() => {
    console.log('Connected to the database');
}).catch((error) => {
    console.log('Error:', error.message);
});
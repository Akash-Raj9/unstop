import 'dotenv/config';
import express from "express";
import cors from "cors";

import connectDB from './db/db.js';
import authRoutes from "./routes/authRoutes.js"
import eventRoutes from "./routes/eventRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import registrationRoutes from "./routes/registrationRoutes.js"
import { seedAdmin } from './controllers/authController.js';

const app = express();

app.use(cors());
app.use(express.json());

connectDB(process.env.MONGO_URI);

seedAdmin();

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/registrations', registrationRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({message: err.message});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));


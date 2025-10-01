import { Router } from "express";
import { protect,admin } from "../middleware/auth.js";
import { createEvent,updateEvent,deleteEvent } from "../controllers/eventController.js";

const router = Router();

router.post('/events', protect, admin, createEvent);
router.put('/events/:id', protect, admin, updateEvent);
router.delete('/events/:id', protect, admin, deleteEvent);

export default router;

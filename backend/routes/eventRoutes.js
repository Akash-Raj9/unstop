import express from "express";
import { Router } from "express";
import { getEvents,getEventById, deleteEvent } from "../controllers/eventController.js";

const router = Router();
router.get('/', getEvents);
router.get('/:id', getEventById);
router.delete('/:id', deleteEvent);

export default router;

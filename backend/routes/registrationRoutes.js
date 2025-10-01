import { Router } from "express";
import { registerUser,getAllRegistrations,getRegistrationsForEvent } from "../controllers/registrationController.js";
import { protect,admin } from "../middleware/auth.js";

const router = Router();

router.post('/', registerUser);
router.get('/event/:eventId', getRegistrationsForEvent);
router.get('/', protect, admin, getAllRegistrations);

export default router;

import 'dotenv/config';
import connectDB from '../db/db.js';
import { Event } from '../models/event.models.js';
import { seedAdmin } from '../controllers/authController.js';

(async ()=>{
  try {
    await connectDB(process.env.MONGO_URI);
    await seedAdmin();
    await Event.deleteMany();
    const events = [
      {title: 'SynapHack — AI Edition', date: new Date('2025-11-15'), description: 'Build ML/AI projects', venue: 'Online', maxTeamSize:4},
      {title: 'SpeedHack 48', date: new Date('2025-12-05'), description: '48-hour rapid prototyping', venue: 'Campus Auditorium', maxTeamSize:3},
    ];
    await Event.insertMany(events);
    console.log('Seeded events');
    process.exit(0);
  } catch(err){ console.error(err); process.exit(1); }
})();

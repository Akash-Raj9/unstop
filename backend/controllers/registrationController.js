import { Registration } from '../models/registration.models.js';
import { Team } from '../models/team.models.js';

export const registerUser = async (req,res) => {
  const {eventId, name,email,college,phone, teamName, teamMembers} = req.body;
  let team = null;
  if(teamName){
    team = await Team.create({
      name: teamName,
      event: eventId,
      members: teamMembers || [{name,email,college,phone}],
      createdBy: req.user ? req.user._id : null
    });
  }

  const reg = await Registration.create({
    event: eventId,
    team: team ? team._id : undefined,
    name, email, college, phone
  });

  res.status(201).json({registration: reg, team});
};

export const getRegistrationsForEvent = async (req,res) => {
  const regs = await Registration.find({event: req.params.eventId});
  res.json(regs);
};

// export const getAllRegistrations = async (req,res) => {
//   const regs = await Registration.find().populate('event').sort({createdAt:-1});
//   res.json(regs);
// };

export const getAllRegistrations = async (req, res) => {
    const regs = await Registration.find()
      .populate("event", "title date venue") 
      .populate("team", "name members")     
      .sort({ createdAt: -1 });

    res.json(regs);
  }


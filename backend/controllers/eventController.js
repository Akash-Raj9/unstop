import { Event } from "../models/event.models.js";

export const getEvents = async (req,res) => {
  const events = await Event.find().sort({date:1});
  res.json(events);
};

export const getEventById = async (req,res) => {
  const event = await Event.findById(req.params.id);
  if(!event) return res.status(404).json({message:'Event not found'});
  res.json(event);
};

export const createEvent = async (req,res) => {
  const {title,date,description,venue,maxTeamSize} = req.body;
  const event = await Event.create({title,date,description,venue,maxTeamSize, createdBy: req.user._id});
  res.status(201).json(event);
};

export const updateEvent = async (req,res) => {
  const event = await Event.findById(req.params.id);
  if(!event) return res.status(404).json({message:'Event not found'});
  Object.assign(event, req.body);
  await event.save();
  res.json(event);
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ message: "Server error" });
  }
};


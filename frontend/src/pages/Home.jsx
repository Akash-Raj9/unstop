import React, { useEffect, useState } from "react";
import API from "../api/api";
import EventCard from "../components/EventCard";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events");
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="container">
      <h1>Upcoming Hackathons</h1>
      {events.length === 0 ? (
        <p>No events yet.</p>
      ) : (
        <div className="grid">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

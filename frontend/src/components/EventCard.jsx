import React from "react";
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  const eventDate = new Date(event.date).toLocaleString();

  return (
    <div className="card">
      <h3>{event.title}</h3>
      <p className="muted">{eventDate}</p>
      <p>{event.description?.slice(0, 120)}{event.description?.length > 120 ? "..." : ""}</p>
      <div className="card-actions">
        <Link to={`/event/${event._id}`} className="btn">
          View
        </Link>
        <Link to={`/register/${event._id}`} className="btn btn-outline">
          Apply
        </Link>
      </div>
    </div>
  );
}

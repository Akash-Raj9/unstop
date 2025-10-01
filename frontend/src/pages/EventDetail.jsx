import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/api";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await API.get(`/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvent();
  }, [id]);

  if (!event) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h1>{event.title}</h1>
      <p className="muted">{new Date(event.date).toLocaleString()}</p>
      <p>{event.description}</p>
      <p>
        <strong>Venue:</strong> {event.venue || "TBA"}
      </p>
      <Link to={`/register/${event._id}`} className="btn">
        Register
      </Link>
    </div>
  );
}

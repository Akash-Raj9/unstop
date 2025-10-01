import React, { useState, useEffect } from "react";
import API from "../api/api";

export default function AdminDashboard() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [form, setForm] = useState({ title: "", date: "", description: "", venue: "" });
  const [creds, setCreds] = useState({ email: "", password: "" });
  const [activeTab, setActiveTab] = useState("events"); 

  
  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  const fetchRegistrations = async () => {
    if (!token) return;
    try {
      const res = await API.get("/registrations",{
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res)
      setRegistrations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRegistrations();
    fetchEvents();
  }, []);


  const login = async () => {
    try {
      const res = await API.post("/auth/login", creds);
      if (res.data.user.role !== "admin") return alert("You are not an admin!");
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      alert("Logged in as admin successfully!");
      fetchRegistrations();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };


  const createEvent = async () => {
    if (!token) return alert("Please login first!");
    try {
      await API.post("/admin/events", form);
      alert("Event created!");
      setForm({ title: "", date: "", description: "", venue: "" });
      fetchEvents();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error creating event");
    }
  };


  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await API.delete(`/events/${id}`);
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      {!token && (
        <div className="login-form">
          <h3>Admin Login</h3>
          <input
            type="email"
            placeholder="Email"
            value={creds.email}
            onChange={(e) => setCreds({ ...creds, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={creds.password}
            onChange={(e) => setCreds({ ...creds, password: e.target.value })}
          />
          <button className="btn" onClick={login}>
            Login
          </button>
        </div>
      )}

      {token && (
        <>
          {/* Tabs */}
          <div className="admin-tabs">
  <button className="btn" onClick={() => setActiveTab("events")}>Events</button>
  <button className="btn btn-outline" onClick={() => setActiveTab("registrations")}>Registrations</button>
</div>


          {/* Event Tab */}
          {activeTab === "events" && (
            <>
              <div className="create-event">
                <h3>Create New Event</h3>
                <input
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <input
                  type="date"
                  placeholder="Date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
                <input
                  placeholder="Venue"
                  value={form.venue}
                  onChange={(e) => setForm({ ...form, venue: e.target.value })}
                />
                <textarea
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
                <button className="btn" onClick={createEvent}>
                  Create Event
                </button>
              </div>

              <h3>All Events</h3>
              <div className="grid">
                {events.length === 0 ? (
                  <p>No events yet.</p>
                ) : (
                  events.map((ev) => (
                    <div className="card" key={ev._id}>
                      <h4>{ev.title}</h4>
                      <p>{new Date(ev.date).toLocaleDateString()}</p>
                      <button className="btn btn-danger" onClick={() => deleteEvent(ev._id)}>
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {/* Registrations Tab */}
          {activeTab === "registrations" && (
            <>
              <h3>All Registrations</h3>
              {registrations.length === 0 ? (
                <p>No registrations yet.</p>
              ) : (
                <div className="grid">
                  {registrations.map((reg) => (
                    <div className="card" key={reg._id}>
                      <p><strong>Event:</strong> {reg.event?.title}</p>
                      <p><strong>Name:</strong> {reg.name}</p>
                      <p><strong>Email:</strong> {reg.email}</p>
                      {reg.team && <p><strong>Team:</strong> {reg.team.name}</p>}
                      {reg.college && <p><strong>College:</strong> {reg.college}</p>}
                      {reg.phone && <p><strong>Phone:</strong> {reg.phone}</p>}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}




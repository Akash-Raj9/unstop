import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Register() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    college: "",
    phone: "",
    teamName: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/registrations", { ...form,eventId });
      alert("Registered successfully!");
      setForm({ name: "", email: "", college: "", phone: "", teamName: "" });
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container">
      <h2>Register for Event</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="college" placeholder="College/Organization" value={form.college} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input name="teamName" placeholder="Team Name (optional)" value={form.teamName} onChange={handleChange} />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
}

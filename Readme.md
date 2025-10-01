# SynapHack — Fullstack Hackathon Management Web App

## Objective
SynapHack is a responsive web application that displays hackathon events, allows user registration and team creation, and provides an admin interface for managing events.

---

## Features
- Home page listing all upcoming hackathons (title, date, description, “Apply” button)
- Event detail page with registration option
- Registration form: Name, Email, College/Organization, Phone, Team Name (optional)
- Admin login with JWT authentication
- Admin dashboard to create/delete events and view registrations
- Responsive design for mobile and desktop

---

## Tech Stack
- **Frontend:** React, React Router, Axios, CSS
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** Modern responsive UI

---

## Folder Structure

### Backend
/models
/controllers
/routes
/middleware
/db
server.js

### Frontend
/pages
/components
/api
/styles.css
main.jsx


---

## Installation & Setup

### Backend
1. `cd backend`
2. Install dependencies:
npm install


3. Create `.env` file:
PORT=5000
MONGO_URI=<your-mongo-uri>
JWT_SECRET=<your-jwt-secret>
ADMIN_EMAIL=admin@synaphack.com
ADMIN_PASSWORD=adminpassss123


4. Start the server:
npm run dev



### Frontend
1. `cd frontend`
2. Install dependencies:
npm install


3. Create `.env` file:
VITE_API_URL=http://localhost:5000/api


4. Start the development server:
npm run dev


5. Open your browser at `http://localhost:5173`

---

## Future Enhancements
- Real-time registration updates
- Email notifications on registration
- Event search & filter
- File upload for team projects
- Deployment with Docker / CI-CD pipeline

---

## Deployment


---

## Admin Credentials (for testing)
- **Email:** admin@synaphack.com  
- **Password:** adminpass123

---

## References
- React.js documentation  
- Node.js & Express documentation  
- MongoDB / Mongoose documentation
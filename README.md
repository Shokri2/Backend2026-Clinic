# Clinic Management System

A full-stack clinic web app where patients book appointments online, doctors manage their schedule, and admins run the whole clinic from one dashboard.

![React](https://img.shields.io/badge/React_19-20232A?logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express_5-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![MUI](https://img.shields.io/badge/Material_UI-007FFF?logo=mui&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white)

---

## Features

**Patients (user)**
- Register, log in and manage their profile
- Browse doctors, services and categories
- Book appointments and track their own bookings

**Doctors**
- Dedicated doctor dashboard
- View the appointments assigned to them

**Admins**
- Admin dashboard with a sidebar layout
- Manage users and change their roles
- Manage doctors, services, categories and the menu
- Manage doctor shifts
- Manage all appointments and update their status

**Security**
- JWT authentication
- Passwords hashed with bcrypt
- Route protection middleware: `protect`, `adminOnly`, `doctorOnly`
- Protected routes on the frontend per role

## Tech stack

| Layer | Tools |
|---|---|
| Frontend | React 19, Vite, Material UI, React Router 7, Axios, Swiper, React Hot Toast |
| Backend | Node.js, Express 5, Mongoose, JWT, bcrypt, CORS |
| Database | MongoDB |

## Project structure

```
Backend2026-Clinic/
├── client/                 # React frontend (Vite)
│   └── src/
│       ├── Components/     # Admin, Auth, Doctors, Service, User, Layout ...
│       ├── Pages/          # Landing page, Home
│       ├── Context/        # User context
│       └── api.js          # Axios instance
└── Server/                 # Express backend
    ├── index.js
    └── src/
        ├── config/         # MongoDB connection
        ├── controller/
        ├── middleware/     # protect, adminOnly, doctorOnly
        ├── model/          # User, Doctor, Appointment, Booking, Service, Shift ...
        └── router/
```

## API overview

All routes are prefixed with `/api`.

| Resource | Endpoints |
|---|---|
| Appointments | `POST /appointments`, `GET /appointments`, `GET /appointments/:id`, `GET /appointments/user/:userId`, `PUT /appointments/:id`, `DELETE /appointments/:id` |
| Bookings | `POST /bookings`, `GET /bookings`, `GET /bookings/my-bookings/:userId`, `PUT /bookings/:id`, `DELETE /bookings/:id` |
| Doctors | `GET /doctors`, `GET /doctors/:id`, `GET /doctors/appointments`, `POST /doctors`, `PUT /doctors/:id`, `DELETE /doctors/:id` |
| Services | `POST /services`, `GET /services`, `GET /services/:id`, `PUT /services/:id`, `DELETE /services/:id` |
| Users | `GET /all-users`, `GET /user/:id`, `PUT /update-user/:id`, `PUT /update-user-role/:id`, `DELETE /delete-user/:id` |
| Categories, menu, shifts | Create, list, update and delete for each |

## Getting started

### Requirements
- Node.js 18+
- A MongoDB database (local or MongoDB Atlas)

### 1. Backend

```bash
cd Server
npm install
```

Create `Server/.env`:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

```bash
npm run dev     # or: npm start
```

To create the first admin account:

```bash
node src/createAdmin.js
```

### 2. Frontend

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

```bash
npm run dev
```

The app runs on `http://localhost:5173`.

## Author

**Shokri Samara**, Full Stack Developer
[GitHub](https://github.com/Shokri2) · [LinkedIn](https://www.linkedin.com/in/shokri-samara)

# HopScotch 🚖🛣️

HopScotch is a cartoonish, fun-themed **MERN stack taxi booking app** built for seamless travel between users and drivers. The design emphasizes simplicity with a quirky black-and-white aesthetic and playful UI animations.

> ⚠️ **Note**: Additional enhancements and optimizations to be added in the future.

---

## 🚧 Tech Stack

### 🔙 Backend
- **MongoDB** – NoSQL database for storing user/driver/ride info
- **Express.js** – RESTful APIs for managing routes
- **Node.js** – JavaScript runtime

### 🔮 Frontend
- **React.js** – Component-based UI
- **Tailwind CSS** – Utility-first CSS with custom cartoonish styles
- **GSAP** – For smooth and goofy animations (slide panels, bounce effects)

---

## 📦 Features (Final Status)

### 👤 User
- [x] Set pickup and drop locations
- [x] View fare estimate
- [x] Confirm ride
- [x] Live driver tracking
- [x] Cancel ride

### 🚗 Driver
- [x] Login/Register with protected routes
- [x] View available ride requests
- [x] Accept/Reject ride
- [x] Navigate to pickup and drop
- [x] Complete ride

### 🔐 Auth
- [x] JWT-based authentication for both users and drivers
- [x] Protected routes with role-based access
- [x] Password reset functionality
- [x] Enhanced token expiration handling
- [x] Multi-factor authentication (MFA)
- [x] Improved session management
- [x] Admin role for monitoring and managing users/drivers
- [x] Rate-limiting for login attempts
- [x] CAPTCHA integration for bot prevention

---

## 🧪 Running Locally

```bash
# Clone repo
git clone https://github.com/ParthChaturvedi07/Hop-Scotch.git
cd HopScotch

# Backend setup
cd backend
npm install
npm start

# Frontend setup
cd frontend
npm install
npm run dev
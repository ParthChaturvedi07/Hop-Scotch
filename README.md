# HopScotch 🚖🛣️

HopScotch is a cartoonish, fun-themed **MERN stack taxi booking app** built for seamless travel between users and drivers. The design emphasizes simplicity with a quirky black-and-white aesthetic and playful UI animations.

> ⚠️ **Note**: This project is currently under development. Expect rapid changes and improvements in both UI and functionality.

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

## 📦 Features (in progress)

### 👤 User
- [x] Set pickup and drop locations
- [x] View fare estimate
- [x] Confirm ride
- [ ] Live driver tracking
- [ ] Cancel ride

### 🚗 Driver
- [x] Login/Register with protected routes
- [x] View available ride requests
- [ ] Accept/Reject ride
- [ ] Navigate to pickup and drop
- [ ] Complete ride

### 🔐 Auth
- JWT-based authentication for both users and drivers
- Protected routes with role-based access

---

## 🧪 Running Locally

```bash
# Clone repo
git clone https://github.com/yourusername/hopscotch.git
cd hopscotch

# Backend setup
cd backend
npm install
npm start

# Frontend setup
cd frontend
npm install
npm run dev
```

---

## 🎨 UI Theme
- Monochrome black-and-white
- Cartoon-style icons and transitions
- Bouncy, playful interactions with subtle hover effects

---

## 🛠️ Project Status
> 🚧 **Actively being built** – New features and improvements are added frequently.

Planned upcoming additions:
- 🚘 Real-time ride status updates
- 🗺️ Map integration (e.g., Mapbox or Google Maps)
- 💬 Chat between driver and user
- 📲 Mobile responsiveness

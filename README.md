# 🚀 ChronoForm

<div align="center">

**A futuristic recruitment form for Team ChronoStrider**

Built with cutting-edge web technologies and premium UI/UX design

[Live Demo](https://github.com/AtlasRoX/ChronoForm) • [Report Bug](https://github.com/AtlasRoX/ChronoForm/issues) • [Request Feature](https://github.com/AtlasRoX/ChronoForm/issues)

</div>

---

## ✨ Features

### 🎨 Premium Futuristic Design
- **Dark Mode Theme** with neon cyan/teal accents
- **Glassmorphism** effects throughout the interface
- **Dynamic Background** with mouse-following glow effect
- **Grid Overlay** for that authentic tech aesthetic
- **Animated Banner** with hover effects

### 🎭 Interactive Animations
- **🎉 Confetti Explosion** when selecting your specialization
- **🚀 Floating Rocket Icon** on the submit button
- **📊 Scanning Line** effect on success card
- **✨ Smooth Transitions** and micro-interactions
- **📜 Rolling Marquee** welcome message

### 💎 Premium Success Card
- **Holographic Border** with gradient effects
- **Corner Brackets** for HUD-style aesthetics
- **Pulse Animation** on the success icon
- **Tech Typography** with status indicators
- **Glassmorphism** background with blur effects

### 🔐 Backend Integration
- **Appwrite Backend** for secure data storage
- **Real-time Validation** and error handling
- **Environment Variables** for secure configuration

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 + Vite
- **Styling:** Tailwind CSS v4 + Custom CSS
- **Icons:** Lucide React
- **Backend:** Appwrite
- **Build Tool:** Vite
- **Package Manager:** pnpm

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Appwrite account ([Get started](https://appwrite.io))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AtlasRoX/ChronoForm.git
   cd ChronoForm
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_APPWRITE_DATABASE_ID=your_database_id
   VITE_APPWRITE_COLLECTION_ID=your_collection_id
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

### Build for Production

```bash
pnpm build
# or
npm run build
```

---

## 📋 Appwrite Setup

### Database Schema

Create a collection in your Appwrite database with the following attributes:

| Attribute Name | Type | Required | Size |
|---------------|------|----------|------|
| fullName | String | Yes | 255 |
| email | Email | Yes | 255 |
| phone | String | No | 50 |
| university | String | Yes | 255 |
| positionApplied | String | Yes | 100 |
| mainSkill | String | Yes | 100 |
| skillLevel | String | Yes | 50 |
| portfolio | URL | No | 500 |
| hackathonExp | String | Yes | 10 |
| whyJoin | String | Yes | 2000 |
| availability | String | Yes | 50 |

> **Note:** The form sends both `positionApplied` and `mainSkill` to ensure compatibility.

---

## 🎯 Features in Detail

### Form Fields

- **Personal Information:** Name, Email, Phone, University
- **Technical Profile:** Specialization, Skill Level, Portfolio
- **Experience:** Hackathon participation history
- **Motivation:** Why join ChronoStrider?
- **Availability:** Session commitment level

### Specialization Options

- Frontend Development
- Backend Development
- Full-Stack Development
- UI/UX Design
- AI/ML Engineering
- Cybersecurity
- IoT/Hardware
- Management

---

## 🎨 Design Philosophy

ChronoForm embodies a **futuristic tech aesthetic** with:

- **Color Palette:** Deep space blacks (#0a0a12) with neon cyan (#00f3ff) accents
- **Typography:** Outfit (sans-serif) and Space Grotesk (monospace)
- **Motion:** Smooth, purposeful animations that guide user attention
- **Feedback:** Visual confirmation for every interaction
- **Accessibility:** High contrast, clear labels, and semantic HTML

---

## 📸 Screenshots

> Add your screenshots here after deployment!

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is part of Team ChronoStrider's recruitment system.

---

## 🌟 Acknowledgments

- Built with ❤️ by Team ChronoStrider
- Powered by [Appwrite](https://appwrite.io)
- Icons by [Lucide](https://lucide.dev)
- Inspired by futuristic sci-fi interfaces

---

<div align="center">

**Made with 🚀 by [Team ChronoStrider](https://github.com/AtlasRoX)**

*Join us on our fascinating journey!*

</div>

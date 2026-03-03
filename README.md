<div align="center">

<img src="./public/banner.svg" alt="Sharkes Banner" width="100%">

# 🦈 Sharkes Team Management
### The Digital Home for the Sharkes Sports Community in CDMX

[![Nuxt 4](https://img.shields.io/badge/Nuxt-4.x-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)](https://nuxt.com)
[![Vue 3](https://img.shields.io/badge/Vue-3.5-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Open Source](https://img.shields.io/badge/Open%20Source-%E2%9D%A4-red?style=for-the-badge)](https://github.com/your-username/sports_team_management)

**Sharkes** is a custom-built digital operations center for the **Sharkes Sports Community in Mexico City**. While it serves as the production hub for our local athletes, it is maintained as an **open-source project** to provide a real-world reference for developers on how to integrate high-performance web systems and build bespoke community solutions.

[✨ Features](#-features) • [🚀 Getting Started](#-getting-started) • [🏗️ Architecture](./ARCHITECTURE.md) • [🤝 Contributing](./CONTRIBUTING.md)

</div>

---

## ✨ Features

### 👤 Member Portal
- **Report Absences**: Simple, intuitive flow to notify the team of absences in upcoming training sessions.
- **My Absences**: Review historical absence reports with a clean, organized interface.
- **Benefits & Perks**: Access exclusive team discounts and benefits via a dedicated coupon system.
- **Responsive Design**: Optimized for desktops and mobile devices (iOS/Android).

### 🔐 Admin Command Center
- **Attendance Overview**: Monitor team presence and manage absence records.
- **Member Management**: Register new players and maintain team rosters.
- **Dynamic Scheduling**: Update training times and locations on the fly.
- **Coupon Control**: Create and manage reward coupons for the team.
- **Secure Access**: Robust authentication using InsForge/Google OAuth.

---

## 🗺️ User Journey

```mermaid
sequenceDiagram
    participant U as Member
    participant A as Admin
    participant S as Sharkes App
    participant B as InsForge DB

    U->>S: Access Member Portal
    S->>B: Fetch Active Sessions
    B-->>S: Session Data
    S-->>U: Show Registration Form
    U->>S: Submit Absence
    S->>B: Save Absence Record
    B-->>S: Success
    S-->>U: Confirmation Toast

    A->>S: Login to Admin Dashboard
    S->>B: Auth Check
    B-->>S: Admin Verified
    A->>S: View Attendance Report
    S->>B: Query Absences
    B-->>S: Absence Data
    S-->>A: Generate Report
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm / pnpm / yarn
- An [InsForge](https://insforge.com) project for the backend.

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/sports_team_management.git
   cd sports_team_management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory. We use a dual deployment strategy (Production and Demo). The demo environment connects to a separate demo database and enables `NUXT_PUBLIC_DEMO_MODE` to provide admin bypass options.
   
   Here is a template for the `.env` file:
   ```env
   # Default Environment (Local Development fallback)
   NUXT_PUBLIC_INSFORGE_URL=your_default_url
   NUXT_PUBLIC_INSFORGE_ANON_KEY=your_default_anon_key

   # Enable Demo Mode for admin bypass and dev tables (Set to 'true' in demo environment)
   NUXT_PUBLIC_DEMO_MODE=false
   
   # Production Deployment Config
   PROD_API_KEY=your_prod_api_key
   PROD_API_URL=your_prod_api_url
   PROD_ANON_KEY=your_prod_anon_key
   PROD_SITE_URL=your_prod_site_url
   
   # Demo Deployment Config
   DEMO_API_KEY=your_demo_api_key
   DEMO_API_URL=your_demo_api_url
   DEMO_ANON_KEY=your_demo_anon_key
   DEMO_SITE_URL=your_demo_site_url
   ```

4. **Launch Development Server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

### 🔀 Dual Deployment Strategy requirements

Sharkes implements a dual deployment pipeline to separate live user app from testing environments:
- **Production (Live)**: Connects to the main InsForge backend. `NUXT_PUBLIC_DEMO_MODE` is disabled.
- **Demo (Secondary Project)**: Connects to a secondary InsForge backend. `NUXT_PUBLIC_DEMO_MODE=true` is enabling testing and admin bypass functionalities without affecting the live database.

---


### 👤 Member Portal — Visual Demos

The member portal is designed for simplicity and speed. Below are live UX demonstrations of the key flows:

#### Flow 1: Reportar Ausencia
> Search for a member using auto-suggestions, select a sport, choose a date & time slot, and fill in the reason.

<img src="./public/demo_reportar_ausencia.webp" alt="Reportar Ausencia Flow" width="100%">

---

#### Flow 2: Mis Ausencias
> Look up a member's absence history — type "castro" to trigger autocomplete, select the user, and view upcoming scheduled absences at a glance.

<img src="./public/demo_mis_ausencias.webp" alt="Mis Ausencias Flow" width="100%">

---

#### Flow 3: Beneficios
> Browse exclusive team discounts and perks. Coupons display with QR codes, status badges, and location details.

<img src="./public/demo_beneficios.webp" alt="Beneficios Flow" width="100%">

---

### 🔐 Admin Dashboard
The admin panel provides total control over team operations, including attendance reports and benefit management.

| Absence Management | Discount Management |
|--------------------|---------------------|
| ![Admin Absences](./public/admin_absences.png) | ![Admin Discounts](./public/admin_discounts.png) |

---

## 🛠️ Tech Stack

- **Nuxt 4**: Hybrid Vue Framework for optimal performance.
- **Vue 3**: Composition API (Script Setup) for reactive UI components.
- **Tailwind CSS**: Utility-first CSS for bespoke, premium styling.
- **InsForge SDK**: Real-time database, authentication, and cloud storage.
- **Iconify**: Unified icon system for 100,000+ vector icons.

---

<div align="center">

Built with ❤️ for the Sharkes Team.

</div>

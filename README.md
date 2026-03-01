<div align="center">
  <img src="[PLACEHOLDER_FOR_LOGO_URL]" alt="NukkadSeva Logo" width="150"/>
  <h1>NukkadSeva Frontend</h1>
  <p><strong>A hyper-local, intuitive marketplace connecting customers with verified service professionals.</strong></p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</div>

<br/>

## 🌟 Overview

NukkadSeva empowers communities by bridging the gap between local service providers (plumbers, electricians, cleaners, etc.) and customers needing immediate assistance. 

Designed with a **premium, glassmorphic aesthetic**, robust **role-based access control**, and **real-time WebSocket connectivity**, the platform offers a seamless experience tailored separately for Customers, Providers, and Administrators.

---

## 📸 Core Features & Walkthrough

### Beautiful & Responsive UI
Fully redesigned with mobile-first principles, featuring CSS micro-animations, framer-motion page transitions, and a curated color palette.
> `[PLACEHOLDER_FOR_HOME_PAGE_SCREENSHOT]`

### Streamlined Authenticaton Flows
Distinct, multi-step onboarding processes with OTP verification for the three core roles. Secured via Edge Middleware and synchronized HTTP cookies.
> `[PLACEHOLDER_FOR_LOGIN_SCREENSHOT]`

### Provider Discovery
An advanced service search interface with real-time location filtering and dynamic category routing.
> `[PLACEHOLDER_FOR_PROVIDER_SEARCH_SCREENSHOT]`

### Integrated Booking Flow
Customers can seamlessly select a service, specify their time/location, and confirm a booking with verified professionals.
> `[PLACEHOLDER_FOR_BOOKING_CHECKOUT_SCREENSHOT]`

### Role-Specific Dashboards
Dedicated dashboard layouts for managing active jobs, payments, profile verification statuses, and provider service catalogs.
> `[PLACEHOLDER_FOR_CUSTOMER_DASHBOARD_SCREENSHOT]`  
> `[PLACEHOLDER_FOR_PROVIDER_DASHBOARD_SCREENSHOT]`

---

## 🛠 Tech Stack

- **Core Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **UI Library:** [React 18](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State & Context:** React Context API
- **Routing & Security:** Next.js Edge Middleware for strict RBAC
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Data Fetching:** [Axios](https://axios-http.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **WebSockets:** `@stomp/stompjs` + `sockjs-client`

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher)
- A running instance of the [NukkadSeva Spring Boot Backend]([PLACEHOLDER_BACKEND_REPO_LINK]).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/nukkadseva-frontend.git
   cd nukkadseva-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup Environment Variables:
   Create a `.env.local` file in the root directory and define the backend URL:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

---

## 📂 Project Structure

```
src/
├── app/                 # Next.js 14 App Router routes (pages & layouts)
├── components/          # Reusable React components (Header, Footer, Inputs)
├── context/             # React Context providers (AuthContext)
├── hooks/               # Custom React hooks (useWebSockets)
├── lib/                 # Utility libraries and API instances (Axios config)
└── types/               # TypeScript interfaces and Data Transfer Objects (DTOs)
```

---

## 🔒 Vercel Deployment & Security

This architecture is optimized for seamless deployment to **Vercel** and hardened against common web vulnerabilities.

- **Edge Middleware Route Protection:** All `/customer/*`, `/provider/*`, and `/admin/*` routes intercept requests at the edge. Unauthorized access bypasses the React tree entirely, returning a 307 temporary redirect.
- **Strict HTTP Headers:** Clickjacking (`X-Frame-Options: DENY`), MIME sniffing (`X-Content-Type-Options: nosniff`), and XSS attacks (`X-XSS-Protection`) are mitigated via `next.config.js`.
- **Synchronized Auth State:** JWTs are stored in secure HTTP cookies to ensure middleware readability during Server-Side Rendering (SSR).

### One-Click Vercel Deploy
1. Push your code to GitHub.
2. Import the repository into your Vercel Dashboard.
3. Configure `NEXT_PUBLIC_API_URL` to point to your live backend.
4. Deploy!

---

## 🤝 Contributing
Contributions are always welcome! 
1. Fork the feature branch
2. Ensure your syntax follows the `.eslintrc.json` guidelines
3. Submit a Pull Request.

---

## 👥 Contributors

Thanks goes to these wonderful people who have contributed to this project:

| <a href="https://github.com/yjamal710"><img src="https://avatars.githubusercontent.com/u/108920950?v=4" width="100px;" alt=""/><br /><sub><b>Yusuf Jamal</b></sub></a><br />💻 📖 🐛 | <a href="[CONTRIBUTOR_2_LINK]"><img src="[CONTRIBUTOR_2_IMG_URL]" width="100px;" alt=""/><br /><sub><b>[Contributor 2 Name]</b></sub></a><br />💻 🎨 🤔 |
| :---: | :---: |

<!-- Note: Add more contributors above matching the table format -->

---

**Built with ❤️ by the NukkadSeva Team**
![alt text]([PLACEHOLDER_FOR_FOOTER_IMAGE])

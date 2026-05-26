<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12&height=240&section=header&text=EduMeet&fontSize=90&fontColor=fff&animation=fadeIn&fontAlignY=38&desc=Learn%20anything,%20live,%20from%20the%20world's%20best&descAlignY=60&descSize=18" alt="EduMeet banner" />

<br/>

[![MERN](https://img.shields.io/badge/Stack-MERN-2148e6?style=for-the-badge&logo=mongodb&logoColor=white&labelColor=05070d)](#)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black&labelColor=05070d)](https://react.dev)
[![Node](https://img.shields.io/badge/Node-20+-339933?style=for-the-badge&logo=node.js&logoColor=white&labelColor=05070d)](https://nodejs.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white&labelColor=05070d)](https://tailwindcss.com)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white&labelColor=05070d)](https://stripe.com)
[![Jitsi](https://img.shields.io/badge/Jitsi-Live%20Video-1D76DB?style=for-the-badge&logo=jitsi&logoColor=white&labelColor=05070d)](https://meet.jit.si)
[![License](https://img.shields.io/badge/License-MIT-A855F7?style=for-the-badge&labelColor=05070d)](#license)

<br/>

<a href="#-quickstart"><img src="https://img.shields.io/badge/▶_Quickstart-2148e6?style=for-the-badge&logo=rocket&logoColor=white" /></a>
&nbsp;
<a href="#-screens"><img src="https://img.shields.io/badge/✨_Screens-A855F7?style=for-the-badge" /></a>
&nbsp;
<a href="#-deployment"><img src="https://img.shields.io/badge/🌍_Deploy-14B8A6?style=for-the-badge" /></a>
&nbsp;
<a href="#-architecture"><img src="https://img.shields.io/badge/🏛_Architecture-F59E0B?style=for-the-badge" /></a>

<br/><br/>

<p>
<b>A modern Learning Management System that connects students with vetted tutors for 1-on-1 live HD video lessons.</b><br/>
Schedule. Pay. Learn. Replay. All in one place.
</p>

<br/>

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=20&pause=900&color=8EB0FF&center=true&vCenter=true&width=720&lines=Live+1-on-1+HD+video+classrooms;Stripe-secured+payments;Lesson+recordings+%26+replay;Smart+scheduling+%26+rescheduling;Student+%E2%80%A2+Tutor+%E2%80%A2+Admin+roles" alt="features ticker" />

<br/><br/>

</div>

---

## ✨ Why EduMeet

> Built for the modern student. Designed like a product you'd actually pay for.

<table>
<tr>
<td width="33%" valign="top">

### 🎥 Live HD classrooms
Cinematic 1080p video meetings powered by Jitsi. No installs, no friction. Works on any device.

</td>
<td width="33%" valign="top">

### 💳 Pay only for what you take
Stripe-secured checkout. No subscriptions, no surprises, full payment history.

</td>
<td width="33%" valign="top">

### ▶️ Replay anytime
Every lesson is recorded and stored privately. Re-watch whenever you need a refresher.

</td>
</tr>
<tr>
<td width="33%" valign="top">

### 📅 Smart scheduling
Browse live availability. Reschedule or cancel in a click. No more email tag.

</td>
<td width="33%" valign="top">

### 🛡️ Vetted experts only
Every tutor is interviewed and credential-verified. Real PhDs, real engineers, real coaches.

</td>
<td width="33%" valign="top">

### ⭐ Honest reviews
Real students leave real ratings — only after they've actually taken a paid lesson.

</td>
</tr>
</table>

---

## 🧰 Tech Stack

<div align="center">

| Layer | Technology |
|---|---|
| 🎨 **Frontend** | React 18 · Vite · TailwindCSS 3 · Framer Motion · React Router · Lucide Icons |
| ⚙️ **Backend** | Node.js · Express · Mongoose · JWT · Multer |
| 🗄️ **Database** | MongoDB |
| 💳 **Payments** | Stripe Checkout |
| 🎥 **Video** | Jitsi Meet (External API) |
| 🚀 **Deploy** | Netlify (frontend) · Render (backend) |

</div>

---

## 🎭 Roles

<div align="center">

```mermaid
flowchart LR
    A([🎓 Student]) -- books & pays --> B([👨‍🏫 Tutor])
    B -- teaches live --> A
    B -- uploads recording --> A
    A -- leaves review --> B
    C([👑 Admin]) -- manages --> A
    C -- manages --> B
    style A fill:#3563ff,stroke:#5b87ff,stroke-width:2px,color:#fff
    style B fill:#a855f7,stroke:#c084fc,stroke-width:2px,color:#fff
    style C fill:#14b8a6,stroke:#5eead4,stroke-width:2px,color:#fff
```

</div>

| Student | Tutor | Admin |
|---|---|---|
| Browse & filter tutors | Set availability | Manage all users |
| Book + pay for lessons | Create lessons | Activate / deactivate |
| Attend HD live classes | Host live classes | Change roles |
| Replay recordings | Upload recordings | Delete accounts |
| Leave reviews | Track earnings | View platform stats |

---

## 🚀 Quickstart

> Get the whole platform running locally in under 3 minutes.

### 1. Clone

```bash
git clone https://github.com/Lokesh-web16/Learning-Management-System.git
cd Learning-Management-System
```

### 2. MongoDB

<details>
<summary><b>Option A — Local MongoDB (macOS)</b></summary>

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```
</details>

<details>
<summary><b>Option B — MongoDB Atlas (free cloud, no install)</b></summary>

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas/register)
2. Database Access → add a user
3. Network Access → allow `0.0.0.0/0`
4. Cluster → Connect → copy the connection string
</details>

### 3. Backend

```bash
cd server
cp .env.example .env       # fill in MONGO_URI, JWT_SECRET, STRIPE_SECRET_KEY
npm install
npm run dev                # → API running on :5001
```

### 4. Frontend

```bash
cd client
cp .env.example .env       # set VITE_API_URL=http://localhost:5001/api
npm install
npm run dev                # → http://localhost:5173
```

### 5. Open

```bash
open http://localhost:5173
```

🎉 The app auto-seeds **8 demo tutors with photos, lessons & reviews** on first boot. Try logging in as one of them:

```
sarah.mitchell@demo.com    /  demo1234
marcus.chen@demo.com       /  demo1234
aisha.patel@demo.com       /  demo1234
```

---

## ⚙️ Environment Variables

<details>
<summary><b>📦 server/.env</b></summary>

```ini
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/edumeet
JWT_SECRET=a_long_random_secret_here
CLIENT_URL=http://localhost:5173
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxx     # optional, leave empty to disable payments
```
</details>

<details>
<summary><b>🎨 client/.env</b></summary>

```ini
VITE_API_URL=http://localhost:5001/api
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxx
```
</details>

---

## 🏛 Architecture

```
.
├── client/                          # React + Vite + Tailwind frontend
│   ├── src/
│   │   ├── components/              # Navbar, Footer, TutorCard, SafeImage…
│   │   ├── context/                 # AuthContext (JWT)
│   │   ├── lib/                     # axios api wrapper
│   │   └── pages/                   # Home, TutorList, TutorDetail, Dashboards…
│   └── netlify.toml
│
├── server/                          # Express + Mongoose API
│   ├── src/
│   │   ├── controllers/             # auth, lesson, payment, review, admin…
│   │   ├── middleware/              # auth (JWT) + role guards
│   │   ├── models/                  # User, Lesson, Review, Payment
│   │   ├── routes/                  # /api/auth, /api/lessons, /api/payments…
│   │   └── utils/                   # token, seed
│   └── uploads/                     # lesson recordings (multer)
│
└── render.yaml                      # one-click backend deploy config
```

### Request flow

```mermaid
sequenceDiagram
    participant S as 🎓 Student
    participant FE as 💻 React App
    participant API as ⚙️ Express API
    participant DB as 🗄️ MongoDB
    participant ST as 💳 Stripe
    participant JT as 🎥 Jitsi

    S->>FE: Browse tutors
    FE->>API: GET /api/tutors?subject=Math
    API->>DB: query
    DB-->>API: tutors
    API-->>FE: list
    S->>FE: Book a lesson
    FE->>API: POST /api/lessons/:id/book
    FE->>API: POST /api/payments/checkout
    API->>ST: create session
    ST-->>FE: redirect to checkout
    S->>ST: pay
    ST-->>FE: success_url
    FE->>API: POST /api/payments/confirm
    API->>DB: mark lesson paid
    S->>FE: enter classroom
    FE->>JT: load Jitsi room
    JT-->>S: 🎥 live HD video
```

---

## 🔌 API Reference

<details>
<summary><b>🔐 Auth</b></summary>

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| `POST` | `/api/auth/register` | — | Create student or tutor account |
| `POST` | `/api/auth/login` | — | Get JWT |
| `GET` | `/api/auth/me` | ✅ | Current user |
</details>

<details>
<summary><b>👤 Users & Tutors</b></summary>

| Method | Endpoint | Purpose |
|---|---|---|
| `PUT` | `/api/users/me` | Update own profile |
| `GET` | `/api/users/:id` | Get any user |
| `GET` | `/api/tutors` | List + filter (q, subject, minRating, maxPrice, sort) |
| `GET` | `/api/tutors/:id` | Tutor detail |
</details>

<details>
<summary><b>📚 Lessons</b></summary>

| Method | Endpoint | Auth |
|---|---|---|
| `GET` | `/api/lessons` | — |
| `GET` | `/api/lessons/:id` | — |
| `GET` | `/api/lessons/mine/list` | ✅ |
| `POST` | `/api/lessons` | tutor |
| `PUT` | `/api/lessons/:id` | tutor |
| `DELETE` | `/api/lessons/:id` | tutor / admin |
| `POST` | `/api/lessons/:id/book` | student |
| `POST` | `/api/lessons/:id/cancel` | student / tutor |
| `POST` | `/api/lessons/:id/reschedule` | student / tutor |
| `POST` | `/api/lessons/:id/complete` | tutor |
</details>

<details>
<summary><b>💳 Payments</b></summary>

| Method | Endpoint | Auth |
|---|---|---|
| `POST` | `/api/payments/checkout` | student |
| `POST` | `/api/payments/confirm` | ✅ |
| `GET` | `/api/payments/mine` | ✅ |
</details>

<details>
<summary><b>⭐ Reviews</b></summary>

| Method | Endpoint | Auth |
|---|---|---|
| `POST` | `/api/reviews` | student |
| `GET` | `/api/reviews/tutor/:tutorId` | — |
</details>

<details>
<summary><b>🎬 Recordings</b></summary>

| Method | Endpoint | Auth |
|---|---|---|
| `POST` | `/api/recordings/:lessonId` | tutor (multipart `recording` file) |
| `GET` | `/api/recordings/:lessonId` | student / tutor (only their lesson) |
| `DELETE` | `/api/recordings/:lessonId` | tutor |
</details>

<details>
<summary><b>👑 Admin</b></summary>

| Method | Endpoint |
|---|---|
| `GET` | `/api/admin/users` |
| `GET` | `/api/admin/stats` |
| `PUT` | `/api/admin/users/:id/active` |
| `PUT` | `/api/admin/users/:id/role` |
| `DELETE` | `/api/admin/users/:id` |
</details>

---

## 📄 License

MIT, do whatever you want with it.

<div align="center">

<br/>

<sub>Made with ☕, ⌨️ and a lot of refactors.</sub>

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12&height=120&section=footer" alt="footer wave"/>

</div>

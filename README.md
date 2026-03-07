# TaskEarn Frontend

Next.js application with NextAuth.js authentication and DaisyUI components.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

App runs on: `http://localhost:3000`

## 📁 Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── api/auth/[...nextauth]/  # NextAuth handler
│   │   ├── login/                    # Login page
│   │   ├── register/                 # Register page
│   │   ├── layout.jsx                # Root layout
│   │   └── page.jsx                  # Home page
│   ├── components/
│   │   ├── forms/                    # Form components
│   │   │   ├── LoginForm.jsx
│   │   │   └── RegisterForm.jsx
│   │   ├── Hero/                     # Hero section
│   │   ├── Navbar/                   # Navigation
│   │   ├── BestWorkers/              # Workers section
│   │   ├── Testimonials/             # Testimonials
│   │   └── Providers/                # Context providers
│   ├── lib/
│   │   ├── auth-utils.js             # Auth helpers
│   │   └── validation.js             # Form validation
│   ├── auth.js                       # NextAuth config
│   └── middleware.js                 # Route protection
└── .env                              # Environment variables
```

## 🎨 Components

### Pages (Server Components)
- `/` - Home page
- `/login` - Login page
- `/register` - Register page

### Forms (Client Components)
- `LoginForm` - Login form with validation
- `RegisterForm` - Registration form with validation

### Sections
- `Hero` - Hero section with stats
- `Navbar` - Navigation with auth
- `BestWorkers` - Top workers showcase
- `Testimonials` - User testimonials carousel

## ⚙️ Configuration

Create `.env` file:
```bash
AUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 🛠️ Tech Stack

- Next.js 16 (App Router)
- NextAuth.js 5
- React Hook Form
- React Hot Toast
- DaisyUI + Tailwind CSS
- Lucide Icons
- Swiper.js

## 📚 Documentation

See `.kiro/docs/frontend/` for detailed documentation.

# Bhanu Pratap — 3D Systems & Mobile Portfolio

> Interactive, scroll-driven 3D developer portfolio and architectural showcase built with Next.js, React, Three.js, React Three Fiber, Spline curves, and Tailwind CSS. Hosted directly via GitHub Pages on [ibhanu.github.io](https://ibhanu.github.io).

[![Deploy to GitHub Pages](https://github.com/ibhanu/ibhanu.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/ibhanu/ibhanu.github.io/actions/workflows/deploy.yml)
[![Live Site](https://img.shields.io/badge/Live-ibhanu.github.io-FF4F1F?style=flat&logo=safari&logoColor=white)](https://ibhanu.github.io)

---

## 🏛️ Architectural Overview

- **3D Interactive Device Stage**: WebGL canvas running Three.js + React Three Fiber (`TriptychWorld3D.tsx`) featuring real 3D mobile handset models with brushed metal finish, rim lighting, dynamic island accents, and actual screenshot textures from production applications.
- **Scrollcraft Engine**: Zero-dependency `requestAnimationFrame` scroll progress normalizer (`--sc-p` from `0.0000` to `1.0000`) and velocity tracker (`--sc-v`) driving camera lerp and device rotation without layout thrashing.
- **3D Spline Telemetry Curves**: Architectural 3D Catmull-Rom spline arcs rendered in space with flowing particle packets representing 200ms WebSocket messages, $5M+ transaction events, and native FFI bridging calls.
- **Interactive Device Inspector**: Real-time screen switcher + 3D Orbit toggle allowing visitors to grab, spin, and inspect handsets in 3D.
- **Verified Resume Modal & PDF**: On-page verified resume inspector with one-click PDF download (`/Bhanu_Pratap_Resume.pdf`) and clipboard email copy.
- **Automated GitHub Pages CI/CD**: Workflow in `.github/workflows/deploy.yml` that compiles Next.js static export (`output: 'export'`) and publishes to GitHub Pages via `actions/deploy-pages@v4`.

---

## 📱 Shipped Work Showcased

1. **BigBang.Social** (Tech Lead App, Jul 2023 – Apr 2026):
   - 500,000+ downloads, $5M+ annual creator payouts via Cashfree & Razorpay abstraction layers.
   - 65% crash reduction (2.1% → 0.7%), 18% Day-30 retention lift, 75% faster CI/CD deployments.
2. **Under 25 Universe** (Senior Flutter Developer, Oct 2021 – Jun 2023):
   - 400,000+ student users, $20M+ in platform earnings.
   - Real-time WebSocket chat with isolate background threading reducing latency from 500ms to 200ms.
   - 30+ reusable UI component library, 60 FPS jank-free rendering.
3. **Aura Dating** (Open-Source Flutter + Supabase):
   - Card swipe gesture physics, realtime Postgres chat, Clean Architecture (Data/Domain/Presentation).
4. **Mango: Daily Affirmations** (Consumer Flutter + iOS WidgetKit):
   - 60 FPS accelerometer parallax, mascot progression streak system, native iOS Home/Lock screen widgets.
5. **Sarvam AI Mobile SDKs** (Monorepo):
   - Official 4-platform SDK suite (Flutter, iOS SwiftPM, Android Kotlin, React Native) with <600 KB Rust FFI core and 97.8% test coverage.
6. **Go Microservice Template**:
   - Production Go 1.24 Clean Architecture boilerplate with Prisma PostgreSQL, JWT auth, and Docker Compose.

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start local dev server (http://localhost:3000)
npm run dev

# Compile production static export (outputs to ./out)
npm run build
```

---

## 📄 License

MIT © [Bhanu Pratap](https://github.com/ibhanu)

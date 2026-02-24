# PHALGA - Philippine Heritage and Legacy Global Association

A modern, responsive website built with Next.js 14, TypeScript, and Tailwind CSS, dedicated to preserving and promoting Philippine heritage worldwide.

## Features

- 🚀 **Next.js 14** with App Router
- 📘 **TypeScript** for type safety
- 🎨 **Tailwind CSS** for styling
- 🇵🇭 **Philippine Flag Colors** - Blue (#0038A8), Red (#CE1126), Yellow (#FCD116)
- 📱 **Fully Responsive** - Mobile-first design
- ♿ **Accessible** - WCAG-friendly components
- 🔍 **SEO Optimized** - Comprehensive metadata
- ⚡ **Fast Performance** - Optimized for speed

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── about/          # About page
│   ├── contact/        # Contact page
│   ├── news/           # News & Updates page
│   ├── programs/       # Programs page
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Homepage
├── components/
│   ├── Button.tsx      # Reusable button component
│   ├── Card.tsx        # Card component
│   ├── Footer.tsx      # Footer component
│   ├── Hero.tsx        # Hero section component
│   ├── Navbar.tsx      # Navigation bar
│   └── Section.tsx     # Section container
└── public/             # Static assets
```

## Pages

- **Home** (`/`) - Hero section, about overview, programs, news, and CTA
- **About** (`/about`) - Mission, vision, and values
- **Programs** (`/programs`) - Detailed program information
- **News** (`/news`) - Latest updates and announcements
- **Contact** (`/contact`) - Contact form and information

## Design System

### Colors

- **Philippine Blue**: `#0038A8` - Primary brand color
- **Philippine Red**: `#CE1126` - Secondary/accent color
- **Philippine Yellow**: `#FCD116` - Highlights and CTAs
- **White**: `#FFFFFF` - Main background

### Typography

- **Font**: Inter (via Google Fonts)
- Clean, sans-serif typography with clear hierarchy

## Building for Production

```bash
npm run build
npm start
```

## Technologies

- [Next.js 14](https://nextjs.org/)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## License

This project is created for PHALGA - Philippine Heritage and Legacy Global Association.

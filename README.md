# mulünur - Personal Portfolio Website

A bilingual (English/Russian) portfolio website of Taisia Kartamyshеva (Mulünur), featuring biography facts, programming projects, and original music.

## Features

- **Bilingual Support**: Full Russian/English localization with language switcher
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Multi-section Layout**:
  - Hero section with introduction
  - About page with timeline
  - Skills showcase (programming, music)
  - Paintings grid
  - Music section with player UI
  - Contact form

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Bundler**: Vite
- **Routing**: React Router v6
- **Internationalization**: react-i18next
- **Magic**: Imagination

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── AboutCard.tsx
│   ├── SkillsList.tsx
│   ├── PortfolioGrid.tsx
│   ├── MusicSection.tsx
│   └── ContactSection.tsx
├── pages/              # Page components
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Portfolio.tsx
│   ├── Music.tsx
│   └── Contact.tsx
├── i18n/               # Translations
│   ├── en.json
│   ├── ru.json
│   └── i18n.ts
├── App.tsx
├── main.tsx
└── index.css
public/
├── images/             # Image placeholders (SVG)
└── audio/              # Audio files placeholder
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start dev server (http://localhost:5173)
npm run dev
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2026 Taisia Kartamysheva.

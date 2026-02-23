# mulünur - Personal Portfolio Website

A modern, bilingual (English/Russian) portfolio website for Taissia Kartamyshova (nickname: mulünur), featuring programming projects, 3D modeling work, and original music.

## Features

- **Bilingual Support**: Full Russian/English localization with language switcher
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Modern UI**: Dark theme with purple accent colors, inspired by contemporary design trends
- **Multi-section Layout**:
  - Hero section with introduction
  - About page with timeline
  - Skills showcase (programming, 3D modeling, music)
  - Portfolio grid for projects
  - Music section with player UI
  - Contact form

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Bundler**: Vite
- **Routing**: React Router v6
- **Internationalization**: react-i18next
- **SEO/Head**: React Helmet Async

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

## Customization

### Update Content

Edit the translation files to update text content:
- **English**: `src/i18n/en.json`
- **Russian**: `src/i18n/ru.json`

### Add Media

- **Images**: Place images in `public/images/` and update component imports
- **Audio**: Place audio files in `public/audio/` (currently has placeholder structure)

### Modify Colors

Edit `tailwind.config.js` to change the color scheme. The current setup uses:
- Primary: Purple shades (`#8b3dff` to `#3d0080`)
- Dark: Grayscale (`#111827` to `#f9fafb`)

### Update Social Links

Edit `src/components/Footer.tsx` and `src/components/ContactSection.tsx` to add your actual social media links.

## Pages & Routes

- `/` - Home (Hero + Featured sections)
- `/about` - About with timeline
- `/skills` - Skills and technical stack
- `/portfolio` - Project portfolio grid
- `/music` - Music tracks and album info
- `/contact` - Contact form and links

## Language Switching

The language switcher is in the header. Language preference is saved to localStorage and persists across sessions.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2026 Taissia Kartamyshova. All rights reserved.

## Next Steps

1. Replace placeholder images in `public/images/` with actual project images
2. Add real audio files to `public/audio/` for the music section
3. Update `src/components/ContactSection.tsx` with actual email and social links
4. Deploy to your hosting platform (Vercel, Netlify, GitHub Pages, etc.)
5. Configure custom domain to point to your site

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm i -g netlify-cli
netlify deploy
```

### GitHub Pages

Update `vite.config.ts` with:
```typescript
export default {
  base: '/mulunur.in/',
  // ... rest of config
}
```

Then:
```bash
npm run build
# Push dist/ to gh-pages branch
```

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

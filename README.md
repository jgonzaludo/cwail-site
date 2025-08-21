# CWAIL - Critical Writing and AI Literacy

A React-based educational platform for AI ethics and literacy training, developed at Johns Hopkins University.

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Visit http://localhost:5173

### Build
```bash
npm run build
```

## Project Structure

### Key Routes
- `/` - Home page with course overview
- `/course/introduction` - Start the course (main entry point)
- `/course/:sectionId` - Individual course sections
- `/lab/tokenization` - Interactive tokenization lab
- `/celebration` - Completion page (certificate coming soon)

### Content Management
- **Module Structure**: `src/content/module.json` defines section order and requirements
- **Section Content**: `src/content/sections/*.json` contains individual section content
- **Content Blocks**: Each section supports h2, p, accordion, callout, and cta block types

### Key Components
- `SectionNav` - Course navigation with progress tracking
- `ProgressBar` - Visual progress indicator
- `TokenHighlighter` - Interactive token visualization
- `Accordion` - Collapsible content sections
- `Callout` - Highlighted information boxes

### Development Notes

#### Adding Content
1. Edit section files in `src/content/sections/`
2. Use block types: `h2`, `p`, `accordion`, `callout`, `cta`
3. For navigation: use `{"type":"cta","variant":"next","text":"Next"}`

#### Feature Flags
- `ENABLE_QUIZ` - Quiz functionality (currently disabled)
- `ENABLE_CERT` - Certificate generation (currently disabled)
- `ENABLE_EMBEDDING_PROJECTOR` - Advanced visualization (currently disabled)

#### Progress Tracking
- Uses localStorage for persistence
- Tracks completion of required sections only
- Progress percentage based on required sections completed

#### Accessibility
- Keyboard navigation support
- ARIA attributes on interactive elements
- Focus management for accordions and tokens
- Screen reader friendly navigation

## Testing Tasks

1. **Navigation Flow**: Navigate from introduction → parting-message using Next buttons
2. **Progress Tracking**: Verify ProgressBar increments only when "Mark Complete" clicked
3. **Tokenization Lab**: Test both GPT-2 and CL100K encodings with multi-byte strings
4. **Mobile Responsiveness**: Check responsive design on small screens
5. **Accessibility**: Test keyboard navigation and screen reader compatibility

## Next Steps

When importing PDF content:
1. Replace placeholder text in `src/content/sections/*.json`
2. Add real content blocks (accordions, callouts, etc.)
3. Implement proper gating logic (replace temporary navigation)
4. Add quiz functionality when `ENABLE_QUIZ` is true
5. Implement certificate generation when `ENABLE_CERT` is true

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Tokenization**: gpt-tokenizer

## Contributing

This project is developed for the Johns Hopkins Center for Leadership Education (CLE) with support from the Center for Teaching Excellence and Innovation (CTEI).

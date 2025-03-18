# March Madness Draft Tool

An interactive web application for drafting March Madness teams, featuring real-time odds and statistics.

## Features

- View and sort teams by:
  - Seed
  - Championship odds
  - Final Four odds
  - Elite Eight odds
  - Sweet 16 odds
  - Expected Value (EV)
- Search for specific teams
- Color-coded display of odds and statistics
- First Four teams highlighted with special indicators
- Teams organized by region
- Draft tracking system

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm (comes with Node.js)

### Installation

1. Clone the repository
```bash
git clone [your-repository-url]
cd march-madness-draft
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

- Use the dropdown menu to sort teams by different criteria
- Use the search bar to find specific teams
- Click on a team to draft it
- Teams that have been drafted will be removed from the selection pool
- First Four teams are marked with a basketball emoji 🏀

## Built With

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [TypeScript](https://www.typescriptlang.org/) - For type safety

## License

This project is licensed under the MIT License

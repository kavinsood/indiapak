Built with next.js, [shadcn/ui](https://ui.shadcn.com/), and [magic ui](https://magicui.design/), deployed on Vercel.

# Features

- Setup only takes a few minutes by editing the [single config file](./src/data/resume.tsx)
- Built using Next.js 14, React, Typescript, Shadcn/UI, TailwindCSS, Framer Motion, Magic UI
- Includes a blog
- Responsive for different devices
- Optimized for Next.js and Vercel

# Getting Started Locally

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/dillionverma/portfolio
   ```

2. Move to the cloned directory

   ```bash
   cd portfolio
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Start the local Server:

   ```bash
   pnpm dev
   ```

5. Open the [Config file](./src/data/resume.tsx) and make changes

# IndiaPak War Dashboard

A real-time dashboard tracking the India-Pakistan conflict with live news updates powered by Perplexity AI.

## Features

- **Live News Dashboard**: Real-time news updates with two dynamic widgets:
  - **Community Sentiment Analysis**: AI-powered analysis of online discussions from Indian and Pakistani communities
  - **Latest News Links**: Curated news articles from verified sources with direct links
- **Officially Released Documents**: Access to official government documents and statements
- **War Casualties Tracker**: Real-time updates on the human cost of the conflict
- **Interactive War Timeline**: Visual representation of key events

## Setup

### Prerequisites

- Node.js 18+ and pnpm
- Perplexity API key (get one from [Perplexity Settings](https://www.perplexity.ai/settings/api))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/indiapak.git
cd indiapak
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
# Create a .env.local file
cp .env.example .env.local

# Add your Perplexity API key
PERPLEXITY_API_KEY=your_perplexity_api_key_here
```

4. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## News Dashboard Features

The dashboard uses Perplexity AI's API to provide:

- **Bi-weekly Updates**: Automatic refresh of news and sentiment analysis
- **Real-time Search**: Powered by Perplexity's `sonar` and `sonar-pro` models
- **Community Insights**: Analysis of online discussions without platform-specific references
- **Verified Sources**: News links from trusted media outlets with favicon display
- **Responsive Design**: Optimized for all screen sizes with beautiful UI

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **AI Integration**: Perplexity API for real-time news and sentiment analysis
- **UI Components**: Custom components with smooth animations and transitions

## Development

The project follows modern React patterns with:
- Server-side API routes for secure API key handling
- Client-side data fetching with loading states
- Responsive design with mobile-first approach
- Accessible UI components following WCAG guidelines

## License

MIT License - see LICENSE file for details

## Disclaimer

This dashboard is for informational purposes only. All news content is fetched from third-party sources via Perplexity AI.

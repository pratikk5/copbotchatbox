# Cybersecurity Chatbot

An AI-like chatbot built with Next.js 15 that provides information and assistance on cybersecurity topics. This version uses a mock implementation that doesn't require an API key.

## Features

- Real-time chat interface with simulated responses
- Cybersecurity-focused responses on common topics
- Modern, responsive UI with a clean design
- No API key required - works out of the box

## Getting Started

### Prerequisites

- Node.js 18.17 or later

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cybersecurity-chatbot.git
   cd cybersecurity-chatbot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the chatbot.

## Usage

Simply type your cybersecurity-related questions in the chat input and press Enter or click the Send button. The chatbot will respond with relevant information about:

- Password security and best practices
- Phishing attack prevention
- Malware and virus protection
- Two-factor authentication
- VPN usage and benefits
- Social engineering awareness
- Firewall configuration
- Encryption basics
- Data backup strategies
- Software update importance

## How It Works

This version of the chatbot uses a keyword-based response system that matches user queries to pre-defined cybersecurity topics. It simulates the behavior of an AI assistant without requiring an external API.

## Upgrading to OpenAI (Optional)

If you want to use the OpenAI API for more dynamic responses:

1. Get an API key from [OpenAI](https://platform.openai.com/account/api-keys)
2. Uncomment and update the API key in `.env.local`
3. Modify the `src/app/api/chat/route.ts` file to use the OpenAI client

## Deployment

This project can be easily deployed to Vercel:

```bash
npm install -g vercel
vercel
```

## Technologies Used

- Next.js 15
- TypeScript
- Tailwind CSS
- React

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for providing the AI capabilities
- Vercel for the AI SDK and hosting platform
- Next.js team for the amazing framework

# Refuge Chat : chat Assistant for people experiencing/ about to experience homelessness

A modern chat interface that allows users to query databases using natural language, powered by a local LLM. Built with React, TypeScript, Tailwind CSS, and shadcn/ui.

## 🚀 Features

- **Natural Language Queries**: Ask questions about your database in plain English
- **Real-time Chat Interface**: Modern, responsive chat UI with message history
- **Type-Safe**: Built with TypeScript for reliability and better developer experience
- **Local LLM Ready**: Designed to work with local LLMs (Ollama, llama.cpp, etc.)
- **Mock Backend**: Includes realistic mock responses for testing and development
- **Accessible UI**: Built with shadcn/ui components for accessibility out of the box
- **Dark Mode Support**: Automatic theme support through shadcn/ui

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Type Safety**: TypeScript with strict mode

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- (Optional) Local LLM setup (Ollama, llama.cpp, etc.)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd poc
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install required packages for shadcn**
   ```bash
   npm install clsx tailwind-merge class-variance-authority
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
src/
├── components/
│   └── ui/                      # shadcn/ui components
│       ├── button.tsx
│       ├── input.tsx
│       ├── card.tsx
│       └── scroll-area.tsx
├── features/
│   └── chat/
│       ├── components/
│       │   ├── ChatInterface.tsx    # Main chat UI
│       │   └── MessageBubble.tsx    # Message display
│       └── types/
│           └── chat.types.ts        # TypeScript types
├── pages/
│   └── ChatPage.tsx                 # Chat page route
├── services/
│   └── llmService.ts                # API communication (currently mocked)
├── lib/
│   └── utils.ts                     # Utility functions
└── App.tsx                          # Router configuration
```

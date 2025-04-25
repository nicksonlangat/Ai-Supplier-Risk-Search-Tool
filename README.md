# Supplier Risk Management Assistant

A Next.js application that uses AI to help users query supplier data through natural language conversations. This assistant allows users to ask questions about suppliers and get formatted results through an interactive chat interface.

![Supplier Risk Management Assistant](public/screen.png?height=300&width=600)

## Features

- **Natural Language Queries**: Ask questions about suppliers in plain English
- **Interactive Chat Interface**: Engage with the AI assistant through a chat-like interface
- **Real-time Responses**: Get immediate, streaming responses from the AI
- **Formatted Results**: View supplier data in a well-structured table format
- **Risk Visualization**: Color-coded risk scores for quick assessment
- **Auto-scrolling**: Chat automatically scrolls to show the latest messages

## Query Capabilities

The assistant can answer questions like:

- "What are the top 3 suppliers with the highest risk scores?"
- "Show me all suppliers in the healthcare industry"
- "Which suppliers have financial compliance risks?"
- "List suppliers located in Germany"
- "Find suppliers with environmental risk categories"

## Technology Stack

- **Next.js**: React framework for the frontend and API routes
- **AI SDK**: Vercel's AI SDK for integrating with language models
- **OpenAI**: GPT-4o model for natural language understanding
- **TypeScript**: Type-safe code throughout the application
- **Tailwind CSS**: Utility-first CSS framework for styling

## Installation and Setup

### Prerequisites

- **Node.js**: Version 18.x or higher (LTS recommended)
- **npm** or **yarn**: For package management
- **OpenAI API Key**: Required for AI functionality
- **Git**: For cloning the repository (optional)

### Detailed Installation Steps

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/supplier-risk-assistant.git
cd supplier-risk-assistant
npm install
npm run dev
```
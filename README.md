# BookWiz

### Your library. Your AI companion. Your conversations.

BookWiz is an AI-powered book companion that transforms static PDF books into interactive learning experiences. Upload a book, explore its content, ask questions, and have real-time voice conversations with an AI companion that understands what you're reading.

Built with Next.js, TypeScript, MongoDB, and modern AI voice technologies, BookWiz brings a more personal and engaging way to read, understand, and explore books.

---

## ✨ Features

- **📚 PDF Upload & Processing** — Upload PDF books and process their content for AI-powered interactions.
- **🎙️ Voice Conversations** — Have natural, real-time conversations with your books using voice AI.
- **🤖 AI Book Companion** — Ask questions and explore ideas from your uploaded books.
- **🗣️ Custom AI Voice Personas** — Choose from different AI voices and preview them using ElevenLabs.
- **🧠 Intelligent Context Retrieval** — Use embeddings and contextual retrieval to help generate relevant responses.
- **📝 Smart Summaries & Insights** — Explore key ideas and get summaries of book content.
- **📄 Conversation Transcripts** — Keep track of conversations and revisit useful discussions.
- **📖 Personal Library** — Manage and access your uploaded books.
- **🔐 Secure Authentication** — User authentication and session management powered by Clerk.
- **⚡ Modern Interface** — A responsive interface built with Next.js, Tailwind CSS, and shadcn/ui.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | Full-stack React framework |
| TypeScript | Type-safe development |
| Tailwind CSS | Styling and responsive design |
| shadcn/ui | UI components |
| Clerk | Authentication and user management |
| MongoDB | Database and book metadata |
| Mongoose | MongoDB object modeling |
| Vercel Blob | PDF and file storage |
| Vapi | Real-time voice AI conversations |
| Google Gemini | AI embeddings and contextual processing |
| ElevenLabs | AI voice synthesis |

---

## 🚀 Getting Started

Follow these instructions to run BookWiz locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

You will also need accounts and API credentials for the services used by the application.

### 1. Clone the repository

```bash
git clone https://github.com/mohammadsibtainrazza/bookwiz.git
cd bookwiz
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory of the project.

Add the following variables:

```env
# Application
NODE_ENV=development
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=

# MongoDB
MONGODB_URI=

# Vapi Voice AI
NEXT_PUBLIC_VAPI_API_KEY=
NEXT_PUBLIC_ASSISTANT_ID=
VAPI_SERVER_SECRET=

# Google Gemini
GOOGLE_GEMINI_API_KEY=

# ElevenLabs
ELEVENLABS_API_KEY=
```

Replace the empty values with your own credentials.

**Required service configuration:**

- [Clerk](https://clerk.com/) — Create an application and configure authentication.
- [MongoDB Atlas](https://www.mongodb.com/atlas) — Create a database and obtain your connection string.
- [Vercel](https://vercel.com/) — Create a Blob store and obtain its read/write token.
- [Vapi](https://vapi.ai/) — Configure a voice assistant and obtain your API key, assistant ID, and server secret.
- [Google AI Studio](https://aistudio.google.com/) — Generate a Gemini API key.
- [ElevenLabs](https://elevenlabs.io/) — Generate an API key for voice synthesis.

Keep your API keys and secrets private. Never commit `.env.local` or expose credentials in public repositories.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```text
bookwiz/
├── app/              # Application routes and pages
├── components/       # Reusable UI components
├── database/         # Database models and connections
├── hooks/            # Custom React hooks
├── lib/              # Utilities and service integrations
├── public/           # Static assets
├── types.d.ts        # Type definitions
├── middleware.ts     # Application middleware
├── package.json
└── README.md
```

---

## 🔑 Environment & Security

BookWiz relies on several external services. Make sure the corresponding environment variables are configured before running the application.

- Do not commit API keys, tokens, or database credentials.
- Use restricted API permissions wherever possible.
- Configure authentication redirect URLs for your local and production domains.
- Keep your database credentials and storage tokens secure.

---

## 🗺️ Project Vision

Reading should be more than consuming pages.

BookWiz aims to make books interactive by bringing together reading, artificial intelligence, and voice technology. The goal is to help readers explore ideas, ask better questions, and develop a deeper understanding of what they read.

**Read. Ask. Explore. Understand.**

---

## 👨‍💻 Author

**Mohammad Sibtain Raza**

Developer and creator of BookWiz.

- GitHub: [@mohammadsibtainrazza](https://github.com/mohammadsibtainrazza)

---

<p align="center">
  Built with curiosity and a love for learning.
</p>

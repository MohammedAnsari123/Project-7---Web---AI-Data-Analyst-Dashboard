# AI Data Analyst Dashboard 🧠📊

Welcome to the **AI Data Analyst Dashboard**, a cutting-edge platform designed to revolutionize the way you interact with and analyze your data assets. Through a seamless blend of modern web technologies, scalable backend architectures, and state-of-the-art Large Language Models (LLMs), this dashboard empowers users to perform deep data analysis using intuitive natural language interfaces.

This project goes beyond simple data rendering—it acts as an intelligent "Neural Hub" that synthesizes patterns, interprets complex inquiries, and autonomously generates dynamic visualizations, creating a rich and premium analytical experience.

---

## 🌟 Key Features

- **Neural Hub Chat Interface**: Talk to your data! Submit natural language queries and let the systemic AI engine map them into actionable database operations and insights.
- **Dynamic Intelligence Stage**: Based on query interpretations, the system automatically selects the best visualization format (Bar, Line, Pie, Area, Scatter) and dynamically renders Recharts-driven graphs out of your structured datasets.
- **Automated Insights Pipeline**: As soon as a dataset is uploaded, it seamlessly passes through a pre-analysis phase predicting potential questions and extracting auto-insights.
- **Advanced File Management (Vector Upload)**: Safely upload massive CSV datasets. The application handles buffering, parsing, and structured storage within a MongoDB ecosystem.
- **Report Archives**: Persist your intelligence. Save complex chart configurations and AI-generated insights securely as reusable reports tailored to your user instance.
- **Premium Sci-Fi UI/UX**: Constructed with Framer Motion, Tailwind CSS v4, and Lucide Icons to deliver a staggering aesthetic experience full of glassmorphism, micro-animations, and structured grid geometries.

---

## 🏗️ Architecture & Tech Stack

This project is decoupled into three tightly integrated but autonomous layers:

### 1. Frontend Client (React)
A lightning-fast Single Page Application (SPA) providing an immersive user experience.
- **Core Framework**: React 19, React Router DOM, Vite
- **Styling**: Tailwind CSS v4, Framer Motion (for dynamic transitions)
- **Visuals**: Recharts (for rendering statistical graphics), Lucide React (Icons)
- **Data Fetching**: Axios Context API

### 2. Primary Backend Engine (Node.js/Express)
The orchestration engine validating requests, managing database access, and delegating specific operations to the AI microservice.
- **Runtime & Web Framework**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: JWT (JSON Web Tokens), Bcrypt.js
- **File Handling**: Multer, CSV-Parser

### 3. LLM Microservice (Python/FastAPI)
The analytical 'brain' behind the platform. Dedicated solely to communicating with remote/local ML models to convert conversational English down to structured analytics.
- **Framework**: FastAPI, Uvicorn
- **AI Integrations**: HuggingFace Hub, Requests
- **Data Validation**: Pydantic

---

## 📂 Project Structure

```
Project 7 - Web - AI Data Analyst Dashboard/
├── backend/                       # Node/Express Backend Orchestrator
│   ├── config/                    # Environment & System Configurations
│   ├── controllers/               # Business Logic for Auth, Datasets, LLM orchestration
│   ├── middleware/                # Security & Route Validation (Auth Middleware)
│   ├── models/                    # MongoDB Schemas (User, Dataset, Report, Query)
│   ├── routes/                    # API Endpoints (api/auth, api/datasets, api/llm)
│   ├── uploads/                   # Temporary directory for User File Ingestions
│   └── server.js                  # Main Backend Entry Point 
│
├── frontend/                      # React User Interface
│   ├── public/                    # Static Assets
│   ├── src/
│   │   ├── components/            # Reusable UI Blocks (Layouts, Graph Wrappers)
│   │   ├── context/               # Global states (AuthContext)
│   │   ├── pages/                 # Full Page Renders (Analyze, Dashboard, Upload, etc.)
│   │   ├── services/              # API Client Interceptors (Axios instances)
│   │   ├── App.jsx                # Application Routing Definition
│   │   └── index.css              # Global Styling & Token Variables
│   ├── tailwind.config.js         # Design System configuration
│   └── vite.config.js             # Vite core bundler settings
│
└── llm-service/                   # Python Intelligence Module
    ├── controllers/               # Query Interpretation & Insight Generators
    ├── models/                    # Pydantic Schemas for validation (InsightRequest, etc.)
    ├── prompts/                   # Pre-engineered prompt templates for AI context
    ├── routes/                    # LLM FastApi routers 
    ├── services/                  # Business Logic and LLM Execution Handling
    ├── utils/                     # Utility and formatting functions
    ├── main.py                    # LLM Microservice Entry point
    └── requirements.txt           # Python dependencies
```

---

## 🚀 Installation & Local Development Setup

To run this full-stack application locally, you'll need the following services to run simultaneously open in three separate terminal instances.

### Prerequisites:
- **Node.js**: v18+ 
- **Python**: v3.10+
- **MongoDB**: Active local instance or MongoDB Atlas cluster URI.

### Step 1: Setting up the Backend
1. Traverse into the backend logic module:
   ```bash
   cd backend
   ```
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Initialize the environment variables:
   Create a `.env` file in the `backend/` directory and populate it:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=super_secret_string_for_auth
   LLM_SERVICE_URL=http://localhost:8000
   ```
4. Start the backend:
   ```bash
   node server.js
   ```

### Step 2: Setting up the LLM Service (Python)
1. In a new terminal, navigate to the python microservice:
   ```bash
   cd llm-service
   ```
2. Create and activate a Virtual Environment (Optional but Recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # MacOS/Linux
   venv\Scripts\activate     # Windows
   ```
3. Install Python Dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Initialize the environment variables:
   Create a `.env` file in the `llm-service/` directory and populate it:
   ```env
   HUGGINGFACE_API_KEY=your_hugging_face_token
   ```
5. Start the LLM Microservice:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

### Step 3: Setting up the Frontend
1. Open a third terminal window and enter the React app logic domain:
   ```bash
   cd frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Boot up the Vite Development Server:
   ```bash
   npm run dev
   ```
4. Explore your new local Dashboard by opening `http://localhost:5173` (or the port specified by Vite) in your primary browser!

---

## 🔒 Security & Route Protection
Access context revolves entirely around secure, user-partitioned workflows. User assets and datasets are sandboxed strictly allowing `User A` to query datasets owned *only* by `User A`. JWTs track contextual user IDs across endpoints inside both Node.js verification middleware and UI component protective wrappers.

---

> Crafted by a passionate pursuit to build smarter, neural-powered dashboards. Empowering analytical excellence!

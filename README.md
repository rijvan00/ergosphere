# 🧠 Smart To-Do List

An intelligent to-do list app that automatically categorizes, prioritizes, and schedules tasks based on natural language input — powered by **Mistral AI**, **Django REST**, **Supabase**, and **Next.js**.

---

## 📸 Screenshots

![{ABA0E179-C627-4ED8-AC45-C89D7E16A18F}](https://github.com/user-attachments/assets/e322ca6c-dfa6-4e6a-a88e-06496e5da235)
![{2E5C6075-7526-4CA1-8CEC-0CD2BB118B0A}](https://github.com/user-attachments/assets/3fc5e87a-d48a-469e-8ec4-86feed7c35f2)
![{9F8B0EB4-E2B0-4C59-88A3-BC114A3ECAC2}](https://github.com/user-attachments/assets/009a1322-e7a0-4c0e-8eb8-d829ae908fe3)
![{33E3C349-0021-4867-839E-B313DB331727}](https://github.com/user-attachments/assets/35fe96fe-5bab-4f22-9832-adbb810261b0)
![{00A6CE75-C6B1-41A2-B432-B54F413AB4D5}](https://github.com/user-attachments/assets/01d88d87-de8d-4c87-98fe-cc956ca34e74)

---

## 🛠️ Setup Instructions

### 🔧 Backend (Django)

#### 1. Clone the project
```bash
git clone https://github.com/rijvan00/ergosphere.git
cd ergosphere/backend
```

#### 2. Create virtual environment
```bash
python -m venv env
source env/bin/activate  # or .\env\Scripts\activate on Windows
```

#### 3. Install dependencies
```bash
pip install -r requirements.txt
```

#### 4. Configure environment variables
```
I have pushed the .env as there were only test credetnails that is not confidential for me but help you to run the project.
```

#### 5. Run migrations and start server
```bash
python manage.py migrate
python manage.py runserver
```

---

### 🌐 Frontend (Next.js + TailwindCSS)

#### 1. Go to frontend
```bash
cd ../frontend/smart-todo-frontend
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Run development server
```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🔌 API Documentation

### 🔹 POST `/api/suggestions/`
Generate an AI-based task suggestion from plain English input.

**Request:**
```json
{
  "input": "I have a meeting today and need to prepare slides"
}
```

**Response:**
```json
{
  "title": "Prepare meeting slides",
  "description": "Design and finalize slides for today's client meeting",
  "priority": "high",
  "category": "Work",
  "deadline": "2025-07-05"
}
```

---

### 🔹 GET `/api/tasks/`
Returns all created tasks.

### 🔹 POST `/api/tasks/`
Creates a new task.

**Sample:**
```json
{
  "title": "Buy groceries",
  "description": "Milk, bread, eggs",
  "priority_score": 0.3,
  "category": "Personal",
  "deadline": "2025-07-06",
  "status": "pending"
}
```

---

### 🔹 PATCH `/api/tasks/<id>/`
Update an existing task (e.g., mark as done).

```json
{
  "status": "done"
}
```

---

### 🔹 GET `/api/context/`
Returns all saved context entries (messages, notes, emails).

### 🔹 POST `/api/context/`
Saves a new context entry.

**Example:**
```json
{
  "content": "Reminder: Doctor appointment at 5PM",
  "source": "whatsapp"
}
```

---

## 🧠 AI Suggestion Samples

### ➤ Input:  
`"I have to submit my project by tonight"`

**Output:**
```json
{
  "title": "Submit project",
  "description": "Finalize and upload project before midnight",
  "priority": "high",
  "category": "Study",
  "deadline": "2025-07-05"
}
```

---

### ➤ Input:  
`"Buy vegetables and cook dinner"`

**Output:**
```json
{
  "title": "Cook dinner",
  "description": "Buy veggies and prepare a healthy dinner",
  "priority": "medium",
  "category": "Personal"
}
```

---

## 📂 Tech Stack

- **Backend**: Django + DRF + PostgreSQL (Supabase)
- **Frontend**: Next.js + TailwindCSS
- **AI Engine**: Mistral Inference API
- **Context Storage**: WhatsApp / Email / Notes (manual inputs)
- **Database**: Supabase (hosted PostgreSQL)

---

## 📦 Requirements

Here’s the backend `requirements.txt`:

```
Django>=4.2
djangorestframework>=3.14
psycopg2-binary>=2.9
python-dotenv>=1.0
requests>=2.31
django-cors-headers>=4.3
```

---

## ✨ Features

- 🧠 AI-based task creation from natural sentences
- 📅 Auto-prioritize, categorize & schedule tasks
- 🔁 Toggle task completion
- 🗃️ Context logging: WhatsApp, Email, Notes
- 🔍 Search, filter & sort tasks by priority and deadline
- 🌙 Dark-themed clean UI with Tailwind

---

## 📄 License

MIT — Feel free to use and modify.

---

## 👤 Author

Made with ❤️ by @rijvan00 (https://github.com/rijvan00)

# 🧠 Smart To-Do List

An intelligent to-do list app that automatically categorizes, prioritizes, and schedules tasks based on natural language input — powered by **Mistral AI**, **Django REST**, **Supabase**, and **Next.js**.

---

## 📸 Screenshots

![{85E33C95-1F9E-4C06-86B2-92802EF5C75E}](https://github.com/user-attachments/assets/52ea8ed0-c884-4a4c-aaca-bb0e6fe589e6)
![{08F65629-24C6-4219-9A36-5510C429DE8A}](https://github.com/user-attachments/assets/a79f26cf-8761-41ce-920e-ec5e029765d4)
![{8227997C-7E50-477E-A09C-4C3B72624B75}](https://github.com/user-attachments/assets/54ccef99-d24a-4e28-913a-d885f9ee017b)
![{52934CA9-1E78-4C6E-9FBF-B8B812A27557}](https://github.com/user-attachments/assets/d7a5b320-327d-40cb-97d1-b1a45b56f33f)
![{6B91ADA0-EE54-4250-9D0A-81F41BDF4E4F}](https://github.com/user-attachments/assets/786e5593-bc8b-4097-909d-eeeffe6e9e77)

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

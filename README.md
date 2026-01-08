# Dr. Online - Healthcare Platform

A healthcare web application built with **React** (frontend) and **Node.js + Express + MySQL** (backend).

---

## Project Structure

```
dr-online-frontend/
 src/                    # React source code
    components/         # Reusable UI components
       Navbar.js       # Navigation bar
       Footer.js       # Page footer
       LoadingSpinner.js
       Toast.js        # Notification component
    pages/              # Page components
       Home.js         # Homepage
       About.js        # About page
       Services.js     # Services listing
       Contact.js      # Contact form
       Discussions.js  # Forum page
       AdminMessages.js # Admin panel
    config/
       api.js          # API configuration
    App.js              # Main app component
    index.js            # Entry point
 backend/                # Node.js backend
    server.js           # Express server entry point
    config/
       database.js     # MySQL database connection
    routes/
       health.js       # Health check endpoint
       contacts.js     # Contact messages CRUD
       services.js     # Services CRUD
       users.js        # User auth & management
       appointments.js # Appointments CRUD
    sql/
        setup.sql       # Database schema
 public/                 # Static files
 package.json            # Frontend dependencies
```

---

## Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **MySQL** (via XAMPP or standalone)

### Step 1: Setup Database

1. Start **MySQL** (via XAMPP or standalone)
2. Open terminal and run:
```bash
C:\Users\DELL\Downloads\xampp\mysql\bin\mysql.exe -u root < backend/sql/setup.sql
```

Or import backend/sql/setup.sql via phpMyAdmin.

### Step 2: Start Backend Server

```bash
cd backend
npm install
npm start
```

Backend runs on http://localhost:8000

### Step 3: Start React Frontend

Open a new terminal:
```bash
npm install
npm start
```

Frontend opens at http://localhost:3000

---

## Admin Login

| Field | Value |
|-------|-------|
| Email | admin@healthcare.com |
| Password | admin123 |

---

## API Endpoints

**Base URL:** http://localhost:8000/api

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /health | Health check |
| GET | /services | List all services |
| POST | /services | Create service |
| GET | /contacts | List all messages |
| POST | /contacts | Submit contact form |
| DELETE | /contacts/:id | Delete message |
| POST | /users/login | User login |
| POST | /users/register | User registration |
| GET | /appointments | List appointments |
| POST | /appointments | Book appointment |

---

## Database: healthcare_db

### Tables

**users**
| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| name | VARCHAR(100) | User name |
| email | VARCHAR(100) | Email (unique) |
| password | VARCHAR(255) | Password |
| role | ENUM | admin/doctor/patient |
| specialty | VARCHAR(100) | Doctor specialty |
| license_number | VARCHAR(50) | Doctor license |

**services**
| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| title | VARCHAR(100) | Service name |
| slug | VARCHAR(100) | URL slug |
| description | TEXT | Service details |
| price | DECIMAL | Cost |
| duration_minutes | INT | Duration |

**contacts**
| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| name | VARCHAR(100) | Sender name |
| email | VARCHAR(100) | Sender email |
| subject | VARCHAR(200) | Message subject |
| message | TEXT | Message content |
| status | ENUM | new/read/replied |

**appointments**
| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| patient_name | VARCHAR(100) | Patient name |
| patient_email | VARCHAR(100) | Patient email |
| service_id | INT | Foreign key to services |
| appointment_date | DATE | Date |
| appointment_time | TIME | Time |
| status | ENUM | pending/confirmed/completed/cancelled |

---

## Technologies

### Frontend
- React 19
- React Router DOM
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MySQL / MariaDB
- mysql2 (Database driver)

---

## Available Scripts

### Frontend
| Command | Description |
|---------|-------------|
| npm start | Run development server |
| npm run build | Create production build |
| npm test | Run tests |

### Backend
| Command | Description |
|---------|-------------|
| npm start | Run server |
| npm run dev | Run with nodemon (auto-reload) |

---

## Configuration

### Frontend
Create .env file in root:
```
REACT_APP_API_URL=http://localhost:8000
```

### Backend
Edit backend/.env:
```
PORT=8000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=healthcare_db
```

---

## License

MIT License - Free to use and modify.

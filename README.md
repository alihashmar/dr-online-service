# Dr. Online - Healthcare Platform

A healthcare web application built with **React** (frontend) and **PHP + MySQL** (backend).

---

## 📁 Project Structure

```
dr-online-frontend/
├── src/                    # React source code
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.js       # Navigation bar
│   │   ├── Footer.js       # Page footer
│   │   ├── LoadingSpinner.js
│   │   └── Toast.js        # Notification component
│   ├── pages/              # Page components
│   │   ├── Home.js         # Homepage
│   │   ├── About.js        # About page
│   │   ├── Services.js     # Services listing
│   │   ├── Contact.js      # Contact form
│   │   ├── Discussions.js  # Forum page
│   │   └── AdminMessages.js # Admin panel
│   ├── config/
│   │   └── api.js          # API configuration
│   ├── App.js              # Main app component
│   └── index.js            # Entry point
├── backend/                # PHP backend source
│   ├── api/                # API endpoints
│   │   ├── health.php      # Health check
│   │   ├── services.php    # Services CRUD
│   │   ├── contacts.php    # Contact messages
│   │   ├── appointments.php # Appointments
│   │   └── login.php       # Authentication
│   ├── config/
│   │   ├── database.php    # Database connection
│   │   └── cors.php        # CORS headers
│   └── sql/
│       └── setup.sql       # Database schema
├── public/                 # Static files
└── package.json            # Dependencies
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **XAMPP** (Apache + MySQL)

### Step 1: Setup Database

1. Start **XAMPP** (Apache + MySQL)
2. Open terminal and run:
```bash
C:\Users\DELL\Downloads\xampp\mysql\bin\mysql.exe -u root < backend/sql/setup.sql
```

Or import `backend/sql/setup.sql` via phpMyAdmin.

### Step 2: Deploy PHP Backend

Copy the `backend` folder to XAMPP htdocs:
```
C:\Users\DELL\Downloads\xampp\htdocs\healthcare-api\
```

### Step 3: Start React Frontend

```bash
npm install
npm start
```

Open http://localhost:3000

---

## 🔑 Admin Login

| Field | Value |
|-------|-------|
| Email | `admin@healthcare.com` |
| Password | `admin123` |

---

## 📡 API Endpoints

**Base URL:** `http://localhost/healthcare-api/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health.php` | Health check |
| GET | `/services.php` | List all services |
| GET | `/contacts.php` | List all messages |
| POST | `/contacts.php` | Submit contact form |
| POST | `/login.php` | Admin login |
| GET | `/appointments.php` | List appointments |
| POST | `/appointments.php` | Book appointment |

---

## 🗄️ Database: `healthcare_db`

### Tables

**users**
| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| name | VARCHAR(100) | User name |
| email | VARCHAR(100) | Email (unique) |
| password | VARCHAR(255) | Hashed password |
| role | ENUM | admin/doctor/patient |

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

## 🛠️ Technologies

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Font Awesome Icons

### Backend
- PHP 8.2
- MySQL / MariaDB
- PDO (Database)

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run development server |
| `npm run build` | Create production build |
| `npm test` | Run tests |

---

## 🔧 Configuration

Edit `src/config/api.js` to change API URL:

```javascript
export const API_BASE_URL = 'http://localhost/healthcare-api/api';
```

---

## 📄 License

MIT License - Free to use and modify.

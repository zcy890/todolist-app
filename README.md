# ✅ TaskFlow, A Modern To-Do List Application

A full-stack, responsive to-do list application built with React.js and Express.js, featuring a beautiful glassmorphism UI design and PostgreSQL database integration.

![To-Do List App](https://img.shields.io/badge/Status-Live-brightgreen) ![React](https://img.shields.io/badge/React-18+-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue)

## 🔗 Live Demo

[View Live Application](https://cy-taskflow.onrender.com/)
- **Please Note**: Please allow up to 10 seconds for the web app to fully load before adding any task items. I am using the FREE plan to host my application and Render puts my backend to sleep after a period of inactivity. Sorry for the inconvenience. 

## 🌟 Features

- **Modern Glassmorphism UI**: Beautiful, translucent design with backdrop blur effects
- **Date-based Organization**: Tasks organized by today and upcoming dates
- **Interactive Calendar**: Built-in date picker for task scheduling
- **Real-time CRUD Operations**: Add, view, and delete tasks instantly
- **Responsive Design**: Optimized for desktop and mobile devices
- **Smooth Animations**: Elegant hover effects and transitions
- **PostgreSQL Integration**: Persistent data storage with cloud database

## 🎨 Design Highlights

- **Gradient Backgrounds**: Dynamic color gradients throughout the interface
- **Floating Animations**: Subtle animations that bring the UI to life
- **Modern Typography**: Clean, readable fonts with proper hierarchy
- **Accessible UI**: Proper contrast ratios and semantic markup
- **Micro-interactions**: Engaging hover states and button animations

## 🚀 Tech Stack

### Frontend
- **React 18+** - Modern React with Hooks
- **Material-UI (MUI)** - Component library and design system
- **Day.js** - Lightweight date manipulation library
- **UUID** - Unique identifier generation
- **Custom CSS** - Glassmorphism and modern styling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database
- **CORS** - Cross-origin resource sharing
- **Render** - Cloud deployment platform

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── public/
│   │   └── index.html     # HTML template
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   │   ├── CalendarPicker.js
│   │   │   ├── Footer.js
│   │   │   ├── TaskInput.js
│   │   │   ├── TaskList.js
│   │   │   └── TaskTabs.js
│   │   ├── App.js         # Main application component
│   │   ├── App.css        # Custom styling and animations
│   │   ├── index.js       # React app entry point
│   │   └── index.css      # Global styles
│   ├── package.json       # Frontend dependencies
│   └── package-lock.json  # Locked dependency versions
└── server/                # Express backend
    ├── db.js             # PostgreSQL connection
    ├── index.js          # Server configuration and API routes
    ├── package.json      # Backend dependencies
    └── package-lock.json # Locked dependency versions
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn package manager

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <https://github.com/zcy890/todolist-app.git>
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file
   DATABASE_URL=your_postgresql_connection_string
   PORT=5000
   ```

4. **Create database table**
   ```sql
   CREATE TABLE todos (
     id VARCHAR(255) PRIMARY KEY,
     text TEXT NOT NULL,
     type VARCHAR(50) NOT NULL,
     date DATE NOT NULL
   );
   ```

5. **Start the server**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Update API endpoint** (if needed)
   ```javascript
   // In App.js, update the API constant
   const API = "your-backend-url/api/todos";
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Fetch all todos |
| POST | `/api/todos` | Create a new todo |
| DELETE | `/api/todos/:id` | Delete a specific todo |

### Request/Response Examples

**POST `/api/todos`**
```json
{
  "id": "unique-uuid",
  "text": "Complete project documentation",
  "type": "today",
  "date": "2025-05-24"
}
```

**GET `/api/todos` Response**
```json
[
  {
    "id": "unique-uuid",
    "text": "Complete project documentation",
    "type": "today",
    "date": "2025-05-24"
  }
]
```

## 💡 Key Components

### TaskTabs
Manages the switching between "Today" and "Upcoming" task views with a beautiful tabbed interface.

### CalendarPicker
Integrated date picker allowing users to select specific dates for task scheduling.

### TaskList
Displays filtered tasks based on the selected tab and date, with smooth animations and delete functionality.

### TaskInput
Dynamic input field that changes placeholder text based on the current tab selection.

## 🎯 Features in Detail

### Date Management
- Tasks are organized by date using Day.js for reliable date handling
- Automatic filtering between today's tasks and upcoming tasks
- UTC timezone handling to prevent date shifting issues

### Responsive Design
- Mobile-first approach with responsive breakpoints
- Touch-friendly interface elements
- Optimized typography scaling

### Performance Optimizations
- Efficient state management with React Hooks
- Optimized re-rendering with proper dependency arrays

## 🚀 Deployment

### Backend (Render)
The backend is deployed on Render with automatic deployments from the main branch.

### Frontend
The frontend is deployed on Render with automatic deployments from the main branch.

## 👨‍💻 Author

**Chris Yan** - [GitHub Profile](https://github.com/zcy890)

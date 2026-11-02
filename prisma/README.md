# Student Information System

A web-based Student Information System developed using React, Express.js, Prisma ORM, and MySQL. This application allows users to manage student records through basic CRUD (Create, Read, Update, and Delete) operations.

## Project Description

The Student Information System is designed to make student record management easier. It provides a simple interface where users can add, view, update, and delete student information.

The application uses Prisma ORM to communicate with a MySQL database, allowing student records to be stored persistently.

## Features

- Add new student records
- View all student records
- Update existing student information
- Delete student records
- Store student information in a MySQL database
- Validate required form fields
- Prevent duplicate email addresses

## Technologies Used

**Frontend**
- React
- Vite
- Axios
- CSS

**Backend**
- Node.js
- Express.js

**Database and ORM**
- MySQL
- Prisma ORM 6

**Development Tools**
- Visual Studio Code
- XAMPP
- Git
- GitHub

## Database Structure

Database Name: `student_db`

Table Name: `Student`

| Field | Data Type | Description |
|---|---|---|
| id | Int | Unique student ID |
| name | String | Student full name |
| email | String | Student email address |
| course | String | Student course |
| createdAt | DateTime | Record creation date |

The database is managed using Prisma ORM.

## Project Structure

```text
prisma/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── index.html
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── server.js
├── prismaClient.js
├── prisma.config.ts
├── .env
├── package.json
└── README.md
```

## Installation and Setup

### 1. Install the Requirements

Make sure the following are installed:

- Node.js and npm
- XAMPP
- Visual Studio Code

### 2. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd prisma
```

### 3. Install Backend Dependencies

```bash
npm install
```

### 4. Configure the Database

1. Open XAMPP.
2. Start MySQL.
3. Open phpMyAdmin.
4. Create a database named `student_db`.

### 5. Configure Environment Variables

Create a `.env` file in the main project folder.

Add your MySQL connection:

```env
DATABASE_URL="mysql://root:@localhost:3306/student_db"
```

Update the connection if your MySQL account uses a password.

### 6. Run Prisma Migration

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 7. Install Frontend Dependencies

```bash
cd frontend
npm install
npm install axios
```

## Running the Application

The backend and frontend must run in separate terminals.

### Terminal 1: Start the Backend

From the main project folder:

```bash
node server.js
```

Backend URL:

`http://localhost:3000`

### Terminal 2: Start the Frontend

```bash
cd frontend
npm run dev
```

Frontend URL:

`http://localhost:5173`

If Vite selects another available port, use the URL displayed in your terminal.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/students` | Retrieve all students |
| POST | `/api/students` | Add a student |
| PUT | `/api/students/:id` | Update a student |
| DELETE | `/api/students/:id` | Delete a student |

## Security Notes

- Do not upload your `.env` file to GitHub.
- Keep database credentials private.
- Use `.gitignore` to exclude sensitive files and dependencies.

## Author

Developed as a student project for database integration using Prisma ORM.

## License

This project was created for educational purposes.
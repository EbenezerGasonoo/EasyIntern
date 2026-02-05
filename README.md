# EasyIntern

A full-stack web application that connects companies with interns. EasyIntern provides a platform for companies to post internship opportunities and for students to discover and apply to internships that match their skills.

## Features

### For Companies
- Register and create company profile
- Post internship opportunities with detailed job descriptions
- View and manage applications from interns
- Accept or reject applications
- Track all posted jobs and their application counts

### For Interns
- Register and build a professional profile
- Browse available internship opportunities
- Get personalized job recommendations based on skills
- Apply to jobs with optional cover letters
- Track application status (Pending, Reviewed, Accepted, Rejected)
- View match scores for recommended jobs

### General Features
- JWT-based authentication
- Responsive design
- Skill-based job matching algorithm
- Search and filter jobs by location, remote work, and skills
- Secure API with role-based access control

## Tech Stack

### Backend
- **Node.js** with Express.js
- **PostgreSQL** database
- **Prisma** ORM for database management
- **JWT** for authentication
- **bcryptjs** for password hashing

### Frontend
- **React** with Vite
- **React Router** for navigation
- **Axios** for API calls
- Modern CSS with responsive design

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** or **yarn**

## Installation & Setup

### 1. Clone the Repository

```bash
cd "Easy Intern"
```

### 2. Set Up the Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create a .env file (copy from .env.example)
cp .env.example .env
```

Edit the `.env` file with your database credentials:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/easyintern?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=5001
NODE_ENV=development
```

**Important:** Replace `username`, `password`, and `easyintern` with your actual PostgreSQL credentials and database name.

### 3. Set Up the Database

```bash
# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# (Optional) Open Prisma Studio to view your database
npm run prisma:studio
```

### 4. Set Up the Frontend

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

## Running the Application

### Start the Backend Server

```bash
cd backend
npm run dev
```

The backend server will run on `http://localhost:5001` (Note: Port 5000 is often used by macOS AirPlay, so we use 5001)

### Start the Frontend Development Server

In a separate terminal:

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

### For Companies

1. **Register**: Go to `/register` and select "I'm a Company"
2. **Complete Profile**: Fill in your company details
3. **Post Jobs**: Navigate to your dashboard and click "Post New Job"
4. **Manage Applications**: View applications in your dashboard and accept/reject candidates

### For Interns

1. **Register**: Go to `/register` and select "I'm an Intern"
2. **Build Profile**: Add your skills, education, and experience
3. **Browse Jobs**: Visit `/jobs` to see all available opportunities
4. **Get Recommendations**: Check your dashboard for personalized job recommendations
5. **Apply**: Click on any job to view details and submit an application

## API Endpoints

### Authentication
- `POST /api/auth/register/company` - Register as company
- `POST /api/auth/register/intern` - Register as intern
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Jobs
- `GET /api/jobs` - Get all jobs (with optional query params: search, location, remote, skills)
- `GET /api/jobs/:id` - Get single job
- `POST /api/jobs` - Create job (Company only)
- `PUT /api/jobs/:id` - Update job (Company only)
- `DELETE /api/jobs/:id` - Delete job (Company only)

### Applications
- `POST /api/applications` - Apply to job (Intern only)
- `GET /api/applications/my-applications` - Get intern's applications
- `PATCH /api/applications/:id/status` - Update application status (Company only)

### Company
- `GET /api/company/profile` - Get company profile
- `PUT /api/company/profile` - Update company profile
- `GET /api/company/applications` - Get company's applications

### Intern
- `GET /api/intern/profile` - Get intern profile
- `PUT /api/intern/profile` - Update intern profile
- `GET /api/intern/recommended-jobs` - Get recommended jobs

## Project Structure

```
Easy Intern/
├── backend/
│   ├── src/
│   │   ├── routes/          # API route handlers
│   │   ├── middleware/      # Authentication middleware
│   │   ├── utils/           # Utility functions (database connection)
│   │   └── server.js        # Express server setup
│   ├── prisma/
│   │   └── schema.prisma     # Database schema
│   ├── package.json
│   └── .env                 # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React context (Auth)
│   │   ├── utils/           # Utility functions (API client)
│   │   └── App.jsx          # Main app component
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Database Schema

The application uses the following main models:
- **User**: Base user account (email, password, userType)
- **Company**: Company profile linked to User
- **Intern**: Intern profile linked to User
- **Job**: Job postings by companies
- **Application**: Applications from interns to jobs

## Security Features

- Passwords are hashed using bcryptjs
- JWT tokens for secure authentication
- Role-based access control (Company vs Intern)
- Input validation on API endpoints
- Protected routes on frontend

## Development

### Backend Development
- The backend uses `nodemon` for auto-reloading during development
- Prisma Studio can be used to view and edit database records: `npm run prisma:studio`

### Frontend Development
- Vite provides fast HMR (Hot Module Replacement)
- The frontend proxies API requests to the backend automatically

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Verify DATABASE_URL in `.env` is correct
- Check that the database exists: `createdb easyintern` (if needed)

### Port Already in Use
- Backend: Change `PORT` in `.env` file
- Frontend: Modify `vite.config.js` server port

### Migration Issues
- If migrations fail, try resetting the database: `npx prisma migrate reset`
- **Warning**: This will delete all data

## Production Deployment

### Backend
1. Set `NODE_ENV=production` in `.env`
2. Use a strong `JWT_SECRET`
3. Use a production PostgreSQL database
4. Run `npm run prisma:generate` and `npm run prisma:migrate deploy`
5. Start with `npm start`

### Frontend
1. Build the production bundle: `npm run build`
2. Serve the `dist` folder using a web server (nginx, Apache, etc.)
3. Configure the server to proxy API requests to the backend

## License

This project is open source and available for educational purposes.

## Support

For issues or questions, please check the code comments or refer to the API documentation above.

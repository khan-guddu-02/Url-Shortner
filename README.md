1. Clone the project
2. Start backend:
   cd backend
   cp .env.example .env -> edit with your MONGO_URI and BASE_URL (e.g., http://localhost:5000)
   npm install
   npm run dev

3. Start frontend:
   cd frontend
   npm install
   npm start

4. Open http://localhost:3000 (React). Create a short URL. Try opening the short path (http://localhost:5000/{shortCode}) - it will redirect.

Optional: Deploy backend to Render/Heroku and frontend to Netlify/Vercel. Update REACT_APP_API_BASE accordingly.
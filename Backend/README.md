# Task Management System - Backend

Hey there! This is the backend server for our Task Management application. It's built with the classic MERN stack (well, the MEN part of it anyway) to handle everything from storing your tasks to making sure they're updated correctly when you finish them.

## Why this exists
I built this to provide a solid API that the frontend can rely on. I've focused on keeping the code clean and predictable. One thing you'll notice in the controllers is that I normalized all response keys to lowercase (like `message` instead of `Message`) because consistency is key for a happy frontend.

## Getting Started

First things first, you'll need a MongoDB connection. I've used MongoDB Atlas for this, but you can use a local instance if you prefer.

1.  **Install the goods**: 
    `npm install`
2.  **Environment Variables**: 
    Create a `.env` file. You'll need `MONGO_URI` (your connection string) and a `PORT` (defaults to 5000 if you're lazy).
3.  **Fire it up**: 
    Run `npm run dev`. I've set up `nodemon` so it'll automatically restart whenever you save a file. Super handy.

## How it's built

*   **Express & Node**: The backbone. I've kept the `server.js` simple—just middlewares, routes, and the DB connection.
*   **Mongoose**: Used this for the `Task` model. It handles the validation (like making sure titles aren't too long) and gives us those nice `createdAt` timestamps automatically.
*   **CORS**: It's enabled so the frontend (likely running on port 5173) can actually talk to this server without the browser complaining.

## The API (The important stuff)

I've kept the routes RESTful:
*   `GET /api/tasks` - Gets you every task in the DB.
*   `POST /api/tasks` - For when you have a new thing to do.
*   `PATCH /api/tasks/:id` - Use this for updates (changing titles, toggling status, etc.). It returns the *updated* version of the task.
*   `DELETE /api/tasks/:id` - Self-explanatory. Bye-bye task.

## A Note on the Integration
If you're looking at the code, you'll see that every response returns a JSON object with a `message` and the actual `task` (or `tasks`). I did this so the frontend always knows exactly what happened, whether a task was created or if something went wrong.

Feel free to poke around the `controllers/taskController.js` to see how the logic is handled!

# Remote Workspace

A full-stack MERN application for remote team collaboration with task management, team chat, shared notes, project timeline, and notifications.

## Features

- **Task Management** – Kanban-style board (todo/in-progress/done) with drag-to-update
- **Team Chat** – Real-time messaging for team communication
- **Shared Notes** – Collaborative note-taking with edit/delete
- **Project Timeline** – Gantt-like timeline view of all tasks
- **Notifications** – Bell icon with dropdown for unread notifications

## Architecture

```
remote-workspace/
├── server/
│   ├── config/db.js          – MongoDB connection
│   ├── models/               – Mongoose schemas
│   │   ├── Team.js
│   │   ├── Task.js
│   │   ├── Message.js
│   │   ├── Note.js
│   │   └── Notification.js
│   ├── routes/               – Express REST routes
│   │   ├── teams.js
│   │   ├── tasks.js
│   │   ├── messages.js
│   │   ├── notes.js
│   │   └── notifications.js
│   ├── server.js             – Express server entry point
│   ├── seed.js               – Database seeder
│   └── package.json
├── client/
│   ├── public/index.html
│   ├── src/
│   │   ├── App.js            – Main app with view routing
│   │   ├── App.css           – Complete styling
│   │   ├── index.js          – React entry point
│   │   └── components/       – React components
│   │       ├── Navbar.js
│   │       ├── TeamList.js
│   │       ├── TaskBoard.js
│   │       ├── Chat.js
│   │       ├── Notes.js
│   │       ├── Timeline.js
│   │       └── Notifications.js
│   └── package.json
├── .gitignore
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/teams | List teams |
| POST   | /api/teams | Create team |
| GET    | /api/tasks | List tasks |
| POST   | /api/tasks | Create task |
| PUT    | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |
| GET    | /api/messages | List messages |
| POST   | /api/messages | Send message |
| GET    | /api/notes | List notes |
| POST   | /api/notes | Create note |
| PUT    | /api/notes/:id | Update note |
| DELETE | /api/notes/:id | Delete note |
| GET    | /api/notifications | List notifications |
| PUT    | /api/notifications/:id/read | Mark as read |

## Usage

1. Start MongoDB locally on port 27017
2. `cd server && npm install && npm run seed && npm start`
3. `cd client && npm install && npm start`
4. Open `http://localhost:3000`

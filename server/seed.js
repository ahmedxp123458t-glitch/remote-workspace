const { connectDB } = require('./config/db');
const Team = require('./models/Team');
const Task = require('./models/Task');
const Message = require('./models/Message');
const Note = require('./models/Note');
const Notification = require('./models/Notification');

const seed = async () => {
  await connectDB();

  await Team.deleteMany({});
  await Task.deleteMany({});
  await Message.deleteMany({});
  await Note.deleteMany({});
  await Notification.deleteMany({});

  const team = await Team.create({ name: 'Alpha Team', members: [] });

  await Task.create([
    { teamId: team._id, title: 'Design homepage', status: 'todo', assignee: 'Alice' },
    { teamId: team._id, title: 'Implement auth', status: 'in-progress', assignee: 'Bob' },
    { teamId: team._id, title: 'Deploy to prod', status: 'done', assignee: 'Charlie' },
  ]);

  await Message.create([
    { teamId: team._id, senderId: 'Alice', text: 'Hello team!' },
    { teamId: team._id, senderId: 'Bob', text: 'Working on auth module' },
  ]);

  await Note.create([
    { teamId: team._id, title: 'Meeting Notes', content: 'Sprint planning notes here' },
  ]);

  await Notification.create([
    { userId: 'Alice', message: 'You have a new task assigned' },
  ]);

  console.log('Seed complete');
  process.exit(0);
};

seed();

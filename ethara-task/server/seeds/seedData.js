import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User.js';
import Project from '../src/models/Project.js';
import Task from '../src/models/Task.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});

    // Create users
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@task.com',
      password: 'password123',
      role: 'Admin',
    });

    const member1 = await User.create({
      name: 'John Doe',
      email: 'john@task.com',
      password: 'password123',
      role: 'Member',
    });

    const member2 = await User.create({
      name: 'Jane Smith',
      email: 'jane@task.com',
      password: 'password123',
      role: 'Member',
    });

    console.log('Users created');

    // Create projects
    const project1 = await Project.create({
      name: 'Website Redesign',
      description: 'Redesign the company website',
      createdBy: admin._id,
      members: [admin._id, member1._id, member2._id],
    });

    const project2 = await Project.create({
      name: 'Mobile App',
      description: 'Develop a mobile application',
      createdBy: admin._id,
      members: [admin._id, member1._id],
    });

    console.log('Projects created');

    // Create tasks
    await Task.create({
      title: 'Design UI mockups',
      description: 'Create mockups for the new design',
      projectId: project1._id,
      assignedTo: member1._id,
      status: 'In Progress',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await Task.create({
      title: 'Develop frontend',
      description: 'Build the frontend components',
      projectId: project1._id,
      assignedTo: member2._id,
      status: 'Todo',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    });

    await Task.create({
      title: 'Setup backend API',
      description: 'Create REST API endpoints',
      projectId: project2._id,
      assignedTo: member1._id,
      status: 'Done',
      dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    });

    await Task.create({
      title: 'Database schema design',
      description: 'Design MongoDB schema',
      projectId: project2._id,
      assignedTo: member2._id,
      status: 'In Progress',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    });

    console.log('Tasks created');
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();

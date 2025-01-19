const mongoose = require('mongoose');
const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');
require('dotenv').config();

const createSuperAdmin = async () => {
  const email = 'superadmin@example.com';
  const password = 'SuperAdmin123'; 


  await mongoose.connect(process.env.MONGO_URI);

  const existingSuperAdmin = await Admin.findOne({ email });
  if (existingSuperAdmin) {
    console.log('Super Admin already exists');
    mongoose.disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const superAdmin = new Admin({
    name: 'Super Admin',
    email,
    password: hashedPassword,
  });

  await superAdmin.save();
  console.log('Super Admin created successfully');
  mongoose.disconnect();
};

createSuperAdmin();
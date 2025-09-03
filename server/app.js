const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI =
  'mongodb+srv://robinxdev_db_user:robinxavier@cluster0.ztvv6k5.mongodb.net/schoolDB?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Schemas
const StudentSchema = new mongoose.Schema({
  studentId: String,
  name: String,
  address: String,
  class: String,
  rollNo: String,
});

const ParentSchema = new mongoose.Schema({
  studentId: String,
  fatherName: String,
  motherName: String,
  contactNo: String,
});

const Student = mongoose.model('students', StudentSchema); // ✅ use "student"
const Parent = mongoose.model('parents', ParentSchema);

// API Route with search + sort
app.get('/students', async (req, res) => {
  try {
    const { search, sortBy, order } = req.query;

    // Aggregation pipeline
    let pipeline = [
      {
        $lookup: {
          from: 'parents',
          localField: 'studentId',
          foreignField: 'studentId',
          as: 'parentDetails',
        },
      },
      { $unwind: '$parentDetails' },
      {
        $project: {
          _id: 0,
          id: '$studentId',
          name: 1,
          address: 1,
          class: 1,
          rollNo: 1,
          fatherName: '$parentDetails.fatherName',
          motherName: '$parentDetails.motherName',
        },
      },
    ];

    // 🔍 Apply search filter
    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { address: { $regex: search, $options: 'i' } },
            { class: { $regex: search, $options: 'i' } },
            { rollNo: { $regex: search, $options: 'i' } },
            { fatherName: { $regex: search, $options: 'i' } },
            { motherName: { $regex: search, $options: 'i' } },
          ],
        },
      });
    }

    // ↕️ Apply sorting
    if (sortBy) {
      let sortOrder = order === 'desc' ? -1 : 1;
      pipeline.push({ $sort: { [sortBy]: sortOrder } });
    }

    const result = await Student.aggregate(pipeline);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000/students');
});

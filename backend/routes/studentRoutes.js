const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Create
router.post('/add', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.send('Student Added');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read
router.get('/view', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update
router.put('/update/:id', async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, req.body);
    res.send('Student Updated');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete
router.delete('/delete/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.send('Student Deleted');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

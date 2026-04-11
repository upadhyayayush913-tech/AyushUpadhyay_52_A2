import React, { useState } from 'react';
import axios from 'axios';

function AddStudent() {
  const [formData, setFormData] = useState({ name: '', email: '', course: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/student/add', formData);
      alert('Student Added Successfully!');
      setFormData({ name: '', email: '', course: '' });
      // Note: Ideally lift state up or use a global store to auto-refresh list
    } catch (err) {
      console.error(err);
      alert('Failed to add student');
    }
  };

  return (
    <div className="card">
      <h3>Add New Student</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name (e.g. John Doe)" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
        <input type="text" name="course" placeholder="Course (e.g. Computer Science)" value={formData.course} onChange={handleChange} required />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}

export default AddStudent;

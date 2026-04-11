import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewStudents() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:3000/student/view');
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/student/delete/${id}`);
      alert('Student Deleted');
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id) => {
    const newCourse = prompt('Enter new course:');
    if (!newCourse) return;
    try {
      await axios.put(`http://localhost:3000/student/update/${id}`, { course: newCourse });
      alert('Student Updated');
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card full-width">
      <h3>Students Directory</h3>
      <button onClick={fetchStudents} className="refresh-btn">Refresh List</button>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? students.map((student) => (
              <tr key={student._id}>
                <td><strong>{student.name}</strong></td>
                <td>{student.email}</td>
                <td><span className="badge">{student.course}</span></td>
                <td>
                  <button className="edit-btn" onClick={() => handleUpdate(student._id)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(student._id)}>Delete</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                  No students found. Add one to see it here!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewStudents;

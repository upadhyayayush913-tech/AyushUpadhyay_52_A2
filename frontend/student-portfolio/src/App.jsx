import React from 'react';
import AddStudent from './components/AddStudent';
import ViewStudents from './components/ViewStudents';
import './index.css';

function App() {
  return (
    <div className="container">
      <header>
        <h1>Student Portfolio System</h1>
        <p>MERN Stack CRUD Application</p>
      </header>
      <main className="grid">
        <AddStudent />
        <ViewStudents />
      </main>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import axios from 'axios';
import {useAuthContext} from "../../hooks/useAuthContext"
import styles from "./AddPeople.module.css";
const AddUser = () => {
  const {user} = useAuthContext();
  const [formType, setFormType] = useState('student'); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [collegeName, setCollegeName] = useState('')
  const [message, setMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
      collegeName
    };

    try {
      const route = formType === 'student' ? 'http://localhost:5000/api/auth/addStudent' : 'http://localhost:5000/api/auth/addTeacher';
      const response = await axios.post(route, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setMessage(response.data.message);
      setName('');
      setEmail('');
      setPassword('');
      setCollegeName('');
    } catch (error) {
      console.error("Error adding user:", error);
      setMessage("There was an error adding the user.");
    }
  };

  return (
    <div className={styles["container"]}>
      <h2>{formType === 'student' ? 'Add Student' : 'Add Teacher'}</h2>
        <form onSubmit={handleSubmit} className={styles["form"]}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
              placeholder = "Name"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="text"
            value={collegeName}
            placeholder="College"
            onChange={(e) => setCollegeName(e.target.value)}
            required
          />
        
        <button type="submit">
          Add {formType === 'student' ? 'Student' : 'Teacher'}
        </button>
      </form>

      <button onClick={() => setFormType(formType === 'student' ? 'teacher' : 'student')}>
        Switch to {formType === 'student' ? 'Add Teacher' : 'Add Student'}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default AddUser;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from "../../hooks/useAuthContext";
import styles from "./AddPeople.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";

const AddUser = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  const { user } = useAuthContext();
  const [formType, setFormType] = useState(query);

  useEffect(() => {
    setFormType(query);
  }, [query]);  

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password
    };

    try {
      const route = formType === 'student' ? 'http://localhost:5000/api/auth/addStudent' : 'http://localhost:5000/api/auth/addTeacher';
      const response = await axios.post(route, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setMessage(response.data.message);
      alert(formType+" added")
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error("Error adding user:", error);
      setMessage("There was an error adding the user.");
    }
  };

  return (
    <>
      <Sidebar />
      <div className={styles["container"]}>
        <h2>{formType === 'student' ? 'Add Student' : 'Add Teacher'}</h2>
        <form onSubmit={handleSubmit} className={styles["form"]}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
            placeholder="Name"
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
        
          <button type="submit">
            Add {formType === 'student' ? 'Student' : 'Teacher'}
          </button>
        </form>

        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default AddUser;

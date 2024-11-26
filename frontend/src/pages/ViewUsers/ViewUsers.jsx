import React, { useEffect, useState } from 'react';
import styles from './ViewUsers.module.css'; 
import axios from 'axios';
import Sidebar from "../../components/Sidebar/Sidebar"
import Title from "../../components/Title/Title"
import { useAuthContext } from "../../hooks/useAuthContext";

const FetchUsers = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const response = await axios.get('http://localhost:5000/api/admin/fetchUsers', config);
        setStudents(response.data.students);
        setTeachers(response.data.teachers);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className={styles.loader}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <>
      <Sidebar/>
      <div className={styles.container}>
      <h1 className={styles.title}>Users in Your College</h1>

      <div className={styles.section}>
        <h2>Teachers</h2>
        {teachers.length === 0 ? (
          <p className={styles.empty}>No teachers found</p>
        ) : (
          <ul className={styles.list}>
            {teachers.map((teacher) => (
              <li key={teacher._id} className={styles.listItem}>
                {teacher.name} ({teacher.email})
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.section}>
        <h2>Students</h2>
        {students.length === 0 ? (
          <p className={styles.empty}>No students found</p>
        ) : (
          <ul className={styles.list}>
            {students.map((student) => (
              <li key={student._id} className={styles.listItem}>
                {student.name} ({student.email})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </>
  );
};

export default FetchUsers;

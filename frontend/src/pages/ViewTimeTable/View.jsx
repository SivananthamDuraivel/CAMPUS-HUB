import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import styles from "./Timetable.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";

const AdminTimetableView = () => {
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/timetable/getTimetableAdmin", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setTimetables(response.data.timetables);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching timetable:", err);
        setError("Failed to load timetable");
        setLoading(false);
      }
    };

    fetchTimetable();
  }, []);

  if (loading) return <p className={styles.statusMsg}>Loading timetable...</p>;
  if (error) return <p className={styles.statusMsg}>{error}</p>;

  return (
    <>
    <Sidebar/>
    <div className={styles.container}>
      <h2 className={styles.title}>College Timetable</h2>

      {timetables.length === 0 ? (
        <p className={styles.statusMsg}>No timetable data available</p>
      ) : (
        timetables.map((tt) => (
          <div key={tt._id} className={styles.card}>
            <h3 className={styles.cardHeader}>
              {tt.department.name} - {tt.year.yearName}
            </h3>

            {tt.days.length === 0 ? (
              <p className={styles.emptyMsg}>No entries available.</p>
            ) : (
              tt.days.map((dayBlock, index) => (
                <div key={index} className={styles.dayBlock}>
                  <h4 className={styles.dayTitle}>{dayBlock.day}</h4>
                  <table className={styles.table}>
                    <thead>
                      <tr className={styles.tableHeaderRow}>
                        <th>Period</th>
                        <th>Time</th>
                        <th>Subject</th>
                        <th>Teacher</th>
                        <th>Room</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dayBlock.timetable.map((slot) => (
                        <tr key={slot._id} className={styles.tableRow}>
                          <td>{slot.periodNumber}</td>
                          <td>{slot.startTime} - {slot.endTime}</td>
                          <td>{slot.subject}</td>
                          <td>{slot.teacher}</td>
                          <td>{slot.room}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))
            )}
          </div>
        ))
      )}
    </div>
    </>
  );
};

export default AdminTimetableView;

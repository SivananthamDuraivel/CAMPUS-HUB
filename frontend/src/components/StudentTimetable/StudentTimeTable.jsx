import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import styles from "./Timetable.module.css";

const Timetable = () => {
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/timetable/getTimetableForUser", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setTimetable(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching timetable");
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, []);

  if (loading) return <p className={styles.loading}>Loading timetable...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Timetable</h2>
      {timetable?.days?.map((dayEntry, index) => (
        <div key={index} className={styles.dayCard}>
          <h3 className={styles.day}>{dayEntry.day}</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Period</th>
                <th>Time</th>
                <th>Subject</th>
                <th>Teacher</th>
                <th>Room</th>
              </tr>
            </thead>
            <tbody>
              {dayEntry.timetable.map((entry) => (
                <tr key={entry._id}>
                  <td>{entry.periodNumber}</td>
                  <td>
                    {entry.startTime} - {entry.endTime}
                  </td>
                  <td>{entry.subject}</td>
                  <td>{entry.teacher}</td>
                  <td>{entry.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Timetable;

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Timetable.module.css";
import { useAuthContext } from "../../hooks/useAuthContext";

const Timetable = () => {
  const [departments, setDepartments] = useState([]);
  const [years, setYears] = useState([]);
  const [formData, setFormData] = useState({
    department: "",
    year: "",
    days: [],
  });

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/department/getAllDepts",
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setDepartments(response.data.departments);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, [user.token]);

  useEffect(() => {
    if (formData.department) {
      const selectedDept = departments.find(dept => dept._id === formData.department);
      if (selectedDept) {
        const fetchYears = async () => {
          try {
            const response = await axios.get(
              `http://localhost:5000/api/year/getAllYears/${selectedDept._id}`,
              { headers: { Authorization: `Bearer ${user.token}` } }
            );
            setYears(response.data.years);
          } catch (error) {
            console.error("Error fetching years:", error);
          }
        };
        fetchYears();
      }
    } else {
      setYears([]);
    }
  }, [formData.department, departments, user.token]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDayChange = (index, value) => {
    const updatedDays = [...formData.days];
    updatedDays[index].day = value;
    setFormData({ ...formData, days: updatedDays });
  };

  const addDay = () => {
    setFormData({
      ...formData,
      days: [...formData.days, { day: "", timetable: [] }],
    });
  };

  const addPeriod = (index) => {
    const updatedDays = [...formData.days];
    updatedDays[index].timetable.push({
      periodNumber: 0,
      startTime: "",
      endTime: "",
      subject: "",
      teacher: "",
      room: "",
    });
    setFormData({ ...formData, days: updatedDays });
  };

  const handlePeriodChange = (dayIndex, periodIndex, field, value) => {
    const updatedDays = [...formData.days];
    updatedDays[dayIndex].timetable[periodIndex][field] = value;
    setFormData({ ...formData, days: updatedDays });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.days)
    try {
      await axios.post("http://localhost:5000/api/timetable/insertTimetable", formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert("Timetable added successfully");
    } catch (error) {
      console.error("Error submitting timetable:", error);
      alert("Failed to add timetable.");
    }
  };

  return (
    <div className={styles["container"]}>
      <h2>Add TimeTable</h2>
      <form onSubmit={handleSubmit}>
        <label>Department:</label>
        <select name="department" value={formData.department} onChange={handleInputChange} required>
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept._id}>{dept.name}</option>
          ))}
        </select>

        <label>Year:</label>
        <select name="year" value={formData.year} onChange={handleInputChange} required>
          <option value="">Select Year</option>
          {years.map((yr) => (
            <option key={yr._id} value={yr._id}>{yr.yearName}</option>
          ))}
        </select>
        
        <button type="button" onClick={addDay} className={styles["add-btn"]}>+ Add Day</button>

        {formData.days.map((day, dayIndex) => (
          <div key={dayIndex} className={styles["day-container"]}>
            <label>Day: </label>
            <select value={day.day} onChange={(e) => handleDayChange(dayIndex, e.target.value)} required>
              <option value="">Select a day</option>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <button type="button" onClick={() => addPeriod(dayIndex)} className={styles["add-btn"]}>+ Add Period</button>
            {day.timetable.map((period, periodIndex) => (
              <div key={periodIndex} className={styles["period-container"]}>
                <label>Period Number: </label>
                <input type="number" value={period.periodNumber} onChange={(e) => handlePeriodChange(dayIndex, periodIndex, "periodNumber", e.target.value)} required />
                <label>Start Time:</label>
                <input type="time" value={period.startTime} onChange={(e) => handlePeriodChange(dayIndex, periodIndex, "startTime", e.target.value)} required />
                <label>End Time:</label>
                <input type="time" value={period.endTime} onChange={(e) => handlePeriodChange(dayIndex, periodIndex, "endTime", e.target.value)} required />
                <label>Subject:</label>
                <input type="text" value={period.subject} onChange={(e) => handlePeriodChange(dayIndex, periodIndex, "subject", e.target.value)} required />
                <label>Teacher:</label>
                <input type="text" value={period.teacher} onChange={(e) => handlePeriodChange(dayIndex, periodIndex, "teacher", e.target.value)} required />
                <label>Room:</label>
                <input type="text" value={period.room} onChange={(e) => handlePeriodChange(dayIndex, periodIndex, "room", e.target.value)} required />
              </div>
            ))}
          </div>
        ))}

        <button type="submit" >Submit</button>
      </form>
    </div>
  );
};

export default Timetable;

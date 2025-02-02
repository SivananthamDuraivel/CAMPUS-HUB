import {useState} from "react";
import axios from "axios";
import styles from "./Timetable.module.css";

const Timetable = () => {
  const [formData, setFormData] = useState({
    college: "",
    department: "",
    year: "",
    section: "",
    days: [],
  })

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }
  
  const handleDayChange = (index, value) => {
    const updatedDays = [...formData.days];
    updatedDays[index].day = value;
    setFormData({...formData, days: updatedDays});
  }
  
  
  const addDay = () => {
    setFormData({
      ...formData,
      days: [...formData.days, { day: "", timetable: [] }],
    });
  };
  
  const addPeriod = (index) => {
    const updatedDays = [...formData.days];
    updatedDays[index].timetable.push({
      periodNumber: "",
      startTime: "",
      endTime: "",
      subject: "",
      teacher: "",
      room: "",
    })
    setFormData({...formData, days: updatedDays});
  }
  
  const handlePeriodChange = (dayIndex, periodIndex, field, value) => {
    const updatedDays = [...formData.days];
    updatedDays[dayIndex].timetable[periodIndex][field] = value;
    setFormData({...formData, days: updatedDays})
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/timetable/insertTimetable",formData);
      alert("Timetable added successfully");
    }
    catch(error) {
      console.error("Error submitting timetable:", error);
      alert("Failed to add timetable.");
    }
  }

  return (
    <div className = {styles["container"]}>
      <h2>Add TimeTable</h2>
      <form onSubmit={handleSubmit}>
        <label>College :</label>
        <input type="text" name="college" value = {formData.college} onChange = {handleInputChange} required/>
        <label>Department :</label>
        <input type="text" name="department" value = {formData.department} onChange = {handleInputChange} required/>
        <label>Year :</label>
        <input type="text" name="year" value = {formData.year} onChange = {handleInputChange} required/>
        <label>Section :</label>
        <input type="text" name="section" value = {formData.section} onChange = {handleInputChange} required/>
        <button type="button" onClick={addDay} className={styles["add-btn"]}>+ Add Day</button>
        { 
          formData.days.map((day, dayIndex) => (
            <div key={dayIndex} className={styles["day-container"]}>
              <label>Day: </label>
              <select value={day.day} onChange={(e)=>handleDayChange(dayIndex, e.target.value)} required>
                <option value="">Select a day</option>
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((d)=>(
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <button type="button" onClick = {() => addPeriod(dayIndex)} className={styles["add-btn"]}>+ Add Period</button>
              {
                day.timetable.map((period, periodIndex) => (
                  <div key={periodIndex} className="period-container">
                    <label>Period Number: </label>
                    <input type="number" value = {period.periodNumber} onChange = {(e) => handlePeriodChange(dayIndex, periodIndex, "periodNumber", e.target.value)} required/>
  
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
                ))
              }
            </div>
          ))
        }
        <button type="submit" className={styles["submit-btn"]}>Submit</button>
      </form>
    </div>
  )
}
export default Timetable;
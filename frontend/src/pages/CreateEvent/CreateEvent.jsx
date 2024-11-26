import React, { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./CreateEvent.module.css";

const CreateEvent = () => {
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventDate: "",
    registrationDeadline: "",
    notificationPeriod: "",
    type: "intra",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setMessage(""); // Clear previous message

    try {
      const response = await axios.post(
        "http://localhost:5000/api/events/createEvent",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // Pass the token in headers
          },
        }
      );
      setMessage(response.data.message || "Event created successfully!");
    } catch (error) {
      const errorMsg =
        error.response?.data?.error ||
        error.message ||
        "An unexpected error occurred!";
      setMessage(errorMsg);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <Sidebar />
      <div className={styles.container}>
        <h2>Create Event</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <TextAreaField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <InputField
            label="Event Date"
            type="datetime-local"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
          />
          <InputField
            label="Registration Deadline"
            type="datetime-local"
            name="registrationDeadline"
            value={formData.registrationDeadline}
            onChange={handleChange}
          />
          <InputField
            label="Notification Period (in days)"
            type="number"
            name="notificationPeriod"
            value={formData.notificationPeriod}
            onChange={handleChange}
          />
          <div className={styles.formGroup}>
            <label className={styles.label}>Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className={styles.selectField}
            >
              <option value="intra">Intra</option>
              <option value="inter">Inter</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={styles.button}
          >
            {loading ? "Submitting..." : "Create Event"}
          </button>
        </form>
        {message && (
          <p
            className={
              message.includes("success")
                ? styles.successMessage
                : styles.errorMessage
            }
          >
            {message}
          </p>
        )}
      </div>
    </>
  );
};

const InputField = ({ label, type, name, value, onChange }) => (
  <div className={styles.formGroup}>
    <label className={styles.label}>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required
      className={styles.inputField}
    />
  </div>
);

const TextAreaField = ({ label, name, value, onChange }) => (
  <div className={styles.formGroup}>
    <label className={styles.label}>{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      required
      className={styles.textareaField}
    ></textarea>
  </div>
);

export default CreateEvent;

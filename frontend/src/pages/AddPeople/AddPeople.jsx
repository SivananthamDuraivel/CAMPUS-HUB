import React, { useState, useEffect } from "react";
import axios from "axios";
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

  const [departments, setDepartments] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/department/getAllDepts", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        console.log("Fetched Departments:", response.data.departments);
        setDepartments(response.data.departments || []);
      })
      .catch(() => {
        setDepartments([]);
      });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
      department, // Include selected department in data
    };

    try {
      const route =
        formType === "student"
          ? "http://localhost:5000/api/auth/addStudent"
          : "http://localhost:5000/api/auth/addTeacher";
      const response = await axios.post(route, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setMessage(response.data.message);
      alert(formType + " added");
      setName("");
      setEmail("");
      setPassword("");
      setDepartment(""); // Reset department selection
    } catch (error) {
      console.error("Error adding user:", error);
      setMessage("There was an error adding the user.");
    }
  };

  return (
    <>
      <Sidebar />
      <div className={styles["container"]}>
        <h2>{formType === "student" ? "Add Student" : "Add Teacher"}</h2>
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

          {/* Fixed Select Dropdown */}
          <select
            name="depts"
            id="depts"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Department
            </option>
            {departments.map((dept) => (
              <option key={dept.name} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>

          <button type="submit">
            Add {formType === "student" ? "Student" : "Teacher"}
          </button>
        </form>

        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default AddUser;

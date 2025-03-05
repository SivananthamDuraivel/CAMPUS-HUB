import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import styles from "./Management.module.css";

const Management = () => {
  const [departments, setDepartments] = useState([]);
  const [newDeptName, setNewDeptName] = useState("");
  const [expandedDept, setExpandedDept] = useState(null);
  const [yearInputs, setYearInputs] = useState({});

  const { user } = useAuthContext();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/department/getAllDepts", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        setDepartments(
          response.data.departments.map((dept) => ({
            ...dept,
            years: dept.years || [], // Ensure years is always an array
          }))
        );
      })
      .catch(() => {
        setDepartments([]);
      });
  }, [user]);

  const addDepartment = async () => {
    if (!newDeptName.trim()) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/department/addDept",
        { name: newDeptName },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setDepartments((prev) => [
        ...prev,
        { ...response.data.department, years: [] }, // Ensure years is an empty array initially
      ]);
      setNewDeptName("");
    } catch (error) {
      console.error("Error adding department:", error);
    }
  };

  const toggleYearManagement = (deptId) => {
    setExpandedDept(expandedDept === deptId ? null : deptId);
  };

  const handleYearInputChange = (deptId, value) => {
    setYearInputs((prev) => ({ ...prev, [deptId]: value }));
  };

  const addYear = async (deptId) => {
    if (!yearInputs[deptId]?.trim()) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/year/addYear",
        { yearName: yearInputs[deptId], departmentId: deptId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      const newYear = response.data.year;

      setDepartments((prev) =>
        prev.map((dept) =>
          dept._id === deptId
            ? { ...dept, years: [...(dept.years || []), newYear] }
            : dept
        )
      );

      setYearInputs((prev) => ({ ...prev, [deptId]: "" }));
    } catch (error) {
      console.error("Error adding year:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Department Management</h2>
      <div className={styles.addSection}>
        <input
          type="text"
          value={newDeptName}
          onChange={(e) => setNewDeptName(e.target.value)}
          placeholder="Enter department name"
          className={styles.input}
        />
        <button onClick={addDepartment} className={styles.addButton}>
          Add Department
        </button>
      </div>
      <div className={styles.listContainer}>
        {departments.length > 0 ? (
          departments.map((dept) => (
            <div key={dept._id} className ={styles.departmentCard}>
              <h3>{dept.name}</h3>
              <p>Years: {dept.years.length}</p>
              <button
                onClick={() => toggleYearManagement(dept._id)}
                className={styles.manageYearsButton}
              >
                {expandedDept === dept._id ? "Close Year Management" : "Manage Years"}
              </button>
              {expandedDept === dept._id && (
                <div className={styles.yearManagement}>
                  <div className={styles.yearInputSection}>
                    <input
                      type="text"
                      value={yearInputs[dept._id] || ""}
                      onChange={(e) => handleYearInputChange(dept._id, e.target.value)}
                      placeholder="Enter year"
                      className={styles.input}
                    />
                    <button onClick={() => addYear(dept._id)} className={styles.addYearButton}>
                      Add Year
                    </button>
                  </div>
                  <ul className={styles.yearList}>
                    {dept.years.map((year,index) => (
                      <li key={year._id} className={styles.yearItem}>
                        {
                            (index==0)?"First":(index == 1)?"Second":(index == 2)?"Third":"Fourth"
                        }
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No departments available</p>
        )}
      </div>
    </div>
  );
};

export default Management;
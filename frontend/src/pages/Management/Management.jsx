import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import styles from "./Management.module.css";

const yearOptions = ["First", "Second", "Third", "Fourth"];

const Management = () => {
  const [departments, setDepartments] = useState([]);
  const [newDeptName, setNewDeptName] = useState("");
  const [expandedDept, setExpandedDept] = useState(null);
  const [yearInputs, setYearInputs] = useState({});
  const [yearErrors, setYearErrors] = useState({});
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
            years: dept.years || [],
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
      alert("Department added");

      setDepartments((prev) => [...prev, { ...response.data.department, years: [] }]);
      setNewDeptName("");
    } catch (error) {
      console.error("Error adding department:", error);
    }
  };

  const toggleYearManagement = (deptId) => {
    setExpandedDept(expandedDept === deptId ? null : deptId);
  };

  const handleYearSelection = (deptId, value) => {
    setYearInputs((prev) => ({ ...prev, [deptId]: value }));
    setYearErrors((prev) => ({ ...prev, [deptId]: "" })); 
  };

  const addYear = async (deptId) => {
    if (!yearInputs[deptId]) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/year/addYear",
        { yearName: yearInputs[deptId], departmentId: deptId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setDepartments((prev) =>
        prev.map((dept) =>
          dept._id === deptId
            ? { ...dept, years: [...dept.years, response.data.year] }
            : dept
        )
      );

      setYearInputs((prev) => ({ ...prev, [deptId]: "" }));
      setYearErrors((prev) => ({ ...prev, [deptId]: "" })); // ✅ Clear error on success
    } catch (error) {
      console.error("Error adding year:", error);
      if (error.response && error.response.data.error) {
        setYearErrors((prev) => ({ ...prev, [deptId]: error.response.data.error })); // ✅ Set error message
      }
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
          departments.map((dept) => {
            const existingYears = dept.years.map((y) => y.name);
            const availableYears = yearOptions.filter((year) => !existingYears.includes(year));

            return (
              <div key={dept._id} className={styles.departmentCard}>
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
                      <select
                        value={yearInputs[dept._id] || ""}
                        onChange={(e) => handleYearSelection(dept._id, e.target.value)}
                        className={styles.input}
                      >
                        <option value="" disabled>Select year</option>
                        {availableYears.map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                      <button onClick={() => addYear(dept._id)} className={styles.addYearButton}>
                        Add Year
                      </button>
                    </div>

                    {/* ✅ Show error message if year already exists */}
                    {yearErrors[dept._id] && (
                      <p className={styles.errorText}>{yearErrors[dept._id]}</p>
                    )}

                    <ul className={styles.yearList}>
                      {dept.years.map((year, index) => (
                        <li key={index} className={styles.yearItem}>
                          {year.name || `Year ${index + 1}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p>No departments available</p>
        )}
      </div>
    </div>
  );
};

export default Management;

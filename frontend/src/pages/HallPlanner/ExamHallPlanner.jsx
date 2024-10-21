import React, { useState, useRef } from 'react';
import styles from './ExamHallPlanner.module.css';
import { FaCheck, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';

const ExamHallPlanner = () => {

    const [row, setRow] = useState(0);
    const [column, setColumn] = useState(0);

    const [department, setDepartment] = useState('');
    const [count, setCount] = useState('');

    const [departmentDetails, setDepartmentDetails] = useState(new Map());
    const [editDepartment, setEditDepartment] = useState(null);
    const [editDepartmentName, setEditDepartmentName] = useState(''); // For editing department name
    const [editCount, setEditCount] = useState('');
    const departmentInputRef = useRef(null);

    const handleAddDepartment = (e) => {
        e.preventDefault();

        if (row === 0 || row === null || column === 0 || column === null) {
            window.alert("Kindly fill the Dimension of the classroom");
            return;
        }
        if (department === '' || count === '' || count <= 0) {
            window.alert("Both department and count must be filled.");
            return;
        }

        const newDepartmentDetails = new Map(departmentDetails);
        newDepartmentDetails.set(department.trim(), count);
        setDepartmentDetails(newDepartmentDetails);

        setDepartment('');
        setCount('');
        departmentInputRef.current.focus();
    };

    const handleEditClick = (e, dept, currentCount) => {
        e.preventDefault();
        setEditDepartment(dept);
        setEditDepartmentName(dept); // Set department name for editing
        setEditCount(currentCount);
    };

    const handleSaveClick = (e, dept) => {
        e.preventDefault();

        const newDepartmentDetails = new Map(departmentDetails);
        newDepartmentDetails.delete(dept); // Remove old department key
        newDepartmentDetails.set(editDepartmentName, editCount); // Set new department name and count
        setDepartmentDetails(newDepartmentDetails);

        setEditDepartment(null);
        setEditDepartmentName('');
        setEditCount('');
    };

    const handleCancelClick = () => {
        setEditDepartment(null);
        setEditDepartmentName('');
        setEditCount('');
    };

    const handleDeleteClick = (e, dept) => {
        e.preventDefault();

        const newDepartmentDetails = new Map(departmentDetails);
        newDepartmentDetails.delete(dept);
        setDepartmentDetails(newDepartmentDetails);
    };

    return (
        <div>
            <center><h2 className={styles['examHall-title']}>EXAM HALL PLAN</h2></center>
            <div className={styles['examHall-requirements']}>
                <form action="">
                    <label>Enter the dimension of the class:</label>
                    <div className={styles['examHall-dimension']}>
                        <input type="number" placeholder="Row" onChange={(e) => setRow(e.target.value)} />
                        <input type="number" placeholder="Column" onChange={(e) => setColumn(e.target.value)} />
                    </div>
                    <label>Enter Department and Count</label>
                    <div className={styles['examHall-getDepartment']}>
                        <input type="text" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} ref={departmentInputRef} />
                        <input type="number" placeholder="Count" value={count} onChange={(e) => setCount(e.target.value)} />
                    </div>
                    <button className={styles['examHall-addDepartmentBtn']} onClick={handleAddDepartment}>
                        Add Department
                    </button>

                    {departmentDetails.size > 0 ? (
                        <div className={styles['examHall-displayDepartment']}>
                            <table style={{ border: '2px solid black', borderCollapse: 'collapse', width: '100%' }} >
                                <thead>
                                    <tr>
                                        <th style={{ border: '1.5px solid black', padding: '10px' }}>Department</th>
                                        <th style={{ border: '1.5px solid black', padding: '10px' }}>Count</th>
                                        <th style={{ border: '1.5px solid black', padding: '10px' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.from(departmentDetails).map(([dept, count], index) => (
                                        <tr key={index}>
                                            <td style={{ border: '1.5px solid black', padding: '10px' }}>
                                                {editDepartment === dept ? (
                                                    <input type="text" value={editDepartmentName} onChange={(e) => setEditDepartmentName(e.target.value)} />
                                                ) : (
                                                    dept
                                                )}
                                            </td>

                                            <td style={{ border: '1.5px solid black', padding: '10px' }}>
                                                {editDepartment === dept ? (
                                                    <input type="number" value={editCount} onChange={(e) => setEditCount(e.target.value)} />
                                                ) : (
                                                    count
                                                )}
                                            </td>

                                            <td style={{ border: '1.5px solid black', padding: '10px' }}>
                                                {editDepartment === dept ? (
                                                    <div className={styles['examHall-actions']}>
                                                        <button onClick={(e) => handleSaveClick(e, dept)}><FaCheck /></button>
                                                        <button onClick={handleCancelClick}><FaTimes /></button>
                                                    </div>
                                                ) : (
                                                    <div className={styles['examHall-actions']}>
                                                        <button onClick={(e) => handleEditClick(e, dept, count)}><FaEdit /></button>
                                                        <button onClick={(e) => handleDeleteClick(e, dept)}><FaTrash /></button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : null}

                    <input type="submit" value="Generate" className={styles['examHall-generateBtn']} />
                </form>
            </div>
        </div>
    );
};

export default ExamHallPlanner;

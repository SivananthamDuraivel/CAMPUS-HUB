import React, { useState, useRef } from 'react';
import styles from './ExamHallPlanner.module.css';
import { FaCheck, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';

const ExamHallPlanner = () => {

    const [row, setRow] = useState(0);
    const [column, setColumn] = useState(0);
    const [studentsPerBench, setStudentsPerBench]=useState(1);

    const [department, setDepartment] = useState('');
    const [count, setCount] = useState('');
    const [seatingArrangement, setSeatingArrangement] = useState([]);

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
        if (studentsPerBench === null || studentsPerBench >2)
        {
            window.alert("properly select the no. of students per bench!")
            return;
        }
        if (department === '' || count === '' || count <= 0) {
            window.alert("Both department and count must be filled.");
            return;
        }

        const newDepartmentDetails = new Map(departmentDetails);
        newDepartmentDetails.set(department.trim().toUpperCase(), count);
        setDepartmentDetails(newDepartmentDetails);

        setDepartment('');
        setCount('');
        departmentInputRef.current.focus();
    };

    const handleEditClick = (e, dept, currentCount) => {
        e.preventDefault();
        setEditDepartment(dept);
        setEditDepartmentName(dept); 
        setEditCount(currentCount);
    };

    const handleSaveClick = (e, dept) => {
        e.preventDefault();

        const newDepartmentDetails = new Map(departmentDetails);
        newDepartmentDetails.delete(dept); 
        newDepartmentDetails.set(editDepartmentName, editCount); 
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

    const generateSeatingArrangement = (e) => {
        if(departmentDetails.size()==0)
        {
            window.alert("No departments available.")
            return "No departments available.";
        }
        e.preventDefault();
        const totalSeatsPerClassroom = row * column * studentsPerBench;
        const studentList = [];

        // Generate a list of students based on department and count
        departmentDetails.forEach((count, department) => {
            for (let i = 0; i < count; i++) {
                studentList.push(department);
            }
        });

        let index = 0;
        let classroomIndex = 1;
        const classrooms = [];

        while (index < studentList.length) {
            // Initialize an empty classroom
            const currentClassroom = Array.from({ length: row }, () => Array(column).fill(null));
            let seatsFilled = 0;

            for (let r = 0; r < row; r++) {
                for (let c = 0; c < column; c++) {
                    let bench = [];

                    while (bench.length < studentsPerBench && index < studentList.length) {
                        const student = studentList[index];

                        const leftBench = c > 0 ? currentClassroom[r][c - 1] : null;
                        const topBench = r > 0 ? currentClassroom[r - 1][c] : null;

                        // Check if the student can sit here based on the constraints
                        if (
                            (!bench.includes(student)) &&
                            (!leftBench || !leftBench.includes(student)) &&
                            (!topBench || !topBench.includes(student))
                        ) {
                            bench.push(student);
                            index++;
                        } else {
                            // Skip this student temporarily if they can't be seated here due to constraints
                            index++;
                            if (index >= studentList.length) index = 0; // Wrap around if end of list is reached
                        }
                    }

                    currentClassroom[r][c] = bench.length ? bench : ["Empty"];
                    seatsFilled += bench.length;

                    if (seatsFilled >= totalSeatsPerClassroom || index >= studentList.length) break;
                }
                if (seatsFilled >= totalSeatsPerClassroom || index >= studentList.length) break;
            }

            classrooms.push({ classroomNumber: classroomIndex++, seats: currentClassroom });
        }

        setSeatingArrangement(classrooms);
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
                    <div className={styles['studentsPerBench']}>
                        <label>Students per bench: </label>
                        <div className={styles['radios']}>
                            <input type="radio" name="studentsPerBench" checked={studentsPerBench === 1} onChange={() => setStudentsPerBench(1)} /> <p>One</p>
                            <input type="radio" name="studentsPerBench" checked={studentsPerBench === 2} onChange={() => setStudentsPerBench(2)} /> <p>Two</p>
                        </div>
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
                    
                    <input type="submit" onClick={(e) => {generateSeatingArrangement(e)}} value="Generate" className={styles['examHall-generateBtn']} />
                </form>
            </div>
            <div>
                {seatingArrangement.length > 0 && (
                    <div>
                        {seatingArrangement.map((classroom, classroomIndex) => (
                            <div key={classroomIndex}>
                                <h3>Classroom {classroom.classroomNumber}</h3>
                                <table style={{ border: '1px solid black', borderCollapse: 'collapse', marginBottom: '20px' }}>
                                    <tbody>
                                        {classroom.seats.map((row, rowIndex) => (
                                            <tr key={rowIndex}>
                                                {row.map((bench, colIndex) => (
                                                    <td
                                                        key={colIndex}
                                                        style={{ padding: '10px', border: '1px solid black' }}
                                                    >
                                                        {bench.length > 0 ? bench.join(', ') : 'Empty'}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                )}
            </div>


        </div>
    );
};

export default ExamHallPlanner;

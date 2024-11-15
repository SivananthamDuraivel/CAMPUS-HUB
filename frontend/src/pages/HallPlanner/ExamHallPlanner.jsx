import React, { useState, useRef } from 'react';
import styles from './ExamHallPlanner.module.css';
import { FaCheck, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';

const ExamHallPlanner = () => {

    const [row, setRow] = useState(0);
    const [column, setColumn] = useState(0);
    const [studentsPerBench, setStudentsPerBench]=useState(1);
    const [seatingType,setSeatingType]=useState('vertical')

    const [department, setDepartment] = useState('');
    const [count, setCount] = useState('');
    const [startingRollNo, setStartingRollNo] = useState('');

    const [departmentDetails, setDepartmentDetails] = useState(new Map());
    const [rollNumberMap,setRollNumberMap]=useState(new Map());

    const [seatingArrangement, setSeatingArrangement] = useState([]);
    const [editableSeatingArrangement, setEditableSeatingArrangement] = useState([]);

    const [editDepartment, setEditDepartment] = useState(null);
    const [editSeatingToggle,setEditSeatingToggle]= useState(false);

    const [editDepartmentName, setEditDepartmentName] = useState(''); 
    const [editCount, setEditCount] = useState('');
    const [editStartingRollNo, setEditStartingRollNo] = useState('');

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
        if (department === '' || count === '' || count <= 0 || startingRollNo === '' || startingRollNo === undefined) {
            window.alert("All fields must be filled.");
            return;
        }

        const newDepartmentDetails = new Map(departmentDetails);
        newDepartmentDetails.set(department.trim().toUpperCase(), Number(count));
        setDepartmentDetails(newDepartmentDetails);

        const newRollNumberMap = new Map(rollNumberMap);
        newRollNumberMap.set(department.trim().toUpperCase(),Number(startingRollNo));
        setRollNumberMap(newRollNumberMap);

        setDepartment('');
        setCount('');
        setStartingRollNo('');
        departmentInputRef.current.focus();
    };

    const handleEditClick = (e, dept, currentCount) => {
        e.preventDefault();
        setEditDepartment(dept);
        setEditDepartmentName(dept); 
        setEditCount(currentCount);
        setEditStartingRollNo(rollNumberMap.get(dept));
    };

    const handleSaveClick = (e, dept) => {
        e.preventDefault();

        const newDepartmentDetails = new Map(departmentDetails);
        newDepartmentDetails.delete(dept); 
        newDepartmentDetails.set(editDepartmentName, editCount); 
        setDepartmentDetails(newDepartmentDetails);
        rollNumberMap.set(editDepartmentName,editStartingRollNo);

        setEditDepartment(null);
        setEditDepartmentName('');
        setEditCount('');
    };

    const handleCancelClick = () => {
        setEditDepartment(null);
        setEditDepartmentName('');
        setEditCount('');
        setStartingRollNo('');
    };

    const handleDeleteClick = (e, dept) => {
        e.preventDefault();

        const newDepartmentDetails = new Map(departmentDetails);
        newDepartmentDetails.delete(dept);
        setDepartmentDetails(newDepartmentDetails);
        rollNumberMap.delete(dept);
    };
    
    const generateSeatingArrangement = (e) => {
        console.log(rollNumberMap)
        e.preventDefault();

        let totalStudents = Array.from(departmentDetails.values()).reduce((a, b) => a + Number(b), 0);

        let allClassrooms = [];
        let currentClassroom = Array.from({ length: row }, () => Array(column).fill(''));
        let i = 0;

        let deptA = departmentDetails.keys().next().value;
        let countA = departmentDetails.get(deptA);
        departmentDetails.delete(deptA);

        let deptB = departmentDetails.keys().next().value;
        let countB = departmentDetails.get(deptB);
        
        departmentDetails.delete(deptB);

        while (i < totalStudents) {
            for (let r = 0; r < row; r++) { 
                for (let c = 0; c < column; c++) {
                    
                    if (((countB === undefined || countB === 0 || deptB === null) && countA > 0) || (r % 2 === 0 && countA > 0)) {
                        let roll=rollNumberMap.get(deptA)
                        rollNumberMap.set(deptA,Number(rollNumberMap.get(deptA))+1);
                        currentClassroom[r][c] = `${deptA} : ${roll}`;
                        countA--;
                        if (countA === 0 && departmentDetails.size > 0) {
                            deptA = departmentDetails.keys().next().value;
                            countA = departmentDetails.get(deptA);
                            departmentDetails.delete(deptA);
                        }
                    } else if (countB > 0) {
                        let roll = rollNumberMap.get(deptB)
                        rollNumberMap.set(deptA, Number(rollNumberMap.get(deptB))+ 1);
                        currentClassroom[r][c] = `${deptB} : ${roll}`;
                        countB--;
                        if (countB === 0 && departmentDetails.size > 0) {
                            deptB = departmentDetails.keys().next().value;
                            countB = departmentDetails.get(deptB);
                            departmentDetails.delete(deptB);
                        }
                    }
                    else{
                        currentClassroom[r][c] = '-';
                    }
                    i++;
                    
                }
            }
            allClassrooms.push(currentClassroom);
            currentClassroom = Array.from({ length: row }, () => Array(column).fill(''));
            
            let tempdept=deptA
            let tempCount=countA
            deptA=deptB
            countA=countB
            deptB=tempdept
            countB=tempCount
        }
        
        setSeatingArrangement(allClassrooms);
        setEditableSeatingArrangement(JSON.parse(JSON.stringify(allClassrooms)));
        
    };

    const printDiv = (divId) => {
        const contentToPrint = document.getElementById(divId).innerHTML;
        const originalContent = document.body.innerHTML;
        document.body.innerHTML = contentToPrint;
        window.print();
        document.body.innerHTML = originalContent;
    };

    const handleSeatEdit = (newValue, classIndex, rowIndex, seatIndex) => {
        console.log("E : " + JSON.stringify(editableSeatingArrangement));

        // Create a copy of the current seating arrangement
        const updatedArrangement = [...editableSeatingArrangement];

        // Create a copy of the classroom (classIndex) array
        updatedArrangement[classIndex] = [...updatedArrangement[classIndex]];

        // Create a copy of the row (rowIndex) array
        updatedArrangement[classIndex][rowIndex] = [...updatedArrangement[classIndex][rowIndex]];

        // Update the seat at the specific index
        updatedArrangement[classIndex][rowIndex][seatIndex] = newValue;

        // Set the updated arrangement to state
        setEditableSeatingArrangement(updatedArrangement);
    };



    const saveSeatingArrangement = (e) => {
        e.preventDefault()
        setSeatingArrangement(editableSeatingArrangement);
        setEditSeatingToggle(!editSeatingToggle)
        window.alert("Seating arrangement updated!");
    };

    const cancelEditing = () => {
        setEditSeatingToggle(!editSeatingToggle)
        setEditableSeatingArrangement(JSON.parse(JSON.stringify(seatingArrangement)));
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

                    <br />
                    <div className={styles['examHall-getDepartment']}>
                        <div className={styles['input-group']}>
                            <label>Department </label>
                            <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} ref={departmentInputRef} />
                        </div>
                        <div className={styles['input-group']}>
                            <label>Count </label>
                            <input type="number" value={count} onChange={(e) => setCount(e.target.value)} />
                        </div>
                        <div className={styles['input-group']}>
                            <label>Starting RollNo </label>
                            <input type="number" value={startingRollNo} onChange={(e) => setStartingRollNo(e.target.value)} />
                        </div>
                    </div>
                    <br />
                    <center><button className={styles['examHall-addDepartmentBtn']} onClick={handleAddDepartment}>Add Department</button></center>

                    {departmentDetails.size > 0 ? (
                        <div className={styles['examHall-displayDepartment']}>
                            <table style={{ border: '2px solid black', borderCollapse: 'collapse', width: '100%' }} >
                                <thead>
                                    <tr>
                                        <th style={{ border: '1.5px solid black', padding: '10px' }}>Department</th>
                                        <th style={{ border: '1.5px solid black', padding: '10px' }}>Count</th>
                                        <th style={{ border: '1.5px solid black', padding: '10px' }}>Starting RollNo</th>
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
                                                    <input type="number" value={editStartingRollNo} onChange={(e) => setEditStartingRollNo(e.target.value)} />
                                                ) : (
                                                    rollNumberMap.get(dept)
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
                    
                    <center><input type="submit" onClick={(e) => { generateSeatingArrangement(e) }} value="Generate" className={styles['examHall-generateBtn']} /></center>
                </form>
            </div>
            <br /><br />
            <div className={styles['examHall-seating-plan-container']}>
                <div className={styles['examHall-printable-content']}>
                    {editableSeatingArrangement && editableSeatingArrangement.length > 0 && (
                        <div>
                            <button id="examHall-printButton" className={styles['examHall-print-button']} onClick={() => printDiv('examHall-printableDiv')}>Print</button>
                            <button id="examHall-printButton" className={styles['examHall-edit-button']} onClick={(e)=>{setEditSeatingToggle(true);window.alert("Editing is enabled.")}}>Edit</button>
                            <div id="examHall-printableDiv">
                                <center><h3 className={styles['examHall-seating-title']}>Seating Plan</h3></center>
                                {editableSeatingArrangement.map((classroom, classIndex) => (
                                    <div key={classIndex} className={styles['examHall-classroom-section']}>
                                        <h3>Classroom {classIndex + 1}:</h3>
                                        <div className={styles['examHall-classroom-grid']} style={{ gridTemplateRows: `repeat(${classroom.length}, 1fr)` }}>
                                            {classroom.map((row, rowIndex) => (
                                                <div key={rowIndex} className={styles['examHall-row-grid']} style={{ gridTemplateColumns: `repeat(${row.length}, 1fr)` }}>
                                                    {row.map((seat, seatIndex) => (
                                                        <div key={seatIndex} className={`${styles['examHall-seat']} ${seat === '' ? 'empty' : 'occupied'}`}>
                                                            {editSeatingToggle ? (
                                                                <input
                                                                    type="text"
                                                                    value={editableSeatingArrangement[classIndex][rowIndex][seatIndex] || ''}
                                                                    onChange={(e) => handleSeatEdit(e.target.value, classIndex, rowIndex, seatIndex)}
                                                                    className={styles['examHall-seat-input']}
                                                                    autoFocus/>
                                                            ) : (
                                                                seat || '-'
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {editSeatingToggle ? (<div className={styles['examHall-actions']}>
                                <button className={styles['examHall-save-button']} onClick={(e) => saveSeatingArrangement(e)}>Save</button>
                                <button className={styles['examHall-cancel-button']} onClick={(e) => cancelEditing(e)}>Cancel</button>
                            </div>):null}
                        </div>
                    )}
                </div>
            </div>

        </div>
        
    );
};

export default ExamHallPlanner;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "./UploadMaterial.css";

// Utility function to append "Add New" option
const appendAddNewOption = (options, label, value) => [
    ...options,
    { label: `Add New ${label}`, value: `add-new-${value}` },
];

const UploadMaterial = ({ onButtonClick }) => {
    const [formData, setFormData] = useState({
        department: null,
        subject: null,
        topic: null,
        name: "",
    });

    const [departments, setDepartments] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [topics, setTopics] = useState([]);
    const [newDept, setNewDept] = useState("");
    const [newSubject, setNewSubject] = useState("");
    const [newTopic, setNewTopic] = useState("");
    const [isAddingDept, setIsAddingDept] = useState(false);
    const [isAddingSubject, setIsAddingSubject] = useState(false);
    const [isAddingTopic, setIsAddingTopic] = useState(false);
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState(null);
    const [cancel, setCancel] = useState(null)

    // Fetch departments on component load
    useEffect(() => {
        const fetchDepartments = async () => {
            fetchDepartmentsHelper()
        };
        fetchDepartments();
    }, []);

    const fetchDepartmentsHelper = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/studyMaterial/departments");
            const deptOptions = response.data.map((dept) => ({ label: dept, value: dept }));
            setDepartments(appendAddNewOption(deptOptions, "Department", "department"));
        } catch (err) {
            console.error(err);
        }
    };

    const handleDepartmentChange = async (selectedDept) => {
        if (!selectedDept) {
            setFormData({ ...formData, department: null, subject: null, topic: null });
            setSubjects([]); // Clear subjects
            setTopics([]); // Clear topics
            setIsAddingDept(false);
            setIsAddingSubject(false);
            setIsAddingTopic(false);
            return;
        }
        if (selectedDept.value === "add-new-department") {
            setFormData({ ...formData, department: selectedDept, subject: null, topic: null });
            setIsAddingDept(true);
        } else {
            setFormData({ ...formData, department: selectedDept, subject: null, topic: null });
            setIsAddingDept(false);
            setIsAddingSubject(false);
            setIsAddingTopic(false);

            try {
                const response = await axios.get(
                    `http://localhost:5000/api/studyMaterial/subjects?department=${selectedDept.value}`
                );
                const subjectOptions = response.data.map((subject) => ({ label: subject, value: subject }));
                setSubjects(appendAddNewOption(subjectOptions, "Subject", "subject"));
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleSubjectChange = async (selectedSubject) => {
        if (!selectedSubject) {
            setFormData({ ...formData, subject: null, topic: null });
            setTopics([]); // Clear topics
            setIsAddingSubject(false);
            setIsAddingTopic(false);
            return;
        }
        if (selectedSubject.value === "add-new-subject") {
            setFormData({ ...formData, subject: selectedSubject, topic: null });
            setIsAddingSubject(true);
        } else {
            setFormData({ ...formData, subject: selectedSubject, topic: null });
            setIsAddingSubject(false);

            try {
                const response = await axios.get(
                    `http://localhost:5000/api/studyMaterial/topics?department=${formData.department.value}&subject=${selectedSubject.value}`
                );
                const topicOptions = response.data.map((topic) => ({ label: topic, value: topic }));
                setTopics(appendAddNewOption(topicOptions, "Topic", "topic"));
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleTopicChange = (selectedTopic) => {
        if (!selectedTopic) {
            setFormData({ ...formData, topic: null });
            setIsAddingTopic(false);
            return;
        }
        if (selectedTopic.value === "add-new-topic") {
            setIsAddingTopic(true);
            setFormData({ ...formData, topic: selectedTopic });
        } else {
            setFormData({ ...formData, topic: selectedTopic });
            setIsAddingTopic(false);
        }
    };

    const handleAddNewDept = () => {
        if(newDept===null || newDept.length <=2)
        {
            window.alert("Enter proper department name with atleast 2 characters");
            return;
        }
        const newDeptOption = { label: newDept, value: newDept };
        const updatedDepartments = appendAddNewOption(
            departments.filter((dept) => dept.value !== "add-new-department"),
            "Department",
            "department"
        );
        setDepartments(updatedDepartments);
        setFormData({
            department: newDeptOption,
            subject: null, 
            topic: null,  
        });

        setNewDept("");           
        setIsAddingDept(false);   
        setIsAddingSubject(true); 
    };


    const handleAddNewSubject = () => {
        if (newSubject === null || newSubject.length <= 2) {
            window.alert("Enter proper subject name with atleast 2 characters");
            return;
        }
        const newSubjectOption = { label: newSubject, value: newSubject }; 
        const updatedSubjects = appendAddNewOption(
            subjects.filter((subject) => subject.value !== "add-new-subject"),
            "Subject",
            "subject"
        );
        updatedSubjects.push(newSubjectOption);
        setSubjects(updatedSubjects);
        const updatedFormData = { ...formData, subject: newSubjectOption };
        setFormData(updatedFormData);

        setNewSubject("");
        setIsAddingSubject(false);
        setIsAddingTopic(true);
    };


    const handleAddNewTopic = () => {
        if (newTopic === null || newTopic.length < 2) {
            window.alert("Enter proper topic name with atleast 2 characters");
            return;
        }
        const newTopicOption = { label: newTopic, value: newTopic };
        setTopics(appendAddNewOption(topics.filter((topic) => topic.value !== "add-new-topic"), "Topic", "topic"));
        setFormData({ ...formData, topic: newTopicOption });
        setNewTopic("");
        setIsAddingTopic(false);
    };

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !formData.department || !formData.subject || !formData.topic || !formData.name) {
            setMessage("Please fill in all fields and select a file.");
            return;
        }

        const formDataObj = new FormData();
        formDataObj.append("department", formData.department.value);
        formDataObj.append("subject", formData.subject.value);
        formDataObj.append("topic", formData.topic.value);
        formDataObj.append("fileName", formData.name);
        formDataObj.append("file", file);

        try {
            const fileUploadResponse = await axios.post("http://localhost:5000/api/upload/upload", formDataObj, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("resp : ",fileUploadResponse)
            onButtonClick(true)
            window.alert(fileUploadResponse.data.message)
            fetchDepartmentsHelper()
        } catch (error) {
            console.error(error);
            setMessage(fileUploadResponse.message);
        }
    };

    return (
        <div className="sm-upload-material-form">
            <h2>Upload Study Material</h2>
            <form onSubmit={handleSubmit}>
                <div className="sm-field">
                    <label>Department</label>
                    <Select
                        value={formData.department}
                        onChange={handleDepartmentChange}
                        options={departments}
                        placeholder="Select Department"
                        isClearable
                        isSearchable
                    />
                </div>
                {isAddingDept && (
                    <div className="sm-add-new">
                        <input
                            type="text"
                            value={newDept}
                            onChange={(e) => setNewDept(e.target.value)}
                            placeholder="New Department Name"
                        />
                        <button type="button" onClick={handleAddNewDept}>
                            Add Department
                        </button>
                    </div>
                )}
                {!isAddingDept && formData.department && (
                    <div className="sm-field">
                        <label>Subject</label>
                        <Select
                            value={formData.subject}
                            onChange={handleSubjectChange}
                            options={subjects}
                            placeholder="Select Subject"
                            isClearable
                            isSearchable
                        />
                    </div>
                )}
                {isAddingSubject && (
                    <div className="sm-add-new">
                        <input
                            type="text"
                            value={newSubject}
                            onChange={(e) => setNewSubject(e.target.value)}
                            placeholder="New Subject Name"
                        />
                        <button type="button" onClick={handleAddNewSubject}>
                            Add Subject
                        </button>
                    </div>
                )}
                {formData.subject && (
                    <div className="sm-field">
                        <label>Topic</label>
                        <Select
                            value={formData.topic}
                            onChange={handleTopicChange}
                            options={topics}
                            placeholder="Select Topic"
                            isClearable
                            isSearchable
                        />
                    </div>
                )}
                {isAddingTopic && (
                    <div className="sm-add-new">
                        <input
                            type="text"
                            value={newTopic}
                            onChange={(e) => setNewTopic(e.target.value)}
                            placeholder="New Topic Name"
                        />
                        <button type="button" onClick={handleAddNewTopic}>
                            Add Topic
                        </button>
                    </div>
                )}
                <div className="sm-field">
                    <label>Material Name</label>
                    <input
                        type="text"
                        placeholder="Material Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>
                <div className="sm-field">
                    <label>File</label>
                    <input type="file" onChange={handleFileChange} required />
                </div>
                <div className="sm-btnGroup">
                    <button type="submit">Upload Material</button>
                    <button type="button" onClick={()=>onButtonClick(true)}>Cancel</button>
                </div>
            </form>
            {message && <div className="sm-message">{message}</div>}
        </div>
    );
};

export default UploadMaterial;

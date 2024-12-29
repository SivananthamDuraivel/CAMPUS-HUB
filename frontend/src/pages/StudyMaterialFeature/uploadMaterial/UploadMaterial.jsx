import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "./UploadMaterial.css";

const UploadMaterial = () => {
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

    // Fetch departments on component load
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/studyMaterial/departments");
                const deptOptions = response.data.map((dept) => ({ label: dept, value: dept }));
                setDepartments([...deptOptions, { label: "Add New Department", value: "add-new-department" }]);
            } catch (err) {
                console.error(err);
            }
        };
        fetchDepartments();
    }, []);

    const handleDepartmentChange = async (selectedDept) => {
        if (selectedDept.value === "add-new-department") {
            setIsAddingDept(true);
        } else {
            setFormData({ ...formData, department: selectedDept, subject: null, topic: null });
            setIsAddingDept(false);
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/studyMaterial/subjects?department=${selectedDept.value}`
                );
                const subjectOptions = response.data.map((subject) => ({ label: subject, value: subject }));
                setSubjects([...subjectOptions, { label: "Add New Subject", value: "add-new-subject" }]);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleSubjectChange = async (selectedSubject) => {
        if (selectedSubject.value === "add-new-subject") {
            setIsAddingSubject(true);
        } else {
            setFormData({ ...formData, subject: selectedSubject, topic: null });
            setIsAddingSubject(false);

            try {
                const response = await axios.get(
                    `http://localhost:5000/api/studyMaterial/topics?department=${formData.department.value}&subject=${selectedSubject.value}`
                );

                console.log("Topics Response:", response.data); 

                if (response.data && Array.isArray(response.data)) {
                    const topicOptions = response.data.map((topic) => ({ label: topic, value: topic }));
                    setTopics([...topicOptions, { label: "Add New Topic", value: "add-new-topic" }]);
                } else {
                    setTopics([{ label: "Add New Topic", value: "add-new-topic" }]); // Fallback for no topics
                }
            } catch (err) {
                console.error("Error fetching topics:", err);
                setTopics([{ label: "Add New Topic", value: "add-new-topic" }]);
            }
        }
    };


    const handleTopicChange = (selectedTopic) => {
        if (selectedTopic.value === "add-new-topic") {
            setIsAddingTopic(true);
        } else {
            setFormData({ ...formData, topic: selectedTopic });
            setIsAddingTopic(false);
        }
    };

    const handleAddNewDept = () => {
        const newDeptOption = { label: newDept, value: newDept };
        setDepartments([...departments.filter((dept) => dept.value !== "add-new-department"), newDeptOption]);
        setFormData({ ...formData, department: newDeptOption });
        setNewDept("");
        setIsAddingDept(false);
    };

    const handleAddNewSubject = () => {
        const newSubjectOption = { label: newSubject, value: newSubject };
        setSubjects([...subjects.filter((subject) => subject.value !== "add-new-subject"), newSubjectOption]);
        setFormData({ ...formData, subject: newSubjectOption });
        setNewSubject("");
        setIsAddingSubject(false);
    };

    const handleAddNewTopic = () => {
        const newTopicOption = { label: newTopic, value: newTopic };
        setTopics([...topics.filter((topic) => topic.value !== "add-new-topic"), newTopicOption]);
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

        // Create FormData object
        const formDataObj = new FormData();
        formDataObj.append("department", formData.department.value);
        formDataObj.append("subject", formData.subject.value);
        formDataObj.append("topic", formData.topic.value);
        formDataObj.append("fileName", formData.name);
        formDataObj.append("file", file);

        try {
            const response = await axios.post("http://localhost:5000/api/upload/upload", formDataObj, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setMessage(`File uploaded successfully`);
        } catch (error) {
            console.error(error);
            setMessage("File upload failed.");
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
                        <input type="text" value={newDept} onChange={(e) => setNewDept(e.target.value)} placeholder="New Department Name" />
                        <button type="button" onClick={handleAddNewDept}>Add Department</button>
                    </div>
                )}
                {formData.department && (
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
                        <input type="text" value={newSubject} onChange={(e) => setNewSubject(e.target.value)} placeholder="New Subject Name" />
                        <button type="button" onClick={handleAddNewSubject}>Add Subject</button>
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
                        <input type="text" value={newTopic} onChange={(e) => setNewTopic(e.target.value)} placeholder="New Topic Name" />
                        <button type="button" onClick={handleAddNewTopic}>Add Topic</button>
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
                <button type="submit">Upload Material</button>
            </form>
            {message && <div className="sm-message">{message}</div>}
        </div>
    );
};

export default UploadMaterial;

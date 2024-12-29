import React, { useState, useEffect } from "react";
import "./StudyMaterial.css";
import axios from "axios";
import UploadMaterial from "../uploadMaterial/UploadMaterial";

const StudyMaterial = () => {
    const [upload, setUpload] = useState(false);
    const [loading, setLoading] = useState({
        departments: false,
        subjects: false,
        materials: false,
    });
    const [data, setData] = useState({
        departments: [],
        subjects: [],
        materials: [],
    });
    const [selected, setSelected] = useState({
        department: null,
        subject: null,
    });
    const [error, setError] = useState(null);

    // Fetch data helper function
    const fetchData = async (url, setLoadingKey, dataSetter) => {
        setLoading((prev) => ({ ...prev, [setLoadingKey]: true }));
        setError(null);
        try {
            const response = await axios.get(url);
            dataSetter(response.data);
        } catch (err) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading((prev) => ({ ...prev, [setLoadingKey]: false }));
        }
    };

    // Fetch departments on component load
    useEffect(() => {
        fetchData(
            "http://localhost:5000/api/studyMaterial/departments",
            "departments",
            (data) => setData((prev) => ({ ...prev, departments: data }))
        );
    }, []);

    // Handle department selection
    const handleDepartmentClick = (department) => {
        setSelected({ department, subject: null });
        setData((prev) => ({ ...prev, subjects: [], materials: [] }));
        fetchData(
            `http://localhost:5000/api/studyMaterial/subjects?department=${department}`,
            "subjects",
            (data) => setData((prev) => ({ ...prev, subjects: data }))
        );
    };

    // Handle subject selection
    const handleSubjectClick = (subject) => {
        setSelected((prev) => ({ ...prev, subject }));
        setData((prev) => ({ ...prev, materials: [] }));
        fetchData(
            `http://localhost:5000/api/studyMaterial/study-materials?department=${selected.department}&subject=${subject}`,
            "materials",
            (data) => {console.log("d : ",data);setData((prev) => ({ ...prev, materials: data }))}
        );
        console.log("data : ", data)

    };

    // Refresh materials list after successful upload
    const handleUploadSuccess = () => {
        if (selected.department && selected.subject) {
            fetchData(
                `http://localhost:5000/api/studyMaterial/study-materials?department=${selected.department}&subject=${selected.subject}`,
                "materials",
                (data) => setData((prev) => ({ ...prev, materials: data }))
            );
        }
    };

    return (
        <div className="sm-study-material">
            <h1>Study Materials</h1>
            <div className="sm-uploadButton">
                <button onClick={() => setUpload(!upload)}>Upload Material</button>
                {upload && (
                    // <UploadMaterial
                    //     department={selected.department}
                    //     subject={selected.subject}
                    //     onSuccess={handleUploadSuccess}
                    // />
                    <UploadMaterial></UploadMaterial>
                )}
            </div>
            {error && <p className="sm-error">{error}</p>}

            {/* Departments */}
            <div className="sm-list-container">
                <h3>Departments:</h3>
                {loading.departments ? (
                    <div className="sm-spinner"></div>
                ) : (
                    <div className="sm-scroll-list">
                        {data.departments.map((dept) => (
                            <div
                                key={dept}
                                className={`sm-list-item ${selected.department === dept ? "active" : ""}`}
                                onClick={() => handleDepartmentClick(dept)}
                            >
                                {dept}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Subjects */}
            {selected.department && (
                <div className="sm-list-container">
                    <h3>Subjects:</h3>
                    {loading.subjects ? (
                        <div className="sm-spinner"></div>
                    ) : (
                        <div className="sm-scroll-list">
                            {data.subjects.map((subject) => (
                                <div
                                    key={subject}
                                    className={`sm-list-item ${selected.subject === subject ? "active" : ""}`}
                                    onClick={() => handleSubjectClick(subject)}
                                >
                                    {subject}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Study Materials */}
            {selected.subject && (
                <div className="sm-notes-container">
                    <h3>Study Materials:</h3>
                    {loading.materials ? (
                        <div className="sm-spinner"></div>
                    ) : (
                        <div className="sm-materials-list">
                            {/* Loop through topics */}
                            {data.materials.map((topic, topicIndex) => (
                                <div key={topicIndex} className="sm-topic">
                                    {/* Display topic name as a dropdown */}
                                    <details>
                                        <summary className="sm-topic-title">
                                            {topic.topicName || `Topic ${topicIndex + 1}`}
                                        </summary>
                                        <ul className="sm-file-list">
                                            {/* Loop through files under each topic */}
                                            {topic.files.map((file, fileIndex) => (
                                                <li key={fileIndex}>
                                                    <a
                                                        href={file.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="sm-file-link"
                                                    >
                                                        {file.name || `File ${fileIndex + 1}`}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </details>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

        </div>
    );
};

export default StudyMaterial;

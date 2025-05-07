import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Pencil, Trash2, X } from "lucide-react";

const StudentsInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Sample student data, you can fetch it from your API instead.
    const [student, setStudent] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        const storedStudent = JSON.parse(localStorage.getItem("selectedStudent"));
    
        if (storedStudent && storedStudent.id === parseInt(id)) {
            setStudent(storedStudent);
        } else {
            // Optional: redirect or handle not found
            alert("Student not found");
            navigate("/students");
        }
    }, [id, navigate]);

   const handleDelete = () => {
    alert(`Student ${student.name} deleted.`);
    localStorage.removeItem("selectedStudent");
    navigate("/students");
};

    const handleSave = () => {
        // Logic to save the edited student data
        alert(`Student ${student.name} saved.`);
        setIsEditMode(false);
    };

    if (!student) return <p>Loading...</p>;

    return (
        <div className="student-info p-6">
            <h1 className="text-2xl font-bold mb-4">Student Information</h1>
            {isEditMode ? (
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={student.name}
                        onChange={(e) => setStudent({ ...student, name: e.target.value })}
                        className="border px-3 py-2 rounded-md mb-4"
                    />
                    <label>Email:</label>
                    <input
                        type="email"
                        value={student.email}
                        onChange={(e) => setStudent({ ...student, email: e.target.value })}
                        className="border px-3 py-2 rounded-md mb-4"
                    />
                    <label>Phone:</label>
                    <input
                        type="text"
                        value={student.phone}
                        onChange={(e) => setStudent({ ...student, phone: e.target.value })}
                        className="border px-3 py-2 rounded-md mb-4"
                    />
                    <label>Address:</label>
                    <input
                        type="text"
                        value={student.address}
                        onChange={(e) => setStudent({ ...student, address: e.target.value })}
                        className="border px-3 py-2 rounded-md mb-4"
                    />
                    <div className="flex space-x-2">
                        <button
                            onClick={handleSave}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setIsEditMode(false)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <p><strong>Name:</strong> {student.name}</p>
                    <p><strong>Email:</strong> {student.email}</p>
                    <p><strong>Phone:</strong> {student.phone}</p>
                    <p><strong>Address:</strong> {student.address}</p>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setIsEditMode(true)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
                        >
                            <Pencil size={16} />
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                        >
                            <Trash2 size={16} />
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentsInfo;

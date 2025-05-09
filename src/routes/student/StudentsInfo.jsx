import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Pencil, Trash2, ArrowLeft, Printer } from "lucide-react";
import EditStudent from "./EditStudent"; // Adjust path as needed

const StudentsInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        const storedStudent = JSON.parse(localStorage.getItem("selectedStudent"));

        if (storedStudent && storedStudent.id === parseInt(id)) {
            setStudent(storedStudent);
        } else {
            alert("Student not found");
            navigate("/students");
        }
    }, [id, navigate]);

    const handleDelete = () => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${student.name}?`);
        if (confirmDelete) {
            alert(`Student ${student.name} deleted.`);
            localStorage.removeItem("selectedStudent");
            navigate("/students");
        }
    };

    const handlePrint = () => {
        alert(`Printing student info for ${student.name}...`);
    };

    if (!student) return <p>Loading...</p>;

    return (
        <div className="p-6 w-full max-w-4xl">
            {/* Top bar */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col space-y-2">
                    <button
                        onClick={() => navigate("/students")}
                        className="flex items-center text-blue-600 hover:underline"
                    >
                        <ArrowLeft size={18} className="mr-1" />
                        Back to Students
                    </button>

                    <div className="flex space-x-2">
                        <button
                            onClick={() => setIsEditMode(true)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md flex items-center space-x-1"
                        >
                            <Pencil size={16} />
                            <span>Edit</span>
                        </button>
                        <button
                            onClick={handlePrint}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center space-x-1"
                        >
                            <Printer size={16} />
                            <span>Print</span>
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center space-x-1"
                        >
                            <Trash2 size={16} />
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            </div>

            <h1 className="text-2xl font-bold mb-6">Student Information</h1>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                    {["name", "email", "phone", "address"].map((field) => (
                        <div key={field}>
                            <label className="block font-semibold capitalize mb-1">{field}:</label>
                            <p className="bg-gray-100 px-3 py-2 rounded-md">{student[field]}</p>
                        </div>
                    ))}
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                    {["course", "yearLevel", "guardianName", "relationship"].map((field) => (
                        <div key={field}>
                            <label className="block font-semibold capitalize mb-1">
                                {field.replace(/([A-Z])/g, " $1")}:
                            </label>
                            <p className="bg-gray-100 px-3 py-2 rounded-md">
                                {student[field] || "N/A"}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Edit Modal */}
            {isEditMode && (
                <EditStudent
                    student={student}
                    setStudent={setStudent}
                    onClose={() => setIsEditMode(false)}
                />
            )}
        </div>
    );
};

export default StudentsInfo;

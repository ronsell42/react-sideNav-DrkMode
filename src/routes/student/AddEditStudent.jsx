import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AddEditStudent = () => {
    const location = useLocation();
    const { action, studentId } = location.state || {};
    const [student, setStudent] = useState({});

    useEffect(() => {
        if (action === 'Edit' && studentId) {
            // Fetch student data if editing
            const storedStudent = JSON.parse(localStorage.getItem("students")).find(s => s.id === studentId);
            setStudent(storedStudent);
        }
    }, [action, studentId]);

    return (
        <div className="p-6 w-full max-w-4xl">
            <h1 className="text-2xl font-bold mb-6">
                {action === 'Add' ? 'Add Student' : 'Edit Student'}
            </h1>
            
            {/* The rest of the form for adding/editing student */}
            <form>
                <div className="space-y-4">
                    <div>
                        <label className="block font-semibold capitalize mb-1">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={student.name || ""}
                            onChange={(e) => setStudent({ ...student, name: e.target.value })}
                            className="border px-3 py-2 rounded-md w-full"
                        />
                    </div>
                    {/* Other fields like email, phone, etc. */}
                </div>

                <div className="flex gap-2 mt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                        {action === 'Add' ? 'Add Student' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEditStudent;

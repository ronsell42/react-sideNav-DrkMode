import { useState } from "react";
import { Plus, Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import AddStudent from "./AddStudent";

const Students = () => {
    const [search, setSearch] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 20;


    const [students, setStudents] = useState([
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" },
        { id: 3, name: "Mark Johnson", email: "mark@example.com" },
        { id: 4, name: "Emily Davis", email: "test@email" },
        { id: 5, name: "Anna Lee", email: "anna@email.com" },
        { id: 6, name: "Paul White", email: "paul@email.com" },
        { id: 7, name: "Tom Cruise", email: "tom@email.com" },
        { id: 8, name: "Lara Croft", email: "lara@email.com" },
        { id: 9, name: "Bruce Wayne", email: "batman@email.com" },
        { id: 10, name: "Clark Kent", email: "superman@email.com" },
    ]);

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredStudents.length / recordsPerPage);
    const startIndex = (currentPage - 1) * recordsPerPage;
    const currentStudents = filteredStudents.slice(startIndex, startIndex + recordsPerPage);

    const changePage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        setSelectedStudent(null);
    };

    const handleDelete = (studentId) => {
        setStudents(prev => prev.filter(s => s.id !== studentId));
        if (selectedStudent?.id === studentId) {
            setSelectedStudent(null);
        }
    };

    const handleRowClick = (student) => {
        // If already selected, unselect it, else select it
        if (selectedStudent?.id === student.id) {
            setSelectedStudent(null);
        } else {
            setSelectedStudent(student);
        }
    };

    return (
        <div className="students-page p-0">
            <h1 className="text-2xl font-bold mb-4">Students</h1>
            <div className="flex items-center justify-between mb-4 flex-row-reverse">
             <input
                type="text"
                placeholder="Search students..."
                value={search}
                onChange={e => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                }}
                className="border px-3 py-2 rounded-md w-1/3 shadow-sm focus:outline-none focus:ring focus:border-blue-300 ml-auto"
            />

                <div className="space-x-2 flex">
                <button
                onClick={() => setShowAddModal(true)}
                className="btn-ghost text-white bg-green-600 border border-green-600 hover:bg-green-700 hover:text-white"
                >
                <Plus size={18} /> Add
                </button>

                    <Link
                        to={
                            selectedStudent
                                ? `/students/students-info/${selectedStudent.id}`
                                : "#"
                        }
                        onClick={() => {
                            if (selectedStudent) {
                                localStorage.setItem("selectedStudent", JSON.stringify(selectedStudent));
                            }
                        }}
                        className={`btn-ghost text-white bg-blue-600 border border-blue-600 hover:bg-blue-700 hover:text-white flex items-center gap-1 px-3 py-2 rounded-md ${
                            !selectedStudent ? "opacity-50 pointer-events-none" : ""
                        }`}
                    >
                        <Eye size={18} /> View
                    </Link>

                    <button
                        disabled={!selectedStudent}
                        onClick={() => {
                            if (selectedStudent) {
                                const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedStudent.name}?`);
                                if (confirmDelete) {
                                    handleDelete(selectedStudent.id);
                                }
                            }
                        }}
                        className={`btn-ghost text-white bg-red-600 border border-red-600 hover:bg-red-700 hover:text-white flex items-center gap-1 px-3 py-2 rounded-md ${
                            !selectedStudent ? "opacity-50 pointer-events-none" : ""
                        }`}
                    >
                        <Trash2 size={18} /> Delete
                    </button>
                </div>
            </div>

            {/* Pagination Top */}
            <div className="flex items-center justify-end space-x-2 mt-4">
                <button
                    onClick={() => changePage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded border bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                    Previous
                </button>

                {Array.from({ length: 5 }, (_, i) => {
                    let half = Math.floor(5 / 2);
                    let start = Math.max(1, currentPage - half);
                    let end = Math.min(totalPages, start + 4);

                    if (end - start < 4) {
                        start = Math.max(1, end - 4);
                    }

                    const pageNumber = start + i;
                    if (pageNumber > totalPages) return null;

                    return (
                        <button
                            key={pageNumber}
                            onClick={() => changePage(pageNumber)}
                            className={`px-3 py-1 rounded border ${currentPage === pageNumber ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                        >
                            {pageNumber}
                        </button>
                    );
                })}

                <button
                    onClick={() => changePage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded border bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            <div className="overflow-y-auto shadow border rounded-lg max-h-96">
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100 sticky top-0 z-10">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                    </tr>
                </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
    {currentStudents.map(student => (
        <tr
            key={student.id}
            onClick={() => handleRowClick(student)}
            className={`group cursor-pointer ${
                selectedStudent?.id === student.id 
                    ? "bg-blue-500 bg-opacity-25" : "hover:bg-gray-50"}`}
        >
            {/* Actions first */}
            <td className="px-6 py-4 whitespace-nowrap text-left">
                <div className="transition-opacity duration-200 flex space-x-2">
                    <Link
                        to={`/students/students-info/${student.id}`}
                        onClick={() =>
                            localStorage.setItem("selectedStudent", JSON.stringify(student))
                        }
                    >
                        <button className="bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-md">
                            <Eye size={16} />
                        </button>
                    </Link>
                    <button
                        className="bg-red-600 hover:bg-red-700 text-white p-1 rounded-md"
                        onClick={() => {
                            const confirmDelete = window.confirm(`Are you sure you want to delete ${student.name}?`);
                            if (confirmDelete) {
                                handleDelete(student.id);
                            }
                        }}
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </td>
            {/* Name */}
            <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
            {/* Email */}
            <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
        </tr>
    ))}
</tbody>

                </table>
            </div>
            {showAddModal && (
  <div
    className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
    onClick={() => setShowAddModal(false)}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative z-60"
    >
      <AddStudent onClose={() => setShowAddModal(false)} />
    </div>
  </div>
)}
        </div>

        
    );
};

export default Students;

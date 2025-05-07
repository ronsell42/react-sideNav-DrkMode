    import { useState } from "react";
    import { Plus, Eye, Trash2 } from "lucide-react";
    import { Link } from "react-router-dom";

    const Students = () => {
        const [search, setSearch] = useState("");
        const [selectedStudent, setSelectedStudent] = useState(null);
        const [currentPage, setCurrentPage] = useState(1);
        const recordsPerPage = 20;

        const [students] = useState([
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
            { id: 11, name: "John Doe", email: "john@example.com" },
            { id: 12, name: "Jane Smith", email: "jane@example.com" },
            { id: 13, name: "Mark Johnson", email: "mark@example.com" },
            { id: 14, name: "Emily Davis", email: "test@email" },
            { id: 15, name: "Anna Lee", email: "anna@email.com" },
            { id: 16, name: "Paul White", email: "paul@email.com" },
            { id: 17, name: "Tom Cruise", email: "tom@email.com" },
            { id: 18, name: "Lara Croft", email: "lara@email.com" },
            { id: 19, name: "Bruce Wayne", email: "batman@email.com" },
            { id: 20, name: "Clark Kent", email: "superman@email.com" },
            { id: 21, name: "John Doe", email: "john@example.com" },
            { id: 22, name: "Jane Smith", email: "jane@example.com" },
            { id: 23, name: "Mark Johnson", email: "mark@example.com" },
            { id: 24, name: "Emily Davis", email: "test@email" },
            { id: 25, name: "Anna Lee", email: "anna@email.com" },
            { id: 26, name: "Paul White", email: "paul@email.com" },
            { id: 27, name: "Tom Cruise", email: "tom@email.com" },
            { id: 28, name: "Lara Croft", email: "lara@email.com" },
            { id: 29, name: "Bruce Wayne", email: "batman@email.com" },
            { id: 30, name: "Clark Kent", email: "superman@email.com" },
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
            { id: 11, name: "John Doe", email: "john@example.com" },
            { id: 12, name: "Jane Smith", email: "jane@example.com" },
            { id: 13, name: "Mark Johnson", email: "mark@example.com" },
            { id: 14, name: "Emily Davis", email: "test@email" },
            { id: 15, name: "Anna Lee", email: "anna@email.com" },
            { id: 16, name: "Paul White", email: "paul@email.com" },
            { id: 17, name: "Tom Cruise", email: "tom@email.com" },
            { id: 18, name: "Lara Croft", email: "lara@email.com" },
            { id: 19, name: "Bruce Wayne", email: "batman@email.com" },
            { id: 20, name: "Clark Kent", email: "superman@email.com" },
            { id: 21, name: "John Doe", email: "john@example.com" },
            { id: 22, name: "Jane Smith", email: "jane@example.com" },
            { id: 23, name: "Mark Johnson", email: "mark@example.com" },
            { id: 24, name: "Emily Davis", email: "test@email" },
            { id: 25, name: "Anna Lee", email: "anna@email.com" },
            { id: 26, name: "Paul White", email: "paul@email.com" },
            { id: 27, name: "Tom Cruise", email: "tom@email.com" },
            { id: 28, name: "Lara Croft", email: "lara@email.com" },
            { id: 29, name: "Bruce Wayne", email: "batman@email.com" },
            { id: 30, name: "Clark Kent", email: "superman@email.com" },
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
            { id: 11, name: "John Doe", email: "john@example.com" },
            { id: 12, name: "Jane Smith", email: "jane@example.com" },
            { id: 13, name: "Mark Johnson", email: "mark@example.com" },
            { id: 14, name: "Emily Davis", email: "test@email" },
            { id: 15, name: "Anna Lee", email: "anna@email.com" },
            { id: 16, name: "Paul White", email: "paul@email.com" },
            { id: 17, name: "Tom Cruise", email: "tom@email.com" },
            { id: 18, name: "Lara Croft", email: "lara@email.com" },
            { id: 19, name: "Bruce Wayne", email: "batman@email.com" },
            { id: 20, name: "Clark Kent", email: "superman@email.com" },
            { id: 21, name: "John Doe", email: "john@example.com" },
            { id: 22, name: "Jane Smith", email: "jane@example.com" },
            { id: 23, name: "Mark Johnson", email: "mark@example.com" },
            { id: 24, name: "Emily Davis", email: "test@email" },
            { id: 25, name: "Anna Lee", email: "anna@email.com" },
            { id: 26, name: "Paul White", email: "paul@email.com" },
            { id: 27, name: "Tom Cruise", email: "tom@email.com" },
            { id: 28, name: "Lara Croft", email: "lara@email.com" },
            { id: 29, name: "Bruce Wayne", email: "batman@email.com" },
            { id: 30, name: "Clark Kent", email: "superman@email.com" },  { id: 1, name: "John Doe", email: "john@example.com" },
            { id: 2, name: "Jane Smith", email: "jane@example.com" },
            { id: 3, name: "Mark Johnson", email: "mark@example.com" },
            { id: 4, name: "Emily Davis", email: "test@email" },
            { id: 5, name: "Anna Lee", email: "anna@email.com" },
            { id: 6, name: "Paul White", email: "paul@email.com" },
            { id: 7, name: "Tom Cruise", email: "tom@email.com" },
            { id: 8, name: "Lara Croft", email: "lara@email.com" },
            { id: 9, name: "Bruce Wayne", email: "batman@email.com" },
            { id: 10, name: "Clark Kent", email: "superman@email.com" },
            { id: 11, name: "John Doe", email: "john@example.com" },
            { id: 12, name: "Jane Smith", email: "jane@example.com" },
            { id: 13, name: "Mark Johnson", email: "mark@example.com" },
            { id: 14, name: "Emily Davis", email: "test@email" },
            { id: 15, name: "Anna Lee", email: "anna@email.com" },
            { id: 16, name: "Paul White", email: "paul@email.com" },
            { id: 17, name: "Tom Cruise", email: "tom@email.com" },
            { id: 18, name: "Lara Croft", email: "lara@email.com" },
            { id: 19, name: "Bruce Wayne", email: "batman@email.com" },
            { id: 20, name: "Clark Kent", email: "superman@email.com" },
            { id: 21, name: "John Doe", email: "john@example.com" },
            { id: 22, name: "Jane Smith", email: "jane@example.com" },
            { id: 23, name: "Mark Johnson", email: "mark@example.com" },
            { id: 24, name: "Emily Davis", email: "test@email" },
            { id: 25, name: "Anna Lee", email: "anna@email.com" },
            { id: 26, name: "Paul White", email: "paul@email.com" },
            { id: 27, name: "Tom Cruise", email: "tom@email.com" },
            { id: 28, name: "Lara Croft", email: "lara@email.com" },
            { id: 29, name: "Bruce Wayne", email: "batman@email.com" },
            { id: 30, name: "Clark Kent", email: "superman@email.com" },  { id: 1, name: "John Doe", email: "john@example.com" },
            { id: 2, name: "Jane Smith", email: "jane@example.com" },
            { id: 3, name: "Mark Johnson", email: "mark@example.com" },
            { id: 4, name: "Emily Davis", email: "test@email" },
            { id: 5, name: "Anna Lee", email: "anna@email.com" },
            { id: 6, name: "Paul White", email: "paul@email.com" },
            { id: 7, name: "Tom Cruise", email: "tom@email.com" },
            { id: 8, name: "Lara Croft", email: "lara@email.com" },
            { id: 9, name: "Bruce Wayne", email: "batman@email.com" },
            { id: 10, name: "Clark Kent", email: "superman@email.com" },
            { id: 11, name: "John Doe", email: "john@example.com" },
            { id: 12, name: "Jane Smith", email: "jane@example.com" },
            { id: 13, name: "Mark Johnson", email: "mark@example.com" },
            { id: 14, name: "Emily Davis", email: "test@email" },
            { id: 15, name: "Anna Lee", email: "anna@email.com" },
            { id: 16, name: "Paul White", email: "paul@email.com" },
            { id: 17, name: "Tom Cruise", email: "tom@email.com" },
            { id: 18, name: "Lara Croft", email: "lara@email.com" },
            { id: 19, name: "Bruce Wayne", email: "batman@email.com" },
            { id: 20, name: "Clark Kent", email: "superman@email.com" },
            { id: 21, name: "John Doe", email: "john@example.com" },
            { id: 22, name: "Jane Smith", email: "jane@example.com" },
            { id: 23, name: "Mark Johnson", email: "mark@example.com" },
            { id: 24, name: "Emily Davis", email: "test@email" },
            { id: 25, name: "Anna Lee", email: "anna@email.com" },
            { id: 26, name: "Paul White", email: "paul@email.com" },
            { id: 27, name: "Tom Cruise", email: "tom@email.com" },
            { id: 28, name: "Lara Croft", email: "lara@email.com" },
            { id: 29, name: "Bruce Wayne", email: "batman@email.com" },
            { id: 30, name: "Clark Kent", email: "superman@email.com" },
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
            setSelectedStudent(null); // Reset selection
        };

        return (
            <div className="students-page p-6">
                <h1 className="text-2xl font-bold mb-4">Students</h1>
                <p className="mb-4">Welcome to the Students page!</p>

                <div className="flex items-center justify-between mb-4">
                    <input
                        type="text"
                        placeholder="Search students..."
                        value={search}
                        onChange={e => {
                            setSearch(e.target.value);
                            setCurrentPage(1); // reset to first page on search
                        }}
                        className="border px-3 py-2 rounded-md w-1/3 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />

                    <div className="space-x-2 flex">
                        <button className="btn-ghost text-white bg-blue-600 border border-blue-600 hover:bg-blue-700 hover:text-white">
                            <Plus size={18} /> Add
                        </button>

                        <button
                            className="btn-ghost text-white bg-red-600 border border-red-600 hover:bg-red-700 hover:text-white"
                            disabled={!selectedStudent}
                        >
                            <Trash2 size={18} /> Delete
                        </button>
                    </div>
                </div>

                {/* Pagination Top */}
                <div className="flex items-center justify-end space-x-2 mt-4">
        <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
            Previous
        </button>

        {Array.from({ length: 5 }, (_, i) => {
            let half = Math.floor(5 / 2);
            let start = Math.max(1, currentPage - half);
            let end = Math.min(totalPages, start + 4);

            // Adjust start again if we're near the end
            if (end - start < 4) {
                start = Math.max(1, end - 4);
            }

            const pageNumber = start + i;
            if (pageNumber > totalPages) return null;

            return (
                <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`px-3 py-1 rounded border ${currentPage === pageNumber ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                >
                    {pageNumber}
                </button>
            );
        })}

        <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentStudents.map(student => (
                                <tr
                                    key={student.id}
                                    onClick={() => setSelectedStudent(student)}
                                    className={`group cursor-pointer ${selectedStudent?.id === student.id ? "bg-blue-50" : "hover:bg-gray-50"}`}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex justify-end space-x-2">
                                            <Link
                                                to={`/students-info/${student.id}`}
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
                                                disabled={!selectedStudent}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    export default Students;

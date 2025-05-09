import { useState } from "react";
import AddEditStudent from "./AddEditStudent";

const AddStudent = ({ onClose }) => {
  const [student, setStudent] = useState({});

  const handleSave = (studentData) => {
    alert(`Student added: ${studentData.name}, ${studentData.email}`);
    // Save logic goes here
  };

  return (
    <AddEditStudent
      mode="add"
      student={student}
      setStudent={setStudent}
      onClose={onClose}
      onSave={handleSave}
    />
  );
};

export default AddStudent;

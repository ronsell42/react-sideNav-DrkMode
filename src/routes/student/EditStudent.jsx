import AddEditStudent from "./AddEditStudent";

const EditStudent = ({ student, setStudent, onClose }) => {
  const handleSave = (studentData) => {
    alert(`Student ${studentData.name} saved.`);
    // Save logic goes here
  };

  return (
    <AddEditStudent
      mode="edit"
      student={student}
      setStudent={setStudent}
      onClose={onClose}
      onSave={handleSave}
    />
  );
};

export default EditStudent;

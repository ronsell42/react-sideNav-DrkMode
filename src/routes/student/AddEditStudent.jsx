import { useEffect, useRef, useState } from "react";
import { X, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddEditStudent = ({
  mode = "add",
  student,
  setStudent,
  onClose,
  onSave,
}) => {
  const modalRef = useRef();
  const isEdit = mode === "edit";
  const [initialData, setInitialData] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [highlightOnce, setHighlightOnce] = useState(false);
  const navigate = useNavigate();

  // Track changes to show confirmation
  useEffect(() => {
    setInitialData({ ...student });
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const hasChanges = JSON.stringify(student) !== JSON.stringify(initialData);

  // Prevent page reload/tab close
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = ""; // Required for Chrome
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasChanges]);

  // Prevent navigation manually using window.history
  const handleNavigation = (event) => {
    if (hasChanges) {
      setShowConfirm(true);
      event.preventDefault(); // Prevent navigation
    }
  };

  useEffect(() => {
    window.addEventListener("popstate", handleNavigation); // Prevent back button
    return () => {
      window.removeEventListener("popstate", handleNavigation);
    };
  }, [hasChanges]);

  const handleSave = () => {
    onSave(student);
    onClose();
  };

  const handleXClick = () => {
    if (hasChanges) {
      setShowConfirm(true);
    } else {
      onClose();
    }
  };

  const handleCancelEditing = () => {
    setShowConfirm(false);
    onClose();
  };

  // Block navigation if unsaved changes exist
  const handleConfirmNavigation = (shouldLeave) => {
    if (shouldLeave) {
      onClose();
      navigate(-1); // Go back or handle any specific navigation action here
    } else {
      setShowConfirm(false);
    }
  };

  return (
    <div className="fixed inset-0 z-30 bg-black bg-opacity-30 flex items-center justify-center">
      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center space-y-4">
            <h3 className="text-lg font-bold">Cancel Editing?</h3>
            <p className="text-sm text-gray-600">
              Your unsaved changes will be lost. Do you want to proceed?
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={() => handleConfirmNavigation(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              >
                Continue Editing
              </button>
              <button
                onClick={() => handleConfirmNavigation(true)}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded"
              >
                Cancel Editing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Modal */}
      <div
        ref={modalRef}
        className={`relative bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl z-40 transition duration-300 ${highlightOnce ? "ring-4 ring-red-400 animate-pulse" : ""}`}
      >
        <button
          onClick={handleXClick}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          {isEdit ? "Edit Student" : "Add New Student"}
        </h2>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            {["name", "email", "phone", "address"].map((field) => (
              <div key={field}>
                <label className="block font-semibold capitalize mb-1">
                  {field}:
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  value={student[field] || ""}
                  onChange={(e) =>
                    setStudent((prev) => ({
                      ...prev,
                      [field]: e.target.value,
                    }))
                  }
                  className="w-full border rounded-md px-3 py-2"
                  required={field === "name" || field === "email"}
                />
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {["course", "yearLevel", "guardianName", "relationship"].map(
              (field) => (
                <div key={field}>
                  <label className="block font-semibold capitalize mb-1">
                    {field.replace(/([A-Z])/g, " $1")}:
                  </label>
                  <input
                    type="text"
                    value={student[field] || ""}
                    onChange={(e) =>
                      setStudent((prev) => ({
                        ...prev,
                        [field]: e.target.value,
                      }))
                    }
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
              )
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md flex items-center space-x-2"
          >
            <Save size={18} />
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* Overlay to block navbar interactions */}
      {hasChanges && (
        <div
          className="fixed inset-0 z-20 cursor-not-allowed"
          onClick={(e) => e.stopPropagation()}
        />
      )}
    </div>
  );
};

export default AddEditStudent;

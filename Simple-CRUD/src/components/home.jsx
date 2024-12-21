import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faEdit, faSpinner } from '@fortawesome/free-solid-svg-icons'

function Home() {
    const [students, setStudents] = useState([])  // List of students
    const [loading, setLoading] = useState(true)   // Loading state for fetching
    const [modalOpen, setModalOpen] = useState(false) // Modal for adding student
    const [editModalOpen, setEditModalOpen] = useState(false) // Modal for editing student
    const [deleteModalOpen, setDeleteModalOpen] = useState(false) // Modal for deleting student
    const [newStudent, setNewStudent] = useState({ name: '', age: '', gender: '' }) // New student form
    const [selectedStudent, setSelectedStudent] = useState(null) // Selected student for editing
    const [errorMessage, setErrorMessage] = useState('') // Error message
    const [addLoading, setAddLoading] = useState(false) // Loading state for adding
    const [updateLoading, setUpdateLoading] = useState(false) // Loading state for updating
    const [deleteLoading, setDeleteLoading] = useState(false) // Loading state for deleting

    // Fetch students when the component mounts
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/students')
                if (!response.ok) throw new Error('Network response was not ok')
                const data = await response.json()

                if (data.message && data.message === "Data is empty.") {
                    setErrorMessage(data.message)
                    setStudents([])  // Clear students if no data is found
                } else {
                    setStudents(data.data)
                    setErrorMessage('')
                }
            } catch (error) {
                console.error('Error fetching students: ', error)
                setErrorMessage('An error occurred while fetching the students.')
            } finally {
                setLoading(false)
            }
        }

        fetchStudents()
    }, []) // Empty dependency array ensures this runs only once when component mounts

    // Handle adding a new student
    const handleAddStudent = async () => {
        setAddLoading(true) // Show loading 

        try {
            const response = await fetch('http://localhost:8000/api/v1/student', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newStudent),
            })
            if (response.ok) {
                const addedStudent = await response.json()

                if (addedStudent.data) {
                    setStudents((prevStudents) => [...prevStudents, addedStudent.data]) // Add new student to the list
                }
            }
        } catch (error) {
            console.error('Error adding student: ', error)
            setErrorMessage('An error occurred while adding the student.')
        } finally {
            setAddLoading(false) // Hide loading animation
            setModalOpen(false)
            setNewStudent({ name: '', age: '', gender: '' }) // Reset new student form
        }
    }

    // Handle click to edit student
    const handleEditClick = (student) => {
        setSelectedStudent(student)
        setEditModalOpen(true)
    }

    // Handle updating the student information
    const handleUpdateStudent = async () => {
        setUpdateLoading(true) // Show loading animation

        try {
            const response = await fetch(`http://localhost:8000/api/v1/student/${selectedStudent.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedStudent),
            })
            if (response.ok) {
                const updatedStudent = await response.json()
                setStudents((prev) =>
                    prev.map((student) =>
                        student.id === updatedStudent.data.id ? updatedStudent.data : student
                    )
                ) // Update the student in the list
            }
        } catch (error) {
            console.error('Error updating student: ', error)
            setErrorMessage('An error occurred while updating the student.')
        } finally {
            setUpdateLoading(false) // Hide loading animation
            setEditModalOpen(false)
            setSelectedStudent(null) // Clear selected student
        }
    }

    // Handle click to delete student
    const handleDeleteClick = (id) => {
        setSelectedStudent(id)
        setDeleteModalOpen(true)
    }

    // Handle deleting the student
    const handleDeleteStudent = async () => {
        setDeleteLoading(true) // Show loading animation

        try {
            const response = await fetch(`http://localhost:8000/api/v1/student/${selectedStudent}`, { method: 'DELETE' })
            if (response.ok) {
                setStudents((prev) => prev.filter((student) => student.id !== selectedStudent)) // Remove the student from the list
            } else {
                setErrorMessage('Failed to delete the student.')
            }
        } catch (error) {
            console.error('Error deleting student: ', error)
            setErrorMessage('An error occurred while deleting the student.')
        } finally {
            setDeleteLoading(false) // Hide loading animation
            setDeleteModalOpen(false)
            setSelectedStudent(null) // Clear selected student
        }
    }

    // Show loading message if data is being fetched
    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-3xl font-bold text-gray-700">
                <span className="wave-animation">L</span>
                <span className="wave-animation animation-delay-100">o</span>
                <span className="wave-animation animation-delay-200">a</span>
                <span className="wave-animation animation-delay-300">d</span>
                <span className="wave-animation animation-delay-400">i</span>
                <span className="wave-animation animation-delay-500">n</span>
                <span className="wave-animation animation-delay-600">g</span>
                <span className="wave-animation animation-delay-700">.</span>
                <span className="wave-animation animation-delay-800">.</span>
                <span className="wave-animation animation-delay-900">.</span>
            </p>
        </div>
    )

    return (
        <div className="container mx-auto mt-5">
            <h1 className="text-center text-3xl font-bold mb-6">Simple CRUD Student</h1>
            <div className="mb-4 text-center">
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center justify-center mx-auto hover:bg-blue-600 focus:outline-none"
                    onClick={() => setModalOpen(true)}
                    disabled={addLoading} // Disable button while adding
                >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Add Student
                </button>
            </div>
            <table className="min-w-fit mx-auto bg-white border border-gray-200 rounded-lg shadow-md">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left font-semibold">Name</th>
                        <th className="px-4 py-2 text-left font-semibold">Age</th>
                        <th className="px-4 py-2 text-left font-semibold">Gender</th>
                        <th className="px-4 py-2 text-left font-semibold">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {errorMessage ? (
                        <tr>
                            <td colSpan="4" className="px-4 py-2 text-center text-red-500">
                                {errorMessage}
                            </td>
                        </tr>
                    ) : (
                        students.map((student) => (
                            <tr key={student.id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-2">{student.name}</td>
                                <td className="px-4 py-2">{student.age}</td>
                                <td className="px-4 py-2">{student.gender}</td>
                                <td className="px-4 py-2 flex space-x-2">
                                    <button
                                        className="text-blue-500 hover:text-blue-700"
                                        onClick={() => handleEditClick(student)}
                                        disabled={updateLoading} // Disable button while updating
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => handleDeleteClick(student.id)}
                                        disabled={deleteLoading} // Disable button while deleting
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Add Student Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                        <div className="flex justify-between items-center">
                            <h5 className="text-xl font-semibold">Add Student</h5>
                            <button
                                type="button"
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setModalOpen(false)}
                            >
                                <span className="text-2xl">&times;</span>
                            </button>
                        </div>
                        <div className="mt-4">
                            <div className="mb-4">
                                <label className="block text-sm font-semibold">Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    value={newStudent.name}
                                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold">Age</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    value={newStudent.age}
                                    onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold">Gender</label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    value={newStudent.gender}
                                    onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })}
                                >
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                className="py-2 px-4 text-gray-500 hover:text-gray-700"
                                onClick={() => setModalOpen(false)}
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                                onClick={handleAddStudent}
                                disabled={addLoading} // Disable button while adding
                            >
                                {addLoading ? (
                                    <FontAwesomeIcon icon={faSpinner} className="mr-2 animate-spin" />
                                ) : (
                                    'Add Student'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Student Modal */}
            {editModalOpen && selectedStudent && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                        <div className="flex justify-between items-center">
                            <h5 className="text-xl font-semibold">Edit Student</h5>
                            <button
                                type="button"
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setEditModalOpen(false)}
                            >
                                <span className="text-2xl">&times;</span>
                            </button>
                        </div>
                        <div className="mt-4">
                            <div className="mb-4">
                                <label className="block text-sm font-semibold">Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    value={selectedStudent.name}
                                    onChange={(e) =>
                                        setSelectedStudent({ ...selectedStudent, name: e.target.value })
                                    }
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold">Age</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    value={selectedStudent.age}
                                    onChange={(e) =>
                                        setSelectedStudent({ ...selectedStudent, age: e.target.value })
                                    }
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold">Gender</label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    value={selectedStudent.gender}
                                    onChange={(e) =>
                                        setSelectedStudent({ ...selectedStudent, gender: e.target.value })
                                    }
                                >
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                className="py-2 px-4 text-gray-500 hover:text-gray-700"
                                onClick={() => setEditModalOpen(false)}
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                                onClick={handleUpdateStudent}
                                disabled={updateLoading} // Disable button while updating
                            >
                                {updateLoading ? (
                                    <FontAwesomeIcon icon={faSpinner} className="mr-2 animate-spin" />
                                ) : (
                                    'Save Changes'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteModalOpen && selectedStudent && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                        <div className="flex justify-between items-center">
                            <h5 className="text-xl font-semibold">Confirm Deletion</h5>
                            <button
                                type="button"
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setDeleteModalOpen(false)}
                            >
                                <span className="text-2xl">&times;</span>
                            </button>
                        </div>
                        <div className="mt-4 text-center">
                            <p>Are you sure you want to delete the student <strong>{selectedStudent.name}</strong>?</p><br />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                className="py-2 px-4 text-gray-500 hover:text-gray-700"
                                onClick={() => setDeleteModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                                onClick={handleDeleteStudent}
                                disabled={deleteLoading}
                            >
                                {deleteLoading ? (
                                    <span className="animate-spin">Deleting...</span>
                                ) : (
                                    'Delete'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home

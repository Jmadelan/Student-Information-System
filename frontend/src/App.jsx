
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:3000/api/students";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      setMessage("Cannot connect to the server.");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentData = { name, email, course };

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, studentData);
        setMessage("Student updated successfully!");
      } else {
        await axios.post(API_URL, studentData);
        setMessage("Student added successfully!");
      }

      resetForm();
      fetchStudents();
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong.");
    }
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setName(student.name);
    setEmail(student.email);
    setCourse(student.course);
    setMessage("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`);
      setMessage("Student deleted successfully!");
      fetchStudents();
    } catch (error) {
      setMessage("Failed to delete student.");
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setCourse("");
    setEditingId(null);
  };

  return (
    <div className="container">
      <header>
        <h1>Student Information System</h1>
        <p>Manage your student records</p>
      </header>

      <section className="form-section">
        <h2>{editingId ? "Update Student" : "Add New Student"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />

          <button type="submit">
            {editingId ? "Update Student" : "Add Student"}
          </button>

          {editingId && (
            <button type="button" className="cancel" onClick={resetForm}>
              Cancel
            </button>
          )}
        </form>

        {message && <p className="message">{message}</p>}
      </section>

      <section className="table-section">
        <h2>Student Records</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="5">No student records found.</td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.course}</td>
                  <td>
                    <button onClick={() => handleEdit(student)}>
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;

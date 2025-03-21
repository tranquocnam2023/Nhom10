import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://67dce0b5e00db03c40693380.mockapi.io/RESTAPI/student";

function App() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ mssv: "", hoten: "", lop: "", avatar: "" });

  // Lấy danh sách sinh viên từ API
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get(API_URL)
      .then((response) => setStudents(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  // Xử lý thêm sinh viên (POST)
  const handleAddStudent = () => {
    axios
      .post(API_URL, newStudent)
      .then(() => {
        fetchStudents(); // Cập nhật danh sách ngay sau khi thêm
        setNewStudent({ mssv: "", hoten: "", lop: "", avatar: "" }); // Reset form
      })
      .catch((error) => console.error("Error adding student:", error));
  };

  // Xử lý xóa sinh viên (DELETE)
  const handleDeleteStudent = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => fetchStudents()) // Cập nhật danh sách ngay sau khi xóa
      .catch((error) => console.error("Error deleting student:", error));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Danh sách sinh viên</h1>

      {/* Form thêm sinh viên */}
      <div className="mb-6 p-4 bg-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Thêm sinh viên</h2>
        <input
          type="text"
          placeholder="MSSV"
          value={newStudent.mssv}
          onChange={(e) => setNewStudent({ ...newStudent, mssv: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Họ tên"
          value={newStudent.hoten}
          onChange={(e) => setNewStudent({ ...newStudent, hoten: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Lớp"
          value={newStudent.lop}
          onChange={(e) => setNewStudent({ ...newStudent, lop: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="URL Avatar"
          value={newStudent.avatar}
          onChange={(e) => setNewStudent({ ...newStudent, avatar: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <button
          onClick={handleAddStudent}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Thêm sinh viên
        </button>
      </div>

      {/* Danh sách sinh viên */}
      <ul className="space-y-4">
        {students.map((student) => (
          <li key={student.id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow">
            <div className="flex items-center">
              <img
                src={student.avatar}
                alt={student.hoten}
                className="w-16 h-16 rounded-full mr-4 border-2 border-gray-300"
              />
              <div>
                <p className="text-lg font-semibold">{student.hoten}</p>
                <p className="text-gray-600">MSSV: {student.mssv}</p>
                <p className="text-gray-600">Lớp: {student.lop}</p>
              </div>
            </div>
            <button
              onClick={() => handleDeleteStudent(student.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
            >
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

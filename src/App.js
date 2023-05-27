import React, { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    fetchStudents(currentPage);
  }, [currentPage]);

  const fetchStudents = async (page) => {
    try {
      const response = await fetch(`/students?page=${page}`);
      if (!response.ok) {
        throw new Error('Error fetching student details');
      }
      const data = await response.json();
      setStudents(data.students);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const applyFilters = () => {
    setCurrentPage(1);
  };

  return (
    <div className="App">
      <div className="filters">
        <label htmlFor="nameFilter">Name:</label>
        <input
          type="text"
          id="nameFilter"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          placeholder="Enter name"
        />
        <button onClick={applyFilters}>Apply Filters</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Total Marks</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.totalMarks}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={previousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
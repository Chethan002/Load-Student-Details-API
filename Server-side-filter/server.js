const express = require('express');
const cors = require('cors');
const students = require('./data/students.json');

const app = express();
app.use(cors());

// API endpoint for loading student details with pagination
app.get('/students', (req, res) => {
  const { page, pageSize } = req.query;
  const pageNumber = parseInt(page, 10);
  const pageSizeNumber = parseInt(pageSize, 10);

  // Calculate start and end indices for pagination
  const startIndex = (pageNumber - 1) * pageSizeNumber;
  const endIndex = startIndex + pageSizeNumber;

  // Slice the student details array based on pagination indices
  const paginatedStudents = students.slice(startIndex, endIndex);

  // Calculate total number of pages
  const totalPages = Math.ceil(students.length / pageSizeNumber);

  // Send the paginated student details and total pages as the response
  res.json({ students: paginatedStudents, totalPages });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
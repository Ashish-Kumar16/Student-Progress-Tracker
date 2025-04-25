/* eslint-disable no-unused-vars */

import { useState } from "react";
import { 
  Box, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, Chip
} from '@mui/material';
import { mockStudents } from "@/data/mockData";

const StudentList = () => {
  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Students
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Attendance</TableCell>
              <TableCell>Submissions</TableCell>
              <TableCell>Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>
                  <Chip 
                    label={`${student.attendance}%`}
                    color={student.attendance > 80 ? "success" : student.attendance > 60 ? "warning" : "error"}
                    size="small"
                  />
                </TableCell>
                <TableCell>{student.submissions}</TableCell>
                <TableCell>
                  <Chip 
                    label={`${student.grade}%`}
                    color={student.grade > 80 ? "success" : student.grade > 60 ? "warning" : "error"}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StudentList;

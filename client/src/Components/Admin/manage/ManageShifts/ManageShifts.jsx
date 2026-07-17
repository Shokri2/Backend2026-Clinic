import {
  Button,
  Container,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Typography,
  Select,
} from "@mui/material";
import { useShift } from "../../../../Hooks/useShift";
import { useEffect, useState } from "react";
import AddShift from "./AddShift";
export default function ManageShifts() {
  const { fetchAllShifts, shifts } = useShift();
  useEffect(() => {
    fetchAllShifts();
  }, []);
  const [open, setOpen] = useState(false);
  console.log(shifts);

  return (
    <>
      <Container sx={{ my: 3 }}>
        <Typography variant="h3">Manage Shifts</Typography>
        <Button
          variant="contained"
          sx={{ my: 3 }}
          onClick={() => setOpen(!open)}
        >
          {open ? "Cancel" : "Add Shift"}
        </Button>
        {open && <AddShift />}
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>number</TableCell>
                <TableCell>Emplyee Name</TableCell>
                <TableCell>Employee EMAIL</TableCell>
                <TableCell>START TIME</TableCell>
                <TableCell>end time</TableCell>
                <TableCell>over time</TableCell>
                <TableCell>shift number</TableCell>
                <TableCell>shift status</TableCell>
                <TableCell>action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shifts.map((shift, idx) => {
                return (
                  <TableRow key={shift._id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{shift.employee.name}</TableCell>
                    <TableCell>{shift.employee.email}</TableCell>
                    <TableCell>{shift.startTime}</TableCell>
                    <TableCell>{shift.endTime}</TableCell>
                    <TableCell>{shift.shiftNumber}</TableCell>
                    <TableCell>{shift.status}</TableCell>
                    <TableCell>
                      {shift.isOverTime ? "Over Time" : "Working Hour"}
                    </TableCell>
                    <TableCell>
                      <Button>delete</Button>
                      <Button>edit</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

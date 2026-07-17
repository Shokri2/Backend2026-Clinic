import {
  Paper,
  TextField,
  Button,
  Container,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useShift } from "../../../../Hooks/useShift";
import { useEmployee } from "../../../../Hooks/useEmployee";
export default function AddShift() {
  //create => data,
  const { addNewShift } = useShift();
  const { fetchAllEmployess, emlployees } = useEmployee();
  useEffect(() => {
    fetchAllEmployess();
  }, []);
  const [shiftData, setShiftData] = useState({
    // init value, init types.
    employee: "",
    startTime: "",
    endTime: "",
    shiftNumber: 0,
    isOverTime: Boolean,
  });
  const handleAddNew = () => {
    addNewShift(shiftData);
    setShiftData({
      employee: "",
      startTime: "",
      endTime: "",
      shiftNumber: 0,
      isOverTime: true,
    });
  };
  return (
    <>
      <Container sx={{ my: 3 }}>
        <Paper
          elevation={4}
          sx={{ my: 4, display: "flex", flexDirection: "column", gap: 3, p: 3 }}
        >
          <InputLabel>Employee name</InputLabel>
          <Select
            value={shiftData.employee}
            onChange={(e) =>
              setShiftData({ ...shiftData, employee: e.target.value })
            }
          >
            {emlployees.map((user) => {
              return (
                <MenuItem key={user._id} value={user._id}>
                  {user.name}
                </MenuItem>
              );
            })}
          </Select>
          <TextField
            label="STrt Time"
            value={shiftData.startTime}
            type="time"
            onChange={(e) =>
              setShiftData({ ...shiftData, startTime: e.target.value })
            }
          />
          <TextField
            label="End Time"
            type="time"
            value={shiftData.endTime}
            onChange={(e) =>
              setShiftData({ ...shiftData, endTime: e.target.value })
            }
          />
          <TextField
            label="Shift Number"
            value={shiftData.shiftNumber}
            type="number"
            onChange={(e) =>
              setShiftData({ ...shiftData, shiftNumber: e.target.value })
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={shiftData.isOverTime}
                onChange={(e) =>
                  setShiftData({ ...shiftData, isOverTime: e.target.value })
                }
              />
            }
            label="Is Over Time"
          />

          <Button onClick={handleAddNew} variant="contained">
            Add
          </Button>
        </Paper>
      </Container>
    </>
  );
}

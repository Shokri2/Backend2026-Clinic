import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { useShift } from "../../Hooks/useShift";

export default function EmployeeDashboard() {
  const { currentUser } = useContext(UserContext);
  const { fetchEmployeeShifts, employeeShifts, updateEmployeeStatus } =
    useShift();
  useEffect(() => {
    fetchEmployeeShifts(currentUser.id);
  }, []);
  const [status, steStatus] = useState("");
  const handleSave = (id) => {
    updateEmployeeStatus(id, status);
  };
  return (
    <>
      <Container sx={{ m: "auto", p: 3 }}>
        <Typography>Employee: {currentUser.name} </Typography>

        <Grid container spacing={5} sx={{ my: 3 }}>
          {employeeShifts.map((shift) => {
            return (
              <Grid key={shift._id}>
                <Card sx={{ p: 3 }}>
                  <CardContent>
                    <Typography>Shift Number: {shift.shiftNumber}</Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography>
                      {shift.startTime} to {shift.endTime}
                    </Typography>
                    <Typography>
                      {shift.isOverTime ? "OverTime" : "Working hours"}
                    </Typography>

                    <FormControl>
                      <FormLabel>Shift Status</FormLabel>
                      <RadioGroup
                        defaultValue={shift.status}
                        name="radio-buttons-group"
                        onChange={(e) => steStatus(e.target.value)}
                      >
                        <FormControlLabel
                          value="end"
                          control={<Radio />}
                          label="Ends"
                        />
                        <FormControlLabel
                          value="not started"
                          control={<Radio />}
                          label="Not started"
                        />
                        <FormControlLabel
                          value="in progress"
                          control={<Radio />}
                          label="In Progress"
                        />
                      </RadioGroup>
                    </FormControl>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={() => handleSave(shift._id)}
                      variant="contained"
                    >
                      Save
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}

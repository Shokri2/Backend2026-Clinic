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
  Typography,
} from "@mui/material";
import { useUsers } from "../../../../Hooks/useUsers";
import { useEffect } from "react";
export default function ManageUsers() {
  const { users, fetchAllUsers, deleteUser } = useUsers();
  useEffect(() => {
    fetchAllUsers();
  }, []);
  const handleDelete = (userId) => {
    deleteUser(userId);
  };
  return (
    <>
      <Container sx={{ my: 3 }}>
        <Typography variant="h3">Manage Users</Typography>
        <Divider />{" "}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>number</TableCell>
                <TableCell>name</TableCell>
                <TableCell>email</TableCell>
                <TableCell>role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, idx) => {
                return (
                  <TableRow key={user._id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </Button>
                      <Button variant="contained" color="warning">
                        Edit Role
                      </Button>
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

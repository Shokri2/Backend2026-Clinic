import {
  Box,
  Button,
  Container,
  Divider,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useUsers } from "../../../../Hooks/useUsers";
import { useEffect, useState } from "react";
import Register from "../../../Auth/Register";
export default function ManageUsers() {
  const { users, fetchAllUsers, deleteUser, updatedUserRole } = useUsers();
  useEffect(() => {
    fetchAllUsers();
  }, []);
  const handleDelete = (userId) => {
    deleteUser(userId);
  };
  const handleEditRole = () => {
    updatedUserRole(newRole, editedId);
    setEditedId(null);
  };
  const [addNew, setAddNew] = useState(false);
  const [editedId, setEditedId] = useState(null);
  const [newRole, setNewRole] = useState({
    role: "",
  });
  const [email, setEmail] = useState("");
  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(email.toLowerCase()),
  );
  return (
    <>
      <Container sx={{ my: 3 }}>
        <Typography variant="h3">Manage Users</Typography>
        <Button
          variant="contained"
          sx={{ my: 3 }}
          onClick={() => setAddNew(!addNew)}
        >
          Add New User
        </Button>
        <TextField
          label="Searc Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Box sx={{ mb: 4 }}>{addNew && <Register />}</Box>

        <Divider />
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
              {filteredUsers.map((user, idx) => {
                const isEditing = editedId === user._id;
                return (
                  <TableRow key={user._id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {isEditing ? (
                        <Select
                          label="Role"
                          value={newRole}
                          onChange={(e) => setNewRole(e.target.value)}
                        >
                          <MenuItem value={"admin"}>Admin</MenuItem>
                          <MenuItem value={"user"}>User</MenuItem>
                          <MenuItem value={"employee"}>Emplyee</MenuItem>
                        </Select>
                      ) : (
                        user.role
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </Button>
                      {isEditing ? (
                        <>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={handleEditRole}
                          >
                            Save
                          </Button>
                          <Button
                            variant="contained"
                            color="info"
                            onClick={() => setEditedId(null)}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="contained"
                          color="warning"
                          onClick={() => setEditedId(user._id)}
                        >
                          Edit Role
                        </Button>
                      )}
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

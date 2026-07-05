import {
  Button,
  Container,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useMenu } from "../../../../Hooks/useMenu";
import AddMenuForm from "./AddMenuForm";
import { useState } from "react";
export default function ManageMenu() {
  const { menu, deleteMenu, editMenuItem } = useMenu();
  const [isOpen, setIsOpen] = useState(false);
  
  const [editId, setEditId] = useState(null);
  
  const [editedData, setEdititngData] = useState({});
  const handleEdit = () => {
    editMenuItem(editedData, editId);
    setEditId(null);
  };
  return (
    <>
      <Container sx={{ my: 3 }}>
        <Typography variant="h3">Manage menu</Typography>
        <Button
          variant="contained"
          sx={{ my: 3 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Cancel" : "Add New Item"}
        </Button>
        {isOpen && <AddMenuForm />}
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>number</TableCell>
                <TableCell>name</TableCell>
                <TableCell>description</TableCell>
                <TableCell>is publish</TableCell>
                <TableCell>price</TableCell>
                <TableCell>action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu.map((item, idx) => {
                const isEditing = editId === item._id;
                return (
                  <TableRow key={item._id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          label="Name"
                          value={editedData.name}
                          onChange={(e) =>
                            setEdititngData({
                              ...editedData,
                              name: e.target.value,
                            })
                          }
                        />
                      ) : (
                        item.name
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          label="Descriprion"
                          value={editedData.description}
                          onChange={(e) =>
                            setEdititngData({
                              ...editedData,
                              description: e.target.value,
                            })
                          }
                        />
                      ) : (
                        item.description
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          label="Is Publish"
                          value={editedData.is_publish}
                          onChange={(e) =>
                            setEdititngData({
                              ...editedData,
                              is_publish: e.target.value,
                            })
                          }
                        />
                      ) : item.is_publish ? (
                        "publish"
                      ) : (
                        "not puclish"
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          label="Price"
                          value={editedData.price}
                          onChange={(e) =>
                            setEdititngData({
                              ...editedData,
                              price: e.target.value,
                            })
                          }
                        />
                      ) : (
                        item.price
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteMenu(item._id)}
                      >
                        Delete
                      </Button>
                      {isEditing ? (
                        <>
                          <Button
                            variant="contained"
                            color="warning"
                            onClick={() => setEditId(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={handleEdit}
                          >
                            Save
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="contained"
                          color="warning"
                          onClick={() => setEditId(item._id)}
                        >
                          Edit
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

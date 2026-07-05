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
import { useCategories } from "../../../../Hooks/useCategories";
export default function ManageCategories() {
  const { categories } = useCategories();
  return (
    <>
      <Container sx={{ my: 3 }}>
        <Typography variant="h3">Manage Categories</Typography>
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>number</TableCell>
                <TableCell>name</TableCell>
                <TableCell>action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((item, idx) => {
                return (
                  <TableRow key={item._id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="error">
                        Delete
                      </Button>
                      <Button variant="contained" color="warning">
                        Edit
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

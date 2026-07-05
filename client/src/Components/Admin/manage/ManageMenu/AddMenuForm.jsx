import { Paper, TextField, Button, Container } from "@mui/material";
import { useState } from "react";
import { useMenu } from "../../../../Hooks/useMenu";
export default function AddMenuForm() {
  
  const { addNewMenuItem } = useMenu();
  const [menuData, setMenuData] = useState({
   
    name: "",
    description: "",
    price: 0,
    image: "",
    is_publish: true,
    catId: "",
  });

  const handleAddNew = () => {
    console.log(menuData);

    addNewMenuItem(menuData);
    setMenuData({
      name: "",
      description: "",
      price: 0,
      image: "",
      is_publish: true,
      catId: "",
    });
  };
  return (
    <>
      <Container sx={{ my: 3 }}>
        <Paper
          elevation={4}
          sx={{ my: 4, display: "flex", flexDirection: "column", gap: 3, p: 3 }}
        >
          <TextField
            label="Name"
            value={menuData.name} //controlled component
            onChange={(e) => setMenuData({ ...menuData, name: e.target.value })}
          />
          <TextField
            label="Description"
            value={menuData.description}
            onChange={(e) =>
              setMenuData({ ...menuData, description: e.target.value })
            }
          />
          <TextField
            label="Price"
            type="number"
            value={menuData.price}
            onChange={(e) =>
              setMenuData({ ...menuData, price: e.target.value })
            }
          />
          <TextField
            label="Image"
            value={menuData.image}
            onChange={(e) =>
              setMenuData({ ...menuData, image: e.target.value })
            }
          />
          <TextField
            label="Category"
            value={menuData.catId}
            onChange={(e) =>
              setMenuData({ ...menuData, catId: e.target.value })
            }
          />
          <TextField
            label="Publish"
            value={menuData.is_publish}
            onChange={(e) =>
              setMenuData({ ...menuData, is_publish: e.target.value })
            }
          />
          <Button onClick={handleAddNew} variant="contained">
            Add
          </Button>
        </Paper>
      </Container>
    </>
  );
}

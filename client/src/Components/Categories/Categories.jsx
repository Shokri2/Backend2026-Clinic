import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useCategories } from "../../Hooks/useCategories";

export default function Categories() {
  const { categories } = useCategories();
  console.log(categories);

  return (
    <>
      <Box>
        <Grid container spacing={4}>
          {categories.map((category) => {
            return (
              <Grid key={category._id}>
                <Card>
                  <CardMedia
                    component={"img"}
                    src={category.image}
                    alt="this is image"
                  />
                  <CardContent>
                    <Typography variant="h3">{category.name}</Typography>
                    <Typography variant="h6">{category.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}

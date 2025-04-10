import { Link } from "react-router-dom";
import { useStore } from "../store/useStore.ts";
import { Grid, Button, Typography, Box, Container } from "@mui/material";
import RecipeCard from "../components/RecipeCard";

export default function Home() {
    const { recipes } = useStore();

    return (
        <Container maxWidth="lg">
            <Typography
                variant="h4"
                sx={{
                    my: 4,
                    fontWeight: 600,
                    textAlign: "center",
                    color: "primary.main"
                }}
            >
                🍽️ Recipe Feed
            </Typography>

            <Grid container spacing={4}>
                {recipes.map((recipe) => (
                    <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <RecipeCard recipe={recipe} />
                            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component={Link}
                                    to={`/recipe/${recipe.id}`}
                                >
                                    View
                                </Button>
                                <Button
                                    variant="outlined"
                                    component={Link}
                                    to={`/edit/${recipe.id}`}
                                >
                                    Edit
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

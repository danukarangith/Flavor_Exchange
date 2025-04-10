import { useParams, Link } from "react-router-dom";
import { useStore } from "../store/useStore.ts";
import { Box, Typography, Button } from "@mui/material";

export default function RecipeDetails() {
    const { id } = useParams();
    const { recipes } = useStore();
    const recipe = recipes.find((r) => r.id === Number(id));

    if (!recipe) {
        return <Typography>Recipe not found</Typography>;
    }

    return (
        <Box sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
            <Typography variant="h4">{recipe.title}</Typography>
            <img src={recipe.image} alt={recipe.title} style={{ width: "100%", height: "auto" }} />
            <Typography variant="body1">Cooking Time: {recipe.time} minutes</Typography>
            <Typography variant="body2">Rating: {recipe.rating}</Typography>
            <Typography variant="h6">Ingredients:</Typography>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <Typography variant="h6">Instructions:</Typography>
            <Typography>{recipe.instructions}</Typography>
            <Button variant="contained" sx={{ mt: 2 }}>
                <Link to={`/edit/${recipe.id}`} style={{ color: "white" }}>Edit Recipe</Link>
            </Button>
        </Box>
    );
}

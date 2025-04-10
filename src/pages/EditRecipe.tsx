import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore.ts";
import { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

export default function EditRecipe() {
    const { id } = useParams();
    const { recipes, updateRecipe, deleteRecipe } = useStore();
    const navigate = useNavigate();
    const recipe = recipes.find((r) => r.id === Number(id));

    const [form, setForm] = useState({
        title: "",
        time: "",
        rating: "",
        image: "",
        ingredients: "",
        instructions: "",
    });

    useEffect(() => {
        if (recipe) {
            setForm({
                title: recipe.title,
                time: recipe.time.toString(),
                rating: recipe.rating.toString(),
                image: recipe.image,
                ingredients: recipe.ingredients.join(","),
                instructions: recipe.instructions,
            });
        }
    }, [recipe]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!recipe) return;

        const updatedRecipe = {
            id: Number(id),
            title: form.title,
            time: form.time,
            rating: Number(form.rating),
            image: form.image,
            ingredients: form.ingredients.split(",").map(i => i.trim()),
            instructions: form.instructions,
            createdBy: recipe.createdBy, // ✅ Add this line
        };

        updateRecipe(updatedRecipe);
        navigate(`/recipe/${id}`);
    };



    const handleDelete = () => {
        deleteRecipe(Number(id));
        navigate("/");
    };

    if (!recipe) return <Typography>Recipe not found</Typography>;

    return (
        <Box sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
            <Typography variant="h5">Edit Recipe</Typography>
            <TextField fullWidth label="Title" name="title" value={form.title} onChange={handleChange} sx={{ my: 1 }} />
            <TextField fullWidth label="Cooking Time" name="time" value={form.time} onChange={handleChange} sx={{ my: 1 }} />
            <TextField fullWidth label="Rating" name="rating" value={form.rating} onChange={handleChange} sx={{ my: 1 }} />
            <TextField fullWidth label="Image URL" name="image" value={form.image} onChange={handleChange} sx={{ my: 1 }} />
            <TextField fullWidth multiline label="Ingredients (comma-separated)" name="ingredients" value={form.ingredients} onChange={handleChange} sx={{ my: 1 }} />
            <TextField fullWidth multiline label="Instructions" name="instructions" value={form.instructions} onChange={handleChange} sx={{ my: 1 }} />
            <Button variant="contained" fullWidth onClick={handleSubmit}>Update Recipe</Button>
            <Button color="error" fullWidth sx={{ mt: 1 }} onClick={handleDelete}>Delete Recipe</Button>
        </Box>
    );
}

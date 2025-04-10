import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore.ts";
import { TextField, Button, Box, Typography } from "@mui/material";

export default function AddRecipe() {
    const { addRecipe, user } = useStore();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        time: "",
        rating: "",
        image: null as File | null,
        ingredients: "",
        instructions: "",
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setForm({ ...form, image: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        const newRecipe = {
            id: Date.now(),
            title: form.title,
            time: form.time,
            rating: Number(form.rating),
            image: previewUrl || "",
            ingredients: form.ingredients.split(",").map(i => i.trim()),
            instructions: form.instructions,
            createdBy: user || "guest",
        };

        addRecipe(newRecipe);
        navigate("/");
    };

    return (
        <Box sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Add a New Recipe</Typography>

            <TextField
                fullWidth
                label="Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                sx={{ my: 1 }}
            />

            <TextField
                fullWidth
                label="Cooking Time"
                name="time"
                value={form.time}
                onChange={handleChange}
                sx={{ my: 1 }}
            />

            <TextField
                fullWidth
                label="Rating"
                name="rating"
                value={form.rating}
                onChange={handleChange}
                sx={{ my: 1 }}
            />

            <Button variant="outlined" component="label" sx={{ my: 1 }}>
                Upload Image
                <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                />
            </Button>

            {previewUrl && (
                <Box sx={{ my: 2, textAlign: "center" }}>
                    <img
                        src={previewUrl}
                        alt="Preview"
                        style={{ maxWidth: "100%", maxHeight: 300 }}
                    />
                </Box>
            )}

            <TextField
                fullWidth
                multiline
                label="Ingredients (comma-separated)"
                name="ingredients"
                value={form.ingredients}
                onChange={handleChange}
                sx={{ my: 1 }}
            />

            <TextField
                fullWidth
                multiline
                label="Instructions"
                name="instructions"
                value={form.instructions}
                onChange={handleChange}
                sx={{ my: 1 }}
            />

            <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                sx={{ mt: 2 }}
            >
                Add Recipe
            </Button>
        </Box>
    );
}

import { useStore } from "../store/useStore.ts";
import { Grid, Typography } from "@mui/material";
import RecipeCard from "../components/RecipeCard";

export default function Favorites() {
    const { recipes, favorites } = useStore();

    const favoriteList = recipes.filter((r) =>
        favorites.some((fav) => fav.id === r.id)
    );

    return (
        <>
            <Typography variant="h4" sx={{ m: 2 }}>Your Favorite Recipes</Typography>
            <Grid container spacing={2}>
                {favoriteList.length === 0 ? (
                    <Typography sx={{ m: 2 }}>No favorites yet.</Typography>
                ) : (
                    favoriteList.map((recipe) => (
                        <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                            <RecipeCard recipe={recipe} />
                        </Grid>
                    ))
                )}
            </Grid>
        </>
    );
}

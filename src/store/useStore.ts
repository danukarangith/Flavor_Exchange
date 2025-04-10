import { create } from "zustand";

export interface Recipe {
    id: number;
    title: string;
    time: string;
    rating: number;
    image: string;
    ingredients: string[];
    instructions: string;
    createdBy: string;
}


interface State {
    user: string | null;
    recipes: Recipe[];
    favorites: Recipe[];
    setUser: (user: string) => void;
    logout: () => void;
    setRecipes: (recipes: Recipe[]) => void;
    addRecipe: (recipe: Recipe) => void;
    updateRecipe: (recipe: Recipe) => void;
    deleteRecipe: (id: number) => void;
    toggleFavorite: (recipe: Recipe) => void;
}

export const useStore = create<State>((set) => ({
    user: localStorage.getItem("user"),
    recipes: [],
    favorites: [],
    setUser: (user) => {
        localStorage.setItem("user", user);
        set({ user });
    },
    logout: () => {
        localStorage.removeItem("user");
        set({ user: null });
    },
    setRecipes: (recipes) => set({ recipes }),
    addRecipe: (recipe) =>
        set((state) => ({ recipes: [...state.recipes, recipe] })),
    updateRecipe: (updatedRecipe) =>
        set((state) => ({
            recipes: state.recipes.map((r) =>
                r.id === updatedRecipe.id ? updatedRecipe : r
            ),
        })),
    deleteRecipe: (id) =>
        set((state) => ({
            recipes: state.recipes.filter((r) => r.id !== id),
        })),
    toggleFavorite: (recipe) =>
        set((state) => {
            const isFav = state.favorites.find((r) => r.id === recipe.id);
            const updated = isFav
                ? state.favorites.filter((r) => r.id !== recipe.id)
                : [...state.favorites, recipe];
            return { favorites: updated };
        }),
}));

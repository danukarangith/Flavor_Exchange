import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { getTheme } from "./theme";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import Login from "./pages/Login";
import Signup from "./pages/SignUp.tsx";
import AddRecipe from "./pages/AddRecipe";
import EditRecipe from "./pages/EditRecipe";
import Header from "./components/Header";

const App = () => {
    const [mode, setMode] = useState<"light" | "dark">("light");

    return (
        <ThemeProvider theme={getTheme(mode)}>
            <CssBaseline />
            <Header mode={mode} onToggleMode={() => setMode(mode === "light" ? "dark" : "light")} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipe/:id" element={<RecipeDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/add" element={<AddRecipe />} />
                <Route path="/edit/:id" element={<EditRecipe />} />
            </Routes>
        </ThemeProvider>
    );
};

export default App;

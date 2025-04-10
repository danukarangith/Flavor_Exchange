import { AppBar, Toolbar, Typography, Button, Box, Switch } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import {Add, Brightness4, Brightness7, ExitToApp} from "@mui/icons-material";

interface HeaderProps {
    onToggleMode: () => void;
    mode: "light" | "dark";
}

const Header: React.FC<HeaderProps> = ({ onToggleMode, mode }) => {
    const { user, logout } = useStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <AppBar position="static" sx={{ background: mode === "dark" ? "linear-gradient(135deg, #3c3c3c, #1e1e1e)" : "linear-gradient(135deg, #ff7e5f, #feb47b)", boxShadow: 3 }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {/* Logo and Title */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                        variant="h5"
                        component={Link}
                        to="/"
                        color="inherit"
                        sx={{
                            textDecoration: "none",
                            fontWeight: "bold",
                            fontFamily: "'Poppins', sans-serif",
                            letterSpacing: 1.5,
                        }}
                    >
                        🍽️ Flavor Exchange
                    </Typography>
                </Box>

                {/* Right Side - Theme Switch and Navigation */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    {/* Dark/Light Mode Switch */}
                    <Box sx={{ display: "flex", alignItems: "center", mr: 3 }}>
                        <Switch
                            checked={mode === "dark"}
                            onChange={onToggleMode}
                            color="default"
                            sx={{
                                '& .MuiSwitch-thumb': {
                                    backgroundColor: mode === "dark" ? "#fff" : "#000", // Thumb color
                                },
                                transition: "all 0.3s ease-in-out"
                            }}
                        />
                        <Typography variant="body2" color="inherit" sx={{ marginLeft: 1 }}>
                            {mode === "dark" ? <Brightness4 /> : <Brightness7 />}
                        </Typography>
                    </Box>


                    {user ? (
                        <>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/add"
                                startIcon={<Add />} // Add icon to "Add Recipe" button
                                sx={{
                                    fontWeight: "bold",
                                    borderRadius: "20px",
                                    textTransform: "capitalize",
                                    '&:hover': {
                                        backgroundColor: mode === "dark" ? "#333" : "#f5b642",
                                    },
                                    transition: "background-color 0.3s ease",
                                    paddingX: 3,
                                }}
                            >
                                Add Recipe
                            </Button>
                            <Button
                                color="inherit"
                                onClick={handleLogout}
                                startIcon={<ExitToApp />}
                                sx={{
                                    fontWeight: "bold",
                                    borderRadius: "20px",
                                    textTransform: "capitalize",
                                    '&:hover': {
                                        backgroundColor: mode === "dark" ? "#333" : "#f5b642",
                                    },
                                    transition: "background-color 0.3s ease",
                                    paddingX: 3,
                                }}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/login"
                                sx={{
                                    fontWeight: "bold",
                                    borderRadius: "20px",
                                    textTransform: "capitalize",
                                    '&:hover': {
                                        backgroundColor: mode === "dark" ? "#333" : "#f5b642",
                                    },
                                    transition: "background-color 0.3s ease",
                                    paddingX: 3,
                                }}
                            >
                                Login
                            </Button>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/signup"
                                sx={{
                                    fontWeight: "bold",
                                    borderRadius: "20px",
                                    backgroundColor: mode === "dark" ? "#f5b642" : "#ff5722",
                                    '&:hover': {
                                        backgroundColor: mode === "dark" ? "#ff9800" : "#f44336",
                                    },
                                    transition: "background-color 0.3s ease",
                                    paddingX: 3,
                                }}
                            >
                                Signup
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;

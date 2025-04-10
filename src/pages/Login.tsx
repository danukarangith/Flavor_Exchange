import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { setUser } = useStore();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            alert("No user found. Please sign up first.");
            return;
        }

        const parsedUser = JSON.parse(storedUser);
        if (username === parsedUser.username && password === parsedUser.password) {
            setUser(username);
            navigate("/");
        } else {
            alert("Invalid username or password.");
        }
    };

    return (
        <Box p={4} maxWidth="400px" mx="auto">
            <Typography variant="h5" mb={2}>Login</Typography>
            <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2 }}
            />
            <Button fullWidth variant="contained" onClick={handleLogin}>
                Login
            </Button>
        </Box>
    );
};

export default Login;

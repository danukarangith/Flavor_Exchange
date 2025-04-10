import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = () => {
        if (!username || !password) {
            alert("Please fill in all fields");
            return;
        }

        // Save user to localStorage
        const user = { username, password };
        localStorage.setItem("user", JSON.stringify(user));
        alert("Sign up successful! Now you can sign in.");
        navigate("/login");
    };

    return (
        <Box p={4} maxWidth="400px" mx="auto">
            <Typography variant="h5" mb={2}>Sign Up</Typography>
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
            <Button fullWidth variant="contained" onClick={handleSignup}>
                Sign Up
            </Button>
        </Box>
    );
};

export default Signup;

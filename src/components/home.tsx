import { Button, Container, Typography } from "@mui/material";

export default function Home() {
    const user = JSON.parse(localStorage.getItem('user') ?? "{}") || null;
    const role = localStorage.getItem('role');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (user && role && isLoggedIn) {
        return (
            <Container sx={{ padding: 10, marginTop: 2 }}>
                <Typography variant="h3">Welcome back, {user.first_name}!</Typography>
                <Typography>You are logged in as a {role}.</Typography>
                <Typography>To log out, please click the button below.</Typography>
                <Button onClick={() => {
                    localStorage.removeItem('user');
                    localStorage.removeItem('role');
                    localStorage.removeItem('isLoggedIn');
                    window.location.reload();
                }
                }>Log Out</Button>
            </Container>
        )
    }
    return (
        <Container>
            <Typography>Patient Registration</Typography>
            <Typography>Welcome to the Patient Registration System</Typography>
            <Typography>Use email "admin@docsys.com" and password "admin" to login into dashboard</Typography>
            <Button href='/login'>Login</Button>
        </Container>
    )
}
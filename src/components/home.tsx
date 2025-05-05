import { Button, Container, Typography } from "@mui/material";

export default function Home() {
    const user = JSON.parse(localStorage.getItem('user'));
    const role = localStorage.getItem('role');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (user && role && isLoggedIn) {
        return (
            <Container sx={{ padding: 2 }}>
                <Typography variant="h3">Welcome back, {user.first_name}!</Typography>
                <Typography>You are logged in as a {role}.</Typography>
                <Typography>Patient Detials</Typography>
                <Typography>First Name: {user.first_name}</Typography>
                <Typography>Last Name: {user.last_name}</Typography>
                <Typography>Email: {user.email}</Typography>
                <Typography>Phone Number: {user.phone_number}</Typography>
                <Typography>Role: {role}</Typography>
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
            <Typography>This system allows you to register new patients and manage their information.</Typography>
            <Typography>To get started, please click on the "Sign Up" button below.</Typography>
            <Button href='/signup'>Sign Up</Button>
            <Typography>If you already have an account, please click on the "Log In" button below.</Typography>
            <Button href='/login'>Login</Button>
        </Container>
    )
}
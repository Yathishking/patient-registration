import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import "./signup.css"
import { usePGlite } from "@electric-sql/pglite-react";
import { redirect } from "react-router-dom";

const SignUp = () => {
    const db = usePGlite()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phoneNumber: formData.get('phoneNumber'),
            password: formData.get('password')
        };
        console.log('Form data:', data);

        db.query(`
            INSERT INTO users (first_name, last_name, email, phone_number, password, role)
            VALUES ($1, $2, $3, $4, $5, $6);
            `, [data.firstName, data.lastName,
        data.email, data.phoneNumber,
        data.password, 'patient'])
            .then((res) => {
                console.log('User registered successfully', res);
                // Redirect to home page or show success message
                redirect('/');
                localStorage.setItem('user', JSON.stringify(data));
                localStorage.setItem('role', 'patient');
                localStorage.setItem('isLoggedIn', 'true');
                
            }).catch((error) => {
                console.error('registering user', error);
            });
    };

    return (
        <div>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Typography variant="h2">Sign Up</Typography>
                <form method="post" onSubmit={handleSubmit} className="signup-form">
                    <FormControl>
                        <TextField name="firstName" label="First Name"
                            variant="outlined" required />
                    </FormControl>
                    <FormControl>
                        <TextField name="lastName" label="Last Name"
                            variant="outlined" required />
                    </FormControl>
                    <FormControl>
                        <TextField name="email" label="Email"
                            variant="outlined" required />
                    </FormControl>
                    <FormControl>
                        <TextField name="phoneNumber" label="Phone Number"
                            variant="outlined" required />
                    </FormControl>
                    <FormControl>
                        <TextField name="password" label="Password"
                            variant="outlined" required type="password" />
                    </FormControl>
                    <Button type="submit">Sign Up</Button>
                </form>
            </Box>
        </div>
    )
}

export default SignUp;
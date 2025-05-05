import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import "./signup.css"
import { usePGlite } from "@electric-sql/pglite-react";

const Register = () => {
    const db = usePGlite()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            firstName: formData.get('first_name'),
            lastName: formData.get('last_name'),
            email: formData.get('email'),
            phoneNumber: formData.get('phone_number'),
        };
        console.log('Form data:', data);

        db.query(`
            INSERT INTO users (first_name, last_name, email, phone_number, role)
            VALUES ($1, $2, $3, $4, $5);
            `, [data.firstName, data.lastName,
        data.email, data.phoneNumber,'patient'])
            .then((res) => {
                console.log('Patient registered successfully', res);
                window.location.href = '/dashboard';
            }).catch((error) => {
                console.error('registering user', error);
            });
    };

    return (
        <div>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Typography variant="h2">Register</Typography>
                <form method="post" onSubmit={handleSubmit} className="signup-form">
                    <FormControl>
                        <TextField name="first_name" label="First Name"
                            variant="outlined" required />
                    </FormControl>
                    <FormControl>
                        <TextField name="last_name" label="Last Name"
                            variant="outlined" required />
                    </FormControl>
                    <FormControl>
                        <TextField name="email" label="Email"
                            variant="outlined" required />
                    </FormControl>
                    <FormControl>
                        <TextField name="phone_number" label="Phone Number"
                            variant="outlined" required />
                    </FormControl>
                    <Button type="submit">Add Patient details</Button>
                </form>
            </Box>
        </div>
    )
}

export default Register;
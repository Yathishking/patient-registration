import { usePGlite } from "@electric-sql/pglite-react";
import { FormControl, TextField } from "@mui/material";

export default function Login() {
    const db = usePGlite()
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        };
        console.log('Form data:', data);
        
        db.query(`
            SELECT * FROM users WHERE email = $1 AND password = $2;
            `, [data.email, data.password])
            .then((res) => {
                if (res.length > 0) {
                    console.log('User logged in successfully', res);
                    // Store user data in local storage
                    localStorage.setItem('user', JSON.stringify(res[0]));
                    localStorage.setItem('role', res[0].role);
                    localStorage.setItem('isLoggedIn', 'true');
                    // Redirect to home page or show success message
                    window.location.href = '/';
                } else {
                    console.error('Invalid email or password');
                    // Show error message
                    alert('Invalid email or password');
                }
            }).catch((error) => {
                console.error('Error logging in user', error);
            });
    };

    return (

        <div>
            <h1>Login</h1>
            <form method="post" onSubmit={handleSubmit}>
                <FormControl>
                    <TextField name="email" label="Email"
                        variant="outlined" required />
                </FormControl>
                <FormControl>
                    <TextField name="password" label="Password"
                        variant="outlined" required type="password" />
                </FormControl>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
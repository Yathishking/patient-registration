import { NavLink } from "react-router-dom";

export default function Home() {
    const user = JSON.parse(localStorage.getItem('user'));
    const role = localStorage.getItem('role');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (user && role && isLoggedIn) {
        return (
            <div>
                <h1>Welcome back, {user.firstName}!</h1>
                <p>You are logged in as a {role}.</p>
                <p>Patient Detials</p>
                <p>First Name: {user.firstName}</p>
                <p>Last Name: {user.lastName}</p>
                <p>Email: {user.email}</p>
                <p>Phone Number: {user.phoneNumber}</p>
                <p>Role: {role}</p>
                <p>To log out, please click the button below.</p>
                <button onClick={() => {
                    localStorage.removeItem('user');
                    localStorage.removeItem('role');
                    localStorage.removeItem('isLoggedIn');
                    window.location.reload();
                }
                }>Log Out</button>
            </div>
        )
    }
    return (
        <div>
            <h1>Patient Registration</h1>
            <h2>Welcome to the Patient Registration System</h2>
            <p>This system allows you to register new patients and manage their information.</p>
            <p>To get started, please click on the "Sign Up" button below.</p>
            <NavLink to='/signup'>Sign Up</NavLink>
            <p>If you already have an account, please click on the "Log In" button below.</p>
            <NavLink to='/login'>Login</NavLink>
            <p>If you are an administrator, please click on the "Admin Login" button below.</p>
            <NavLink to='/admin-login'>Admin Login</NavLink>
        </div>
    )
}
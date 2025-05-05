import { usePGlite } from "@electric-sql/pglite-react";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const role = localStorage.getItem('role');
    const user = localStorage.getItem('user');
    const [patientRecords, setPatientRecords] = useState([]);

    const db = usePGlite();
    if (!isLoggedIn || isLoggedIn === null || !user) {
        // Redirect to login page if not logged in
        window.location.href = '/login';
    }
    if (role !== 'admin') {
        // Redirect to home page if not admin
        window.location.href = '/';
    }

    useEffect(() => {
        db.query(`
            SELECT * FROM users;
        `).then((res) => {
            console.log('Query result:', res);
            if (res.rows.length > 0) {
                console.log('Users:', res.rows);
                setPatientRecords(res.rows);
            }}).catch((error) => {
                console.error('Error fetching users', error);
            });
        }, [])
                


    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard!</p>
            <p>This is a protected route that only logged-in users can access.</p>
            {patientRecords.length > 0 ? (
                <ul>
                    {patientRecords.map((record) => ( 
                        <li key={record.id}>
                            {record.first_name} {record.last_name} - {record.email}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No patient records found.</p>
            )}
            <button onClick={() => {
                localStorage.removeItem('user');
                localStorage.removeItem('role');
                localStorage.removeItem('isLoggedIn');
                window.location.href = '/login';
            }
            }>Logout</button>
            <button onClick={() => {
                window.location.href = '/';
            }
            }>Home</button>
            <button onClick={() => {
                window.location.href = '/signup';
            }
            }>Sign Up</button>
        </div>
    );
}
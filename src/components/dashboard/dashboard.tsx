import { usePGlite } from "@electric-sql/pglite-react";
import { useEffect, useState } from "react";
import { PatientRecord } from "../../types/PatientRecord";
import { Box, Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Repl } from '@electric-sql/pglite-repl'



export default function Dashboard() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const role = localStorage.getItem('role');
    const user = localStorage.getItem('user');
    const [patientRecords, setPatientRecords] = useState<PatientRecord[]>([]);
    const [query, setQuery] = useState("");

    const db = usePGlite();
    if (!isLoggedIn || isLoggedIn === null || !user) {
        // Redirect to login page if not logged in
        window.location.href = '/login';
    }
    if (role !== 'admin') {
        // Redirect to home page if not admin
        window.location.href = '/';
    }

    const runQuery = async () => {
        try {
            console.log('Running query:', query);
            // Check if the query is empty
            if (query.trim() === "") {
                alert("Please enter a SQL query.");
                return;
            }
            if (query.search("\"") !== -1) {
                alert("Please use single quotes in the SQL query.");
                return;
            }
            // Execute the query
            const res = await db.query<PatientRecord>(query);
            console.log('Query result:', res);
            if (res.rows.length > 0) {
                console.log('Query result:', res.rows);
                setPatientRecords(res.rows);
            } else {
                console.log('No records found');
                setPatientRecords([]);
            }
        } catch (e) {
            console.error('Error executing query:', e);
            alert('Error executing query. Please check the SQL syntax.');
        }
    };


    useEffect(() => {
        db.query<PatientRecord>(`
            SELECT * FROM users;
        `).then((res) => {
            console.log('Query result:', res);
            if (res.rows.length > 0) {
                console.log('Users:', res.rows);
                setPatientRecords(res.rows);
            }
        }).catch((error) => {
            console.error('Error fetching users', error);
        });
    }, [db])



    return (
        <Container>
            <Typography variant="h4">Dashboard</Typography>
            <hr />
            <Typography variant="h5">Patient Records</Typography>
            <Typography variant="h6">List of tables</Typography>
            <Typography variant="h6">1. users (first_name, last_name, email, phone_number, password, role)</Typography>
            <hr /><br />
            <Typography variant="h6">Use the REPL console for SQL query</Typography>
            <Repl pg={db} /> <br />
            <Typography variant="h6">Or use the textarea below</Typography>
            <Typography variant="h6">Example: SELECT * FROM users WHERE role = 'patient';</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '80vw' }}>
                <TextareaAutosize value={query}
                    onChange={(e) => setQuery(e.target.value)} placeholder="Enter SQL..." minRows={4}
                    style={{ width: '100%', maxWidth: '600px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <Button onClick={runQuery}>Run</Button>
            </Box>
            {
                patientRecords.length > 0 ? (
                    <Container>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone Number</TableCell>
                                    <TableCell>Role</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {patientRecords.map((record) => (
                                    <TableRow key={record.id}>
                                        <TableCell>{record.first_name}</TableCell>
                                        <TableCell>{record.last_name}</TableCell>
                                        <TableCell>{record.email}</TableCell>
                                        <TableCell>{record.phone_number}</TableCell>
                                        <TableCell>{record.role}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Container>) : (<p>No patient records found.</p>)
            }
        </Container>
    );
}
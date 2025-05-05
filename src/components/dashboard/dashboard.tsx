import { usePGlite } from "@electric-sql/pglite-react";
import { useEffect, useState } from "react";
import { PatientRecord } from "../../types/PatientRecord";
import { Box, Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import TextareaAutosize from '@mui/material/TextareaAutosize';



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
            // Execute the query
            // Use parameterized queries to prevent SQL injection
            // const res = await db.query(query, []);
          const res = await db.query(query);
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
        }, [db])
                


    return (
        <Container>
            <Typography variant="h3">Dashboard</Typography>
            <hr />
            {
                patientRecords.length > 0 ? (
                    <Container>
                        <Typography variant="h4">Patient Records</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100vw' }}>
                            <TextareaAutosize value={query}
                             onChange={(e) => setQuery(e.target.value)} placeholder="Enter SQL..." minRows={4}
                             style={{width: '100%', maxWidth: '600px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
                             />
                            <Button onClick={runQuery}>Run</Button>
                            </Box>
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
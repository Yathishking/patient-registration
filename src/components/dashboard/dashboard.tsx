import { usePGlite } from "@electric-sql/pglite-react";
import { useEffect, useState } from "react";
import { PatientRecord } from "../../types/PatientRecord";
import { Box, Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Repl } from '@electric-sql/pglite-repl'
import { Route, Routes } from "react-router-dom";
import Register from "../register/register";



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
        <Routes>
            <Route path="add" element={<Register/>} />
            <Route path="*" element={ 
                        <Container>
                        <Typography variant="h4">Dashboard</Typography>
                        <hr />
                        <Box sx={{ display: 'flex',  width: '80vw', padding: 1 }}>
                            <Typography variant="h5" sx={{flexGrow: 1}}>Patient Records</Typography> 
                            <Button sx={{display: "block", }} href="/dashboard/add">Add Patient Record</Button>
                        </Box>
                        <hr />
                        <Typography>Use the REPL console for SQL query</Typography>
                        <Repl pg={db} /> <br />
                        <Typography>Or use the textarea below</Typography>
                        <Box sx={{ display: 'flex', width: '80vw' }}>
                            <TextareaAutosize value={query}
                                onChange={(e) => setQuery(e.target.value)} placeholder="Enter SQL..." minRows={2}
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
            }/>
        </Routes>

    );
}
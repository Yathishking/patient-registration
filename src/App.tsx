import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/signup/signup';
import Home from './components/home';
import { PGlite } from "@electric-sql/pglite"
import { live } from "@electric-sql/pglite/live"
import { PGliteProvider } from "@electric-sql/pglite-react"
import { useEffect } from 'react';
import Login from './components/login/login';


const db = await PGlite.create({
  extensions: { live }, 
})

function App() {
  useEffect(() => {
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone_number TEXT NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

    `).then(() => {
      console.log('Table created successfully');
    }
    ).catch((error) => {
      console.error('Error creating table:', error);
    }
    );
  }, [])

  return (
    <PGliteProvider db={db}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </PGliteProvider>
  )
}

export default App

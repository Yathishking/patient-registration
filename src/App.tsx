import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/signup/signup';
import Home from './components/home';
import { PGliteProvider } from "@electric-sql/pglite-react"
import { useEffect } from 'react';
import Login from './components/login/login';
import Dashboard from './components/dashboard/dashboard';
import { PGliteWorker } from '@electric-sql/pglite/worker';
import Navbar from './components/nav/navbar';
import { live } from '@electric-sql/pglite/live';

const db =  await PGliteWorker.create(
  new Worker(new URL('./pglite-worker.js', import.meta.url), {
    type: 'module',
  }),
  {
    extensions: {
      live,
    },
  },
)


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

      INSERT INTO users (first_name, last_name, email, phone_number, password, role)
      VALUES ('admin', 'admin', 'admin@docsys.com', '1234567890', 'admin', 'admin')
      ON CONFLICT (email) DO NOTHING;

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
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </PGliteProvider>
  )
}

export default App

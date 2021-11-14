import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Navbar from './Navbar/Navbar';
import Welcome from './authPage/Welcome';

export default function Layout() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<Navbar id="0" />} />
                    <Route path='/welcome' element={<Welcome />} />
                </Routes>
            </Router>
        </div>
    )
}

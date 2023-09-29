import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Main from './pages/Main'
import Tasks from "./pages/Tasks";

function App() {
  // const auth = useSelector((state) => state.token);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tasks/:userId/:projectId" element={<Tasks/>} />
        <Route exact path='/' element={<ProtectedRoute />}>
            <Route exact path='/main' element={<Main/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

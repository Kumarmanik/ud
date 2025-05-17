import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "./components/Login";
import Search from "./components/Search";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    axios.get("/api/auth/user", { withCredentials: true })
      .then(res => {
        setUser(res.data);
        navigate("/search");
      })
      .catch(() => navigate("/login"));
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/search" element={<Search user={user} />} />
    </Routes>
  );
}

export default App;

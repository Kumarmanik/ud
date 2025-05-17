import React, { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get("/api/search/history", { withCredentials: true })
      .then(res => setHistory(res.data));
  }, []);

  return (
    <div>
      <h3>Your Search History:</h3>
      <ul>
        {history.map((h, i) => (
          <li key={i}>{h.term} — {new Date(h.timestamp).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
};

export default History;

import React, { useEffect, useState } from "react";
import axios from "axios";

const TopBanner = () => {
  const [top, setTop] = useState([]);

  useEffect(() => {
    axios.get("/api/search/top-searches")
      .then(res => setTop(res.data));
  }, []);

  return (
    <div style={{ background: "#f0f0f0", padding: "10px" }}>
      <strong>Top Searches:</strong>
      {top.map((item, i) => (
        <span key={i} style={{ marginLeft: 10 }}>{item._id} ({item.count})</span>
      ))}
    </div>
  );
};

export default TopBanner;

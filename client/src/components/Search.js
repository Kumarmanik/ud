import React, { useState } from "react";
import axios from "axios";
import TopBanner from "./TopBanner";
import History from "./History";

const Search = ({ user }) => {
  const [term, setTerm] = useState("");
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/search/search", { term }, { withCredentials: true });
    setImages(res.data.results);
    setSelected([]);
  };

  const toggleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <TopBanner />
      <h2>Welcome, {user?.displayName}</h2>
      <form onSubmit={handleSearch}>
        <input value={term} onChange={e => setTerm(e.target.value)} placeholder="Search Unsplash..." />
        <button type="submit">Search</button>
      </form>

      <div style={{ marginTop: 10 }}>
        Selected: {selected.length} images
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
        {images.map(img => (
          <div key={img.id} style={{ position: "relative" }}>
            <img src={img.urls.thumb} alt={img.alt_description} style={{ width: "100%" }} />
            <input
              type="checkbox"
              checked={selected.includes(img.id)}
              onChange={() => toggleSelect(img.id)}
              style={{ position: "absolute", top: 5, left: 5 }}
            />
          </div>
        ))}
      </div>

      <History />
    </div>
  );
};

export default Search;

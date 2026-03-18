import { useState } from 'react';
import { recommendations } from './data'; // This imports your "database"
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = () => {
    // This is the core logic: filter the array based on the selected city
    const results = recommendations.filter(item => item.city === city);
    setFilteredData(results);
  };

  return (
    <div className="container" style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1>🇮🇩 IndoGuide 2026</h1>
      <p>Select a city to see our top recommendations.</p>

      <div style={{ marginBottom: '20px' }}>
        <select value={city} onChange={(e) => setCity(e.target.value)} style={{ padding: '10px' }}>
          <option value="">-- Select City --</option>
          <option value="Bali">Bali</option>
          <option value="Jakarta">Jakarta</option>
          <option value="Yogyakarta">Yogyakarta</option>
        </select>
        <button onClick={handleSearch} style={{ marginLeft: '10px', padding: '10px' }}>
          Find Spots
        </button>
      </div>

      <div className="results-grid" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {filteredData.map(item => (
          <div key={item.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', width: '200px' }}>
            <span style={{ fontSize: '12px', color: 'blue' }}>{item.type}</span>
            <h3>{item.name}</h3>
            <p style={{ fontSize: '14px' }}>{item.desc}</p>
          </div>
        ))}
        {filteredData.length === 0 && city !== '' && <p>No spots found for this city yet!</p>}
      </div>
    </div>
  );
}

export default App;
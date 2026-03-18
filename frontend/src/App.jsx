import { useState } from 'react'
import './App.css'

function App() {
  // These "states" store what the tourist selects
  const [days, setDays] = useState(1);
  const [city, setCity] = useState('');

  const handleSearch = () => {
    // This is where you will eventually link to your database/backend
    alert(`Planning a ${days} day trip to ${city}!`);
  };

  return (
    <div className="container">
      <h1>IndoGuide: Taiwan to Indonesia 🇮🇩</h1>
      <p>Helping Indonesian tourists explore with ease.</p>

      <div className="card">
        <h3>Plan Your Trip</h3>
        
        <label>How many days will you stay?</label>
        <input 
          type="number" 
          value={days} 
          onChange={(e) => setDays(e.target.value)} 
          min="1"
        />

        <label>Where do you want to go?</label>
        <select onChange={(e) => setCity(e.target.value)} value={city}>
          <option value="">-- Select a City --</option>
          <option value="Bali">Bali</option>
          <option value="Jakarta">Jakarta</option>
          <option value="Yogyakarta">Yogyakarta</option>
          <option value="Bandung">Bandung</option>
        </select>

        <button onClick={handleSearch} style={{ marginTop: '20px' }}>
          Get Recommendations
        </button>
      </div>
    </div>
  )
}

export default App
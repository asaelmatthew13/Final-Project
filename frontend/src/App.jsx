import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './App.css';
import { useEffect } from 'react';

// ⚠️ REPLACE THIS WITH YOUR ACTUAL API KEY FROM STEP 1
const API_KEY = "AIzaSyAxsmnL1t9gtweEaUM9TgdJa2M9HcuFqdc";
const genAI = new GoogleGenerativeAI(API_KEY);

function App() {
  const [city, setCity] = useState('');
  const [days, setDays] = useState(3);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getAIRecommendations() {
    if (!city) return alert("Please select a city!");
    
    setLoading(true);
    try {
      // Using the exact model name from your console list
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
      const prompt = `You are the concierge for LOKA, a premium travel app for Indonesia. 
      Create a ${days}-day travel itinerary for ${city}, Indonesia. 
      Return ONLY a JSON array of exactly ${days * 3} objects (3 spots per day). 
      Each object must have: "day", "type", "name", and "description".
      Do not include markdown or any text other than the JSON array.`;
  
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
  
      // Clean up any potential markdown formatting
      const jsonOnly = text.replace(/```json/g, "").replace(/```/g, "").trim();
      
      const parsedData = JSON.parse(jsonOnly);
      const grouped = parsedData.reduce((acc, item) => {
        if (!acc[item.day]) acc[item.day] = [];
        acc[item.day].push(item);
        return acc;
      }, {});

      setRecommendations(grouped);
      
    } catch (error) {
      console.error("Final Debug Error:", error);
      alert("Something went wrong. Check the console for details!");
    }
    setLoading(false);
  }

  useEffect(() => {
    document.title = "LOKA | AI TRAVEL";
  }, []);

  return (
    <div className="container">
      <h1>L O K A</h1>
      <p style={{ textAlign: 'center', color: '#888', letterSpacing: '2px', fontSize: '12px', marginBottom: '40px' }}>
        INTELLIGENT INDONESIA TRAVEL
      </p>
      
      <div className="input-group">
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">-- Choose City --</option>
          <option value="Bali">Bali</option>
          <option value="Jakarta">Jakarta</option>
          <option value="Yogyakarta">Yogyakarta</option>
          <option value="Labuan Bajo">Labuan Bajo</option>
        </select>

        <input type="number" value={days} onChange={(e) => setDays(e.target.value)} min="1" max="10" />
        
        <button onClick={getAIRecommendations} disabled={loading}>
          {loading ? "Asking AI..." : "Plan My Trip"}
        </button>
      </div>

      <div className="results" style={{ marginTop: '30px' }}>
  {Object.keys(recommendations).map((day) => (
    <details key={day} style={{ 
      marginBottom: '15px', 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      overflow: 'hidden' 
    }}>
      <summary style={{ 
        padding: '15px', 
        background: '#007bff', 
        color: 'white', 
        fontWeight: 'bold', 
        cursor: 'pointer',
        listStyle: 'none' // Hides the default arrow in some browsers
      }}>
        📅 DAY {day} (Click to expand)
      </summary>

      <div style={{ padding: '15px', background: 'white' }}>
        {recommendations[day].map((item, idx) => (
          <div key={idx} style={{ 
            padding: '10px 0', 
            borderBottom: idx === recommendations[day].length - 1 ? 'none' : '1px dashed #ccc' 
          }}>
            <strong style={{ color: '#28a745' }}>[{item.type}]</strong> {item.name}
            <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>{item.description}</p>
          </div>
        ))}
      </div>
    </details>
  ))}
</div>
    </div>
  );
}

export default App;
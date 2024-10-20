import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/population/NavigationBar';
import PopulationView from './components/population/PopulationView';

function App() {
  return (
    <Router>
      <NavigationBar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<PopulationView />} />
          <Route path="/continent/:continentName" element={<PopulationView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

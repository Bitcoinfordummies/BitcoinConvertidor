import React from 'react';
import './App.css';
import BitcoinCurrency from './bitcoin';

function App() {
  return (
    <div className="container">
      <header className="App-header">
        <h1>Bitcoin Converter</h1> 
        <BitcoinCurrency />
      </header>
    </div>
  );
}

export default App;

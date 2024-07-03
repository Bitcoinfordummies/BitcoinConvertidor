import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const BitcoinCurrency = () => {
  // Estado para almacenar la tasa de conversión
  const [cryptoRate, setCryptoRate] = useState({});
  // Estado para almacenar el monto ingresado por el usuario
  const [amount, setAmount] = useState(1);
  // Estado para almacenar la moneda seleccionada (USD o EUR)
  const [fiatCurrency, setFiatCurrency] = useState('USD');
  // Estado para almacenar el monto convertido
  const [convertedAmount, setConvertedAmount] = useState(0);

  // Hook de efecto para obtener la tasa de conversión desde la API
  useEffect(() => {
    const fetchCryptoRate = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur');
        setCryptoRate(response.data.bitcoin);
      } catch (error) {
        console.error("Error fetching the crypto rates", error);
      }
    };

    fetchCryptoRate();
  }, []);

  // Hook de efecto para actualizar el monto convertido cuando cambian el monto o la moneda seleccionada
  useEffect(() => {
    if (cryptoRate[fiatCurrency.toLowerCase()]) {
      setConvertedAmount(amount / cryptoRate[fiatCurrency.toLowerCase()]);
    }
  }, [amount, fiatCurrency, cryptoRate]);

  // Manejador para actualizar el monto ingresado
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };



  return (
    <div className="container">
      <h2>Bitcoin Exchange</h2>
      <div className="exchange-controls">
      
        <button className={fiatCurrency   === 'EUR' ? 'active' : ''} onClick={() => setFiatCurrency('EUR')}>EUR</button>
        <button className={fiatCurrency  === 'USD' ? 'active' : ''} onClick={() => setFiatCurrency('USD')}>USD</button>
      </div>
      <div className="conversion-box">
        <div className="conversion-input">
          <input type="number" value={amount} onChange={handleAmountChange} />
          <span>{fiatCurrency}</span>
        </div>
        <div className="conversion-result">
        {amount} {fiatCurrency} = {convertedAmount.toFixed(6)} BTC
        </div>
      </div>
    </div>
  );
};

export default BitcoinCurrency;

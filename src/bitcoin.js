import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';




const  BitcoinCurrency = () => {
// Estado para almacenar la tasa de converscion 
const [cryptoRate , setCryptoRate] = useState({});
// Estado para almacenar el monto ingresado por el usuario 
const [amount , setAmount] = useState(1);
// Estado para almacenar la moneda seleccionada (USD O EUR)
const [fiatCurrency , setFiatCurrency] = useState('USD');
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

},[]);

// Hook de efecto para actualizar el monto convertido cuando cambian el monto o la moneda seleccionada
useEffect(()  => {
if(cryptoRate[fiatCurrency.toLowerCase()]){

setConvertedAmount(amount / cryptoRate[fiatCurrency.toLowerCase()]);
}
}, [amount, fiatCurrency,cryptoRate]);

  // Manejador para actualizar el monto ingresado 

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

// Manejador para actualizar la moneda seleccionada. 
const handleCurrencyChange = (e) => {
setFiatCurrency(e.target.value);

};











return(
<div className="container">
<h2>Bitcoin Converter</h2>
<div>
<button value={fiatCurrency} onChange={handleCurrencyChange}>
    <option value='USD'>USD</option>
    <option value='EUR'>EUR</option>
    
    </button>
  <input type='number' value={amount} onChange={handleAmountChange} />
  
</div>
<h3>
  {amount} {fiatCurrency} = {convertedAmount.toFixed(6)} BTC
</h3>


</div>


)



}






export default BitcoinCurrency
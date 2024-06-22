import React, { useEffect, useState } from 'react';




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
















return(
<div>
<input type='number'/>
<div>
    <option value='USD'>USD</option>
    <option value='EUR'>EUR</option>
</div>



</div>


)



}






export default BitcoinCurrency
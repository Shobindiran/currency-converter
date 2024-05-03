// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useState, useEffect } from "react";

export default function App() {
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("PHP");
  const [calculatedRate, setCalculatedRate] = useState(0);
  useEffect(
    function () {
      async function fetchData() {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
        );
        const data = await res.json();
        setCalculatedRate(data.rates[toCurrency]);
      }

      if(fromCurrency===toCurrency){
        setCalculatedRate(amount)
        return
      }

      fetchData();
    },
    [amount, fromCurrency, toCurrency]
  );

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(+e.target.value)}
      />
      <select
        onChange={(e) => setFromCurrency(e.target.value)}
        value={fromCurrency}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="PHP">PHP</option>
      </select>
      <select
        onChange={(e) => setToCurrency(e.target.value)}
        value={toCurrency}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="PHP">PHP</option>
      </select>
      <p>OUTPUT</p>
      {`${amount} ${fromCurrency} to ${calculatedRate} ${toCurrency}`}
    </div>
  );
}

import React from "react";
import { Select } from "./Select";
import "./styles.css";

const endpoint = "https://api.exchangeratesapi.io/latest";
const currencies = {
  USD: "United States Dollar",
  AUD: "Australian Dollar",
  BGN: "Bulgarian Lev",
  BRL: "Brazilian Real",
  CAD: "Canadian Dollar",
  CHF: "Swiss Franc",
  CNY: "Chinese Yuan",
  CZK: "Czech Republic Koruna",
  DKK: "Danish Krone",
  GBP: "British Pound Sterling",
  HKD: "Hong Kong Dollar",
  HRK: "Croatian Kuna",
  HUF: "Hungarian Forint",
  IDR: "Indonesian Rupiah",
  ILS: "Israeli New Sheqel",
  INR: "Indian Rupee",
  JPY: "Japanese Yen",
  KRW: "South Korean Won",
  MXN: "Mexican Peso",
  MYR: "Malaysian Ringgit",
  NOK: "Norwegian Krone",
  NZD: "New Zealand Dollar",
  PHP: "Philippine Peso",
  PLN: "Polish Zloty",
  RON: "Romanian Leu",
  RUB: "Russian Ruble",
  SEK: "Swedish Krona",
  SGD: "Singapore Dollar",
  THB: "Thai Baht",
  TRY: "Turkish Lira",
  ZAR: "South African Rand",
  EUR: "Euro"
};

export default function App() {
  const [currency, setCurrency] = React.useState("USD");

  const [rate, setRate] = React.useState(null);

  const [baseCurrency, setBaseCurrency] = React.useState("USD");

  const [amount, setAmount] = React.useState(1);

  function formatCurrency(amount, currency) {
    return Intl.NumberFormat("en-US", {
      style: "currency",
      currency
    }).format(amount);
  }

  function handleSelect(event) {
    setCurrency(event.target.value);
  }

  React.useEffect(() => {
    async function fetchRates(base = baseCurrency) {
      const response = await fetch(`${endpoint}?base=${base}`);
      const rates = await response.json();
      setRate(rates);
    }

    fetchRates();
  }, [rate, baseCurrency]);

  function handleBaseSelect(event) {
    setBaseCurrency(event.target.value);
  }

  function handleChangeAmount(event) {
    setAmount(event.target.value);
  }

  return (
    <div className="App">
      <form className="App-form">
        <input
          className="App-from-amount"
          type="number"
          name="from_amount"
          value={amount}
          onChange={handleChangeAmount}
        />

        <Select
          name="from_currency"
          onChangeHandler={handleSelect}
          items={currencies}
        />
        <p>in</p>
        <Select
          name="to_currency"
          onChangeHandler={handleBaseSelect}
          items={currencies}
        />
        {rate !== null && (
          <>
            <p>is</p>
            <p className="to_amount">
              {formatCurrency(amount / rate.rates[currency], baseCurrency)}
            </p>
          </>
        )}
      </form>
    </div>
  );
}

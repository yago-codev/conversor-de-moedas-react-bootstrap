import React from "react";

export default function ListCurrencies() {
  const coins = [
    //http://fixer.io
    { initials: "AUD", describe: "Dólar australiano" },
    { initials: "BGN", describe: "Lev búlgaro" },
    { initials: "BRL", describe: "Real brasileiro" },
    { initials: "CAD", describe: "Dólar canadense" },
    { initials: "CHF", describe: "Franco suíço" },
    { initials: "CNY", describe: "Yuan Chinês" },
    { initials: "CZK", describe: "Coroa República Tcheca" },
    { initials: "DKK", describe: "Coroa dinamarquesa" },
    { initials: "EUR", describe: "Euro" },
    { initials: "GBP", describe: "Libra Esterlina" },
    { initials: "HKD", describe: "Dólar de Hong Kong" },
    { initials: "HRK", describe: "Coroa Croácia" },
    { initials: "HUF", describe: "Florim húngaro" },
    { initials: "IDR", describe: "Rupia indonésia" },
    { initials: "ILS", describe: "Novo shekel israelense" },
    { initials: "INR", describe: "Rupia indiana" },
    { initials: "JPY", describe: "Iene japonês" },
    { initials: "KRW", describe: "Won sul-coreano" },
    { initials: "MXN", describe: "Peso mexicano" },
    { initials: "MYR", describe: "Malásia Ringgit" },
    { initials: "NOK", describe: "Coroa Noruega" },
    { initials: "NZD", describe: "Dólar da Nova Zelândia" },
    { initials: "PHP", describe: "Peso filipino" },
    { initials: "PLN", describe: "Złoty Polónia" },
    { initials: "RON", describe: "Leu romeno" },
    { initials: "RUB", describe: "Belarus Ruble" },
    { initials: "SEK", describe: "Coroa Suécia" },
    { initials: "SGD", describe: "Dólar de Singapura" },
    { initials: "THB", describe: "Baht Tailândia" },
    { initials: "TRY", describe: "Lira turca" },
    { initials: "USD", describe: "Dólar dos Estados Unidos" },
    { initials: "ZAR", describe: "Rand África do Sul" },
  ];

  function compare(coin1, coin2) {
    if (coin1.describe < coin2.describe) {
      return -1;
    } else if (coin2 > coin2.describe) {
      return 1;
    }
    return 0;
  }

  return coins.sort(compare).map((coin) => (
    <option value={coin.initials} key={coin.initials}>
      {coin.describe}
    </option>
  ));
}

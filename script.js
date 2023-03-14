"use strict";

import axios from 'https://cdnjs.cloudflare.com/ajax/libs/axios/1.3.4/esm/axios.min.js';

/*
* USD https://api.nbp.pl/api/exchangerates/rates/a/usd?format=json
* EUR https://api.nbp.pl/api/exchangerates/rates/a/eur?format=json
* CHF https://api.nbp.pl/api/exchangerates/rates/a/chf?format=json
* */

const convert = async () => {
    const amountInput = document.getElementById('amount');
    const currencyInput = document.getElementById('currency');
    const result = document.getElementById('result');
    const loader = document.querySelector('#loader');
    loader.classList.toggle("hidden");
    try {
        const response = await axios.get(`https://api.nbp.pl/api/exchangerates/rates/a/${currencyInput.value}?format=json`);
        const exchangeRate = response.data.rates[0].mid;
        const formattedLocalAmount = Number(amountInput.value)
            .toLocaleString(navigator.language, {style: "currency", currency: "PLN"});
        const formattedForeignAmount = Number(Number(amountInput.value) * exchangeRate)
            .toLocaleString(navigator.language, {style: "currency", currency: currencyInput.value});
        result.textContent = `${formattedLocalAmount} = ${formattedForeignAmount}`;
        loader.classList.toggle("hidden");
    } catch (err) {

    }
};

window.convert = convert;
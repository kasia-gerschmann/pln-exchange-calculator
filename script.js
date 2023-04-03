"use strict";

import axios from 'https://cdnjs.cloudflare.com/ajax/libs/axios/1.3.4/esm/axios.min.js';


const amountInput = document.getElementById('amount');
const currencyInput = document.getElementById('currency');
const result = document.getElementById('result');
const loader = document.querySelector('#loader');
const amountError = document.querySelector('#amountError');
const convertButton = document.querySelector('#convertButton');

const convert = async () => {
    loader.classList.remove("hidden");
    try {
        const response = await axios.get(`https://api.nbp.pl/api/exchangerates/rates/a/${currencyInput.value}?format=json`);
        const exchangeRate = response.data.rates[0].mid;
        const formattedLocalAmount = Number(amountInput.value)
            .toLocaleString(navigator.language, {style: "currency", currency: "PLN"});
        const formattedForeignAmount = Number(Number(amountInput.value) / exchangeRate)
            .toLocaleString(navigator.language, {style: "currency", currency: currencyInput.value});
        result.textContent = `${formattedLocalAmount} = ${formattedForeignAmount}`;
    } catch (err) {
        prompt('Spróbuj później');
    } finally {
        loader.classList.add("hidden");
    }
};


function onAmountInput() {
    let invalid = false;
    let errorText = ``;
    let amount = document.forms["myForm"].amount.value;

    if (!amount || Number(amount) === 0) {
        invalid = true;
        errorText += `Kwota nie może być pusta!`;
    }

    if (amount < 0) {
        invalid = true;
        errorText += `Kwota nie może być ujemna!`;
    }

    if (invalid) {
        amountError.textContent = errorText;
        amountError.classList.remove("hidden");
        convertButton.classList.add("no-pointer-events");
    } else {
        amountError.textContent = ``;
        amountError.classList.add("hidden");
        convertButton.classList.remove("no-pointer-events");
    }

    result.textContent = ``;
}

function onCurrencyChange() {
    result.textContent = ``;
}

window.convert = convert;
window.onAmountInput = onAmountInput;
window.onCurrencyChange = onCurrencyChange;
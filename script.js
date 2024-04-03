// script.js

const baseUrl = 'http://localhost:3000/';
let buttonType = ''; // Seçilen butonun türünü tutacak değişken

async function fetchWords() {
    const inputParam = document.getElementById('inputParam').value.trim();
    if (inputParam === '') {
        alert('Please enter a word before submitting.');
        return;
    }

    // Seçilen butona göre istek yapılacak endpoint belirleniyor
    const endpoint = baseUrl + buttonType;
    const response = await fetch(endpoint + '/' + inputParam);
    const data = await response.json();
    displayResults(data);
}


function displayResults(results) {
    const resultsTable = document.getElementById('resultsTable');
    resultsTable.innerHTML = ''; // Önceki sonuçları temizle

    results.forEach((word, index) => {
        const col = document.createElement('div');
        col.classList.add('resultCol');
        col.textContent = word;
        resultsTable.appendChild(col);
    });
}


document.getElementById('startWithButton').addEventListener('click', function() {
    buttonType = 'WordsStartWith'; // Seçilen buton türünü belirle
});

document.getElementById('endWithButton').addEventListener('click', function() {
    buttonType = 'WordEndWith'; // Seçilen buton türünü belirle
});

document.getElementById('containsButton').addEventListener('click', function() {
    buttonType = 'Wordscontains'; // Seçilen buton türünü belirle
});

document.getElementById('submitButton').addEventListener('click', fetchWords);

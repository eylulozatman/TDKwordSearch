let buttonType = '';
let words = []; // Kelimeleri tutacak dizi

// Sayfa yüklendiğinde words.json dosyasını oku
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('words.json');
        if (!response.ok) {
            throw new Error('Failed to load words');
        }
        words = await response.json();
    } catch (error) {
        console.error('Error loading words:', error);
        alert('Failed to load word list');
    }
});

function searchWords() {
    const inputParam = document.getElementById('inputParam').value.trim().toLowerCase();
    if (inputParam === '') {
        alert('Please enter a word before submitting.');
        return;
    }

    let results = [];
    
    switch(buttonType) {
        case 'WordsStartWith':
            results = words.filter(word => word.toLowerCase().startsWith(inputParam));
            break;
        case 'WordEndWith':
            results = words.filter(word => word.toLowerCase().endsWith(inputParam));
            break;
        case 'Wordscontains':
            results = words.filter(word => word.toLowerCase().includes(inputParam));
            break;
        default:
            alert('Please select a search type');
            return;
    }

    displayResults(results);
}

function displayResults(results) {
    const resultsTable = document.getElementById('resultsTable');
    resultsTable.innerHTML = ''; // Önceki sonuçları temizle

    if (results.length === 0) {
        const col = document.createElement('div');
        col.classList.add('resultCol');
        col.textContent = 'No results found';
        resultsTable.appendChild(col);
        return;
    }

    results.forEach((word, index) => {
        const col = document.createElement('div');
        col.classList.add('resultCol');
        col.textContent = word;
        resultsTable.appendChild(col);
    });
}

// Buton event listener'ları
document.getElementById('startWithButton').addEventListener('click', function() {
    buttonType = 'WordsStartWith';
});

document.getElementById('endWithButton').addEventListener('click', function() {
    buttonType = 'WordEndWith';
});

document.getElementById('containsButton').addEventListener('click', function() {
    buttonType = 'Wordscontains';
});

document.getElementById('submitButton').addEventListener('click', searchWords);





const fs = require('fs');
function convertTxtToJson(inputFile, outputFile) {
  // Dosyayı oku
  const content = fs.readFileSync(inputFile, 'utf-8');
  
  // Satırlara ayır ve temizle
  const lines = content.split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
  
  // JSON formatına çevir
  const jsonData = JSON.stringify(lines, null, 2);
  
  // Dosyaya yaz
  fs.writeFileSync(outputFile, jsonData, 'utf-8');
  
  console.log(`Conversion complete! ${lines.length} words converted to ${outputFile}`);
}

// Kullanım
convertTxtToJson('words.txt', 'words.json');
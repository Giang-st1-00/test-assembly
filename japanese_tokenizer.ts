function splitJapanese(text: string): string[] {
  // Loại bỏ khoảng trắng thừa ở đầu và cuối
  const trimmedText = text.trim();
  
  // Tách câu thành mảng dựa trên khoảng trắng
  // Giữ lại các dấu câu và khoảng trắng trong từng phần
  const words = trimmedText.split(' ').filter(word => word.length > 0);
  
  // Gộp các từ liên tiếp nếu từ đầu không kết thúc bằng dấu câu
  const result: string[] = [];
  let currentPhrase = '';
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    
    // Nếu từ hiện tại kết thúc bằng dấu câu
    if (/[。、？！]$/.test(word)) {
      if (currentPhrase) {
        result.push(currentPhrase);
        currentPhrase = '';
      }
      result.push(word);
    }
    // Nếu từ trước đó kết thúc bằng dấu câu
    else if (i > 0 && /[。、？！]$/.test(words[i-1])) {
      currentPhrase = word;
    }
    // Gộp với từ trước đó
    else {
      if (currentPhrase) {
        currentPhrase += ' ' + word;
      } else {
        currentPhrase = word;
      }
    }
  }
  
  // Thêm phần còn lại nếu có
  if (currentPhrase) {
    result.push(currentPhrase);
  }
  
  return result;
}

// Test cases
const testCases = [
  "あ、 田中 さん、 すみ ませ ん。",
  "コンビニ に 行く ついで に、 私 の コーヒー も 買っ て き て くれ ませ ん か?",
  "今日 は とても 暑い です ね。"
];

testCases.forEach(test => {
  console.log("\nInput:", test);
  console.log("Output:", splitJapanese(test));
});

// Để sử dụng từ command line
if (process.argv.length > 2) {
  const input = process.argv.slice(2).join(' ');
  console.log("\nInput từ command line:", input);
  console.log("Output:", splitJapanese(input));
} 
function extractKanji(text: string): string[] {
  // Regex để tìm các ký tự Kanji (trong khoảng Unicode từ 4E00 đến 9FFF)
  const kanjiRegex = /[\u4E00-\u9FFF]/g;
  
  // Tìm tất cả các ký tự Kanji và chuyển thành mảng
  const kanjiChars = text.match(kanjiRegex) || [];
  
  return kanjiChars;
}

// Kiểm tra tham số đầu vào
if (process.argv.length < 3) {
  console.log('Cách sử dụng: ts-node kanji_search.ts <từ_cần_tìm>');
  console.log('Ví dụ: ts-node kanji_search.ts 食べる');
  process.exit(1);
}

const searchWord = process.argv[2];
const kanji = extractKanji(searchWord);

if (kanji.length > 0) {
  console.log(`Các chữ Kanji trong "${searchWord}":`);
  console.log(kanji.join(' '));
} else {
  console.log(`Không tìm thấy chữ Kanji trong "${searchWord}"`);
}
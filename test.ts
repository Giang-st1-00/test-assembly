import puppeteer from 'puppeteer';

async function fetchData() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('https://mazii.net/vi-VN/search/word/javi/収まる');
  const content = await page.content(); // Lấy toàn bộ HTML sau khi trang đã được render

  console.log(content);  // In nội dung của trang sau khi render xong

  await browser.close();
}

fetchData();

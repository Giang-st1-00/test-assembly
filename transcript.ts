const { AssemblyAI } = require('assemblyai');
const fs = require('fs');

const client = new AssemblyAI({
  apiKey: '02ee7688f355415397079dc3fe54bc76',
});

const FILE_URL = fs.readFileSync('./japan1.mp4');

const dataEnglish = {
  audio: FILE_URL,
  word_boost: [],
  speakers_expected: 1,
  speaker_labels: true,
  auto_chapters: true,
  auto_highlights: true,
  punctuate: true,
  format_text: true,
  dual_channel: false,
  webhook_url: null,
  boost_param: "default",
  filter_profanity: false,
  language_code: "en"
};

const dataJapanese = {
  audio: FILE_URL,
  word_boost: [],
  speakers_expected: 1,
  speaker_labels: true,
  punctuate: true,
  format_text: true,
  dual_channel: false,
  webhook_url: null,
  boost_param: "default",
  filter_profanity: false,
  language_code: "ja"
};

const transcriptEnglish = async () => {
  try {
    const transcript = await client.transcripts.transcribe(dataEnglish);
    
    let output = '';
    
    if (transcript.status !== 'completed') {
      console.log('Transcript chưa hoàn tất');
      return;
    }

    const words = transcript.words;
    let currentSentence = [];
    let startTime = null;

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      currentSentence.push(word.text);

      if (!startTime) {
        startTime = word.start;
      }

      if (word.text.includes('.') || word.text.includes('?') || i === words.length - 1) {
        const sentenceText = currentSentence.join(' ').trim();
        if (sentenceText) {
          output += `[${formatTime(startTime)} --> ${formatTime(word.end)}] ${sentenceText}\n\n`;
        }
        
        currentSentence = [];
        startTime = null;
      }
    }

    fs.writeFileSync('transcript_output.txt', output);
    console.log('Đã xuất file transcript_output.txt thành công!');
    console.log(output);
    
  } catch (error) {
    console.error('Error:', error);
  }
};

const transcriptJapanese = async () => {
  try {
    const transcript = await client.transcripts.transcribe(dataJapanese);
    
    let output = '';
    
    if (transcript.status !== 'completed') {
      console.log('Transcript chưa hoàn tất');
      return;
    }

    const words = transcript.words;
    let currentSentence = [];
    let startTime = null;

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      currentSentence.push(word.text);

      if (!startTime) {
        startTime = word.start;
      }

      if (word.text.includes('。') || 
          word.text.includes('.') || 
          word.text.includes('？') ||
          word.text.includes('!') ||
          word.text.includes('！') ||
          i === words.length - 1) {
        
        const sentenceText = currentSentence.join(' ').trim();
        if (sentenceText) {
          output += `[${formatTime(startTime)} --> ${formatTime(word.end)}] ${sentenceText}\n\n`;
        }
        
        currentSentence = [];
        startTime = null;
      }
    }

    fs.writeFileSync('transcript_output.txt', output);
    console.log('Đã xuất file transcript_output.txt thành công!');
    console.log(output);
    
  } catch (error) {
    console.error('Error:', error);
  }
};

function formatTime(ms: any) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  const remainingSeconds = seconds % 60;
  const remainingMinutes = minutes % 60;
  
  return `${padZero(hours)}:${padZero(remainingMinutes)}:${padZero(remainingSeconds)}`;
}

function padZero(num: any) {
  return num.toString().padStart(2, '0');
}

transcriptJapanese();
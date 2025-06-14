const form = document.getElementById('uploadForm');
const result = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const audioFile = document.getElementById('audioFile').files[0];
  const lang = document.getElementById('language').value;

  if (!audioFile) {
    alert('Please select an audio file.');
    return;
  }

  const formData = new FormData();
  formData.append('audio', audioFile);

  result.textContent = '⏳ Transcribing...';

  try {
    const res = await fetch(`https://google-speech-backend.onrender.com/transcribe?lang=${lang}`, {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    result.textContent = data.transcript || '❌ No transcript returned.';
  } catch (err) {
    console.error(err);
    result.textContent = '❌ Transcription error.';
  }
});

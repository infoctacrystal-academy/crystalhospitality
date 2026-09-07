const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

function readData() {
  if (!fs.existsSync(DATA_FILE)) {
    const initialData = { vacancies: [], inquiries: [] };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/vacancies', (req, res) => {
  const data = readData();
  res.json(data.vacancies.filter(v => v.active));
});

app.post('/api/inquiries', (req, res) => {
  const { name, email, department, message } = req.body;
  if (!name || !email || !department || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required.' });
  }

  const data = readData();
  const newInquiry = {
    id: Date.now(),
    name,
    email,
    department,
    message,
    created_at: new Date().toISOString()
  };

  data.inquiries.push(newInquiry);
  writeData(data);

  res.json({ success: true, message: 'Inquiry saved successfully!', id: newInquiry.id });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

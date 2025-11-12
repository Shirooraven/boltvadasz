import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

app.get('/products/tesco', (req, res) => {
const filePath = path.join(__dirname, 'data', 'tescoProducts.json');
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    res.json(JSON.parse(data));
  } else {
    res.status(404).json({ error: 'Nincs termékadat.' });
  }
});


app.listen(PORT, () => {
  console.log(`✅ Szerver elindult: http://localhost:${PORT}`);
});

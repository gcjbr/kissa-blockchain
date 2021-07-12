import express from 'express';
import Blockchain from './Blockchain';

const PORT = process.env.PORT || 3001;

const app = express();
const blockchain = new Blockchain();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/blocks', (req, res) => {
  res.json(blockchain.chain);
});

app.post('/mine', (req, res) => {
  const block = blockchain.addBlock(req.body.data);
  console.log(`🧱 New block added: ${block.toSring()}`);
  res.redirect('/blocks');
});

app.listen(PORT, () => console.log(`🦻 Listening on port ${PORT}`));

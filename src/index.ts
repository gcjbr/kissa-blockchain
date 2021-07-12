import express from 'express';
import Blockchain from './Blockchain';
import P2pServer from './P2pServer';

const PORT = process.env.PORT || 3001;

const app = express();
const blockchain = new Blockchain();
const p2pServer = new P2pServer(blockchain);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/blocks', (req, res) => {
  res.json(blockchain.chain);
});

app.post('/mine', (req, res) => {
  const block = blockchain.addBlock(req.body.data);
  console.log(`🧱 New block added: ${block.toSring()}`);
  p2pServer.syncChains();
  res.redirect('/blocks');
});

app.listen(PORT, () => console.log(`🦻 Listening on port ${PORT}`));
p2pServer.listen();

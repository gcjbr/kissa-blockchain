import { log } from 'console';
import Websocket from 'ws';
import Blockchain from './Blockchain';

const P2P_PORT = process.env.P2P_PORT ? parseInt(process.env.P2P_PORT) : 5000;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

interface P2pServer {
  blockchain: Blockchain;
  sockets: Array<Websocket>;
}

class P2pServer {
  constructor(blockchain: Blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
  }

  listen(): void {
    const server = new Websocket.Server({ port: P2P_PORT });
    server.on('connection', (socket) => this.connectSocket(socket));
    this.connectToPeers();
    console.log(`🦻 Listening for P2P connections on ${P2P_PORT}`);
  }

  connectSocket(socket: Websocket): void {
    this.sockets.push(socket);
    console.log('⚡️ Socket connected');

    this.messageHandler(socket);
    this.sendChain(socket);
  }

  connectToPeers(): void {
    peers.forEach((peer) => {
      const socket = new Websocket(peer);
      socket.on('open', () => this.connectSocket(socket));
    });
  }

  messageHandler(socket: Websocket): void {
    socket.on('message', (message) => {
      const data = JSON.parse(message.toString());
      this.blockchain.replaceChain(data);
    });
  }

  syncChains(): void {
    this.sockets.forEach((socket) => {
      this.sendChain(socket);
    });
  }

  sendChain(socket: Websocket): void {
    socket.send(JSON.stringify(this.blockchain.chain));
  }
}

export default P2pServer;

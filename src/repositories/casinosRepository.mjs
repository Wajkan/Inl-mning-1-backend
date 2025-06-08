import crypto from 'crypto';
import { blockchain } from '../server.mjs';

export default class CasinoRepository {

    async listAll() {

        await blockchain.initialize();
        return blockchain.chain;

    }

    async findById(id) {

        await blockchain.initialize();
        return blockchain.chain.find((block) => block.id === id);

    }

    async add(casino) {
          
          await blockchain.initialize();
          casino.id = crypto.randomUUID().replaceAll('-', '');
          await blockchain.addBlock({ data: casino });
          return blockchain.chain;

    }

}
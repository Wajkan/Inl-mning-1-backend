import Block from "../block/Block.mjs";
import Storage from "../../utilities/Storage.mjs";


export default class Blockchain {

    #storage = undefined;

    constructor() {

        this.#storage = new Storage('data', 'casinos.json');
        this.chain = [Block.genesis()];

    }

   async initialize () {

        await this.loadFromStorage();

   }

   async addBlock(data) {

        const newBlock = Block.createBlock ({  
            previousBlock: this.chain.at(-1), 
            data: data 
        });


        this.chain.push(newBlock);
        await this.saveToStorage();

    }


    async loadFromStorage () {

        try {

            const data = await this.#storage.readFromFile();

             if (data && 
                data.chain &&
                Array.isArray(data.chain) &&
                data.chain.length > 0 
            ) {

                this.chain = data.chain;
             
            } else {

            this.chain = [Block.genesis()];

            }

        } catch (error) {

            console.error('Error loading blockchain from storage', error)
            this.chain = [Block.genesis()]

        }

    }

    async saveToStorage () {

        const data = { 

            chain: this.chain,
            length: this.chain.length,
            lastUpdated: new Date().toISOString()

        };

        await this.#storage.writeToFile(JSON.stringify(data, null, 2));

    }
}
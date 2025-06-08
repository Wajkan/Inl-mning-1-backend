import { describe, expect, it } from 'vitest';
import Block from './Block.mjs';
import { GENESIS_BLOCK } from './genesis.mjs';
import { MINE_RATE } from '../../utilities/blockConfig.mjs';


describe('Block', () => {
 
  const timestamp = 2000; 
  const currentHash = 'current-hash';
  const lastHash = 'prev-hash';
  const data = [1, 2, 3, 4, 5];
  const nonce = 1;
  const difficulty = 1;
 
  const block = new Block({
    hash: currentHash,
    timestamp,
    lastHash,
    data,
    nonce,
    difficulty,
  });

  describe('should have the correct properties', () => {
    it('should have a timestamp property', () => {
      expect(block).toHaveProperty('timestamp');
    });

    it('should have a hash property', () => {
      expect(block).toHaveProperty('hash');
    });

    it('should have a data property', () => {
      expect(block).toHaveProperty('data');
    });

    it('should have a nonce property', () => {
      expect(block).toHaveProperty('nonce');
    });

    it('should have a difficulty property', () => {
      expect(block).toHaveProperty('difficulty');
    });
    
  });

  describe('genesis() function', () => {

    const genesisBlock = Block.genesis();

    it('should return the genesis data', () => {
      expect(genesisBlock).toEqual(GENESIS_BLOCK);
    });

  });


  describe('Adjust the difficulty level', () => {
    it('should raise the difficulty level for a quickly mined block', () => {
      expect(
        Block.adjustDifficultyLevel({
          block,
          timestamp: block.timestamp + MINE_RATE - 100,
        })
      ).toEqual(block.difficulty + 1);
    });

    it('should lower the difficulty level for a slowly mined block', () => {
      expect(
        Block.adjustDifficultyLevel({
          block,
          timestamp: block.timestamp + MINE_RATE + 100,
        })
      ).toEqual(block.difficulty - 1);
    });

    it('should have a lower limit of 1 for difficulty level', () => {
      block.difficulty = -1;
      expect(Block.adjustDifficultyLevel({ block })).toEqual(1);
    });
  });
});

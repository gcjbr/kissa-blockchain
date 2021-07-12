import Block from './Block';

const fooBlock = Block.mineBlock(Block.genesis(), ['foo']);
console.log(fooBlock);

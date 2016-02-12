import { expect } from 'chai';
import { el } from '../src/dom';

describe('el', function() {
  it('should properly transform to json template', function() {
    const element = el('div', '.test', 'Content');

    expect(element).to.be.ok;
    expect(element).to.deep.equal([
      'div',
      { class: 'test' },
      'Content',
    ]);
  });

  it('should get the default values no argument is given', function() {
    const element = el();

    expect(element).to.deep.equal([
      'div',
      {},
      '',
    ]);
  });
});
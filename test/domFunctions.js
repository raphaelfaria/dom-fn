import { expect } from 'chai';
import { el } from '../src/lib/domFunctions';

describe('el', function () {
  it('should properly transform to json template', function () {
    const element = el('div', '.test', 'Content');

    const attributesResult = {
      class: 'test',
    };

    expect(element).to.be.ok;
    expect(element.tagName).to.be.equal('div');
    expect(element.attributes).to.deep.equal(attributesResult);
    expect(element.children).to.be.equal('Content');
  });

  it('should get the default values no argument is given', function () {
    const element = el();

    expect(element).to.be.ok;
    expect(element.tagName).to.be.equal('div');
    expect(element.attributes).to.deep.equal({});
    expect(element.children).to.be.equal('');
  });

  it('should use defaults if only children array is given', function () {
    const element = el([
      el('div', {}, 'test'),
    ]);

    expect(element.tagName).to.be.equal('div');
    expect(element.attributes).to.deep.equal({});
  });
});

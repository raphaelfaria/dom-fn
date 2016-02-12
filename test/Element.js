import chai, { expect } from 'chai';
import spies from 'chai-spies';
import Element from '../src/lib/Element';

chai.use(spies);

describe('Element', function() {
  this.timeout(5000);
  let jsdom;

  before(function () {
    jsdom = require('jsdom-global')();
  });

  after(function () {
    jsdom();
  });

  it('should construct properly', function() {
    const elm = new Element('div', { class: 'test' }, 'Child');

    expect(elm).to.be.instanceof(Element);
    expect(elm.tagName).to.be.a('string');
    expect(elm.attributes).to.be.an('object');
    expect(elm.children).to.be.a('string');
  });

  it('should compile to a DOM element', function() {
    const elm = new Element('div', { class: 'test' }, 'Child');

    const domElm = elm.compile();

    expect(domElm.nodeName).to.be.equal('DIV');
  });

  it('should call compile in all children', function() {
    const child = new Element('div', { class: 'child' }, 'Child');
    const elm = new Element('div', { class: 'test' }, [child]);

    const spy = chai.spy.on(child, 'compile');

    elm.compile();

    expect(spy).to.have.been.called.once;
  });

  it('should add children to main node', function() {
    const elm = new Element('div', { class: 'test' }, 'Child');
    const compiledElm = elm.compile();

    expect(compiledElm.childNodes.length).to.be.equal(1);
    expect(compiledElm.childNodes[0].textContent).to.contain('Child');
  });
});

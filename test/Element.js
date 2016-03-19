import chai, { expect } from 'chai';
import spies from 'chai-spies';
import Element from '../src/lib/Element';

chai.use(spies);

describe('Element', function () {
  this.timeout(5000);
  let jsdom;

  before(function () {
    jsdom = require('jsdom-global')();
  });

  after(function () {
    jsdom();
  });

  it('should construct properly', function () {
    const elm = new Element('div', { class: 'test' }, 'Child');

    expect(elm).to.be.instanceof(Element);
    expect(elm.tagName).to.be.a('string');
    expect(elm.attributes).to.be.an('object');
    expect(elm.children).to.be.a('string');
  });

  it('should compile to a DOM element', function () {
    const elm = new Element('div', { class: 'test' }, 'Child');

    const domElm = elm.compile();

    expect(domElm.nodeName).to.be.equal('DIV');
  });

  it('should call compile in all children', function () {
    const child = new Element('div', { class: 'child' }, 'Child');
    const elm = new Element('div', { class: 'test' }, [child]);

    const spy = chai.spy.on(child, 'compile');

    elm.compile();

    expect(spy).to.have.been.called.once;
  });

  it('should add children to main node', function () {
    const elm = new Element('div', { class: 'test' }, 'Child');
    const compiledElm = elm.compile();

    expect(compiledElm.childNodes.length).to.be.equal(1);
    expect(compiledElm.childNodes[0].textContent).to.contain('Child');
  });

  it('should be able to use variables', function () {
    const elm = new Element('div', { class: 'test' }, function(attr) {
      return attr.value;
    });

    const compiledElm = elm.compile({ value: 'Variable test' });

    expect(compiledElm.childNodes[0].textContent).to.contain('Variable test');
  });

  it('should be able to use numbers in variables', function () {
    const elm = new Element('div', { class: 'test' }, function(attr) {
      return attr.value;
    });

    const compiledElm = elm.compile({ value: 10 });

    expect(compiledElm.childNodes[0].textContent).to.contain('10');
  });

  it('should be able to add numbers as props (transformed into strings)', function () {
    const elm = new Element('div', { 'data-bind': 10 });

    const compiledElm = elm.compile();

    expect(compiledElm.attributes['data-bind'].value).to.be.equal('10');
  });

  it('should not allow NaN or Infinity as props', function () {
    expect(() => (new Element('div', { 'data-bind': NaN }).compile())).to.throw(Error);
  });
});

import { expect } from 'chai';
import { getId, getClass, idClassParser } from '../src/helpers/idClassParser';

describe('idClassParser', function () {
  it('should get the id', function () {
    const ids = '#id1';

    expect(getId(ids)).to.be.equal('id1');
  });

  it('should get only the last id', function () {
    const ids = '#id1#id2';

    expect(getId(ids)).to.be.equal('id2');
  });

  it('should fail if selector is wrong', function () {
    expect(() => getId('#ids .asf')).to.throw(Error, /invalid selector/i);
  });

  it('should get array of classes', function () {
    const classesResult = [
      'class1',
      'class2',
    ];

    const classesSelector = '.class1.class2';

    expect(getClass(classesSelector)).to.be.deep.equal(classesResult);
  });

  it('should get ids and classes', function () {
    const selector = '#id.class1.class2';
    const result = {
      id: 'id',
      class: 'class1 class2',
    };

    expect(idClassParser(selector)).to.be.deep.equal(result);
  });
});

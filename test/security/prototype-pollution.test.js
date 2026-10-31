const assert = require('node:assert/strict');
const test = require('node:test');
const { accountTotals, byAccount, digestRow, formatDigest } = require('../../src/index.js');

test('a __proto__ account name must not reach Object.prototype', () => {
  try {
    byAccount(JSON.parse('[{"account":"__proto__","rfSecGroupBy":"PWN"}]'));
    assert.equal({}.rfSecGroupBy, undefined);
  } finally {
    delete Object.prototype.rfSecGroupBy;
  }
});

test('a constructor account name must not reach Object.prototype', () => {
  try {
    byAccount(JSON.parse('[{"account":"constructor","rfSecCtor":"PWN"}]'));
    assert.equal({}.rfSecCtor, undefined);
  } finally {
    delete Object.prototype.rfSecCtor;
  }
});

test('accountTotals must not let a __proto__ account name reach Object.prototype', () => {
  try {
    accountTotals(JSON.parse('[{"account":"__proto__","amount":5,"rfSecTotals":"PWN"}]'));
    assert.equal({}.rfSecTotals, undefined);
  } finally {
    delete Object.prototype.rfSecTotals;
  }
});

test('digestRow must not let an own __proto__ key on a row reach Object.prototype', () => {
  try {
    digestRow(JSON.parse('{"account":"a","amount":1,"__proto__":{"rfSecPick":"PWN"}}'));
    assert.equal({}.rfSecPick, undefined);
  } finally {
    delete Object.prototype.rfSecPick;
  }
});

test('formatDigest must not let a hostile account name reach Object.prototype', () => {
  try {
    formatDigest(JSON.parse('[{"account":"__proto__","amount":2,"rfSecDigest":"PWN"},{"account":"x","amount":9}]'));
    assert.equal({}.rfSecDigest, undefined);
  } finally {
    delete Object.prototype.rfSecDigest;
  }
});

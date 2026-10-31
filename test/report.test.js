const assert = require('node:assert/strict');
const test = require('node:test');
const { accountTotals, biggestFirst, byAccount, digestRow, formatDigest } = require('../src/index.js');

const rows = [
  { account: 'acme', amount: 10, internal: true },
  { account: 'globex', amount: 25 },
  { account: 'acme', amount: 5 },
];

test('byAccount groups rows', () => {
  assert.deepEqual(Object.keys(byAccount(rows)).sort(), ['acme', 'globex']);
});

test('accountTotals sums per account', () => {
  assert.deepEqual(accountTotals(rows), { acme: 15, globex: 25 });
});

test('biggestFirst sorts by amount descending', () => {
  assert.deepEqual(biggestFirst(rows).map((r) => r.amount), [25, 10, 5]);
});

test('digestRow drops internal fields', () => {
  assert.deepEqual(digestRow(rows[0]), { account: 'acme', amount: 10 });
});

test('formatDigest renders one line per row', () => {
  assert.equal(formatDigest(rows), 'globex: 25\nacme: 10\nacme: 5');
});

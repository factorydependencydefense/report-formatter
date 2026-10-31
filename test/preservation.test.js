const assert = require('node:assert/strict');
const test = require('node:test');
const { accountTotals, biggestFirst, byAccount, digestRow, formatDigest } = require('../src/index.js');

const rows = [
  { account: 'acme', amount: 10, internal: true },
  { account: 'globex', amount: 25 },
  { account: 'acme', amount: 5 },
];

test('byAccount buckets every row under its account', () => {
  assert.deepEqual(byAccount(rows), {
    acme: [
      { account: 'acme', amount: 10, internal: true },
      { account: 'acme', amount: 5 },
    ],
    globex: [{ account: 'globex', amount: 25 }],
  });
});

test('accountTotals sums per account and treats a missing amount as zero', () => {
  assert.deepEqual(accountTotals(rows), { acme: 15, globex: 25 });
  assert.deepEqual(accountTotals([{ account: 'acme' }, { account: 'acme', amount: 2 }]), { acme: 2 });
});

test('biggestFirst returns the whole row list ordered by amount descending', () => {
  assert.deepEqual(biggestFirst(rows), [
    { account: 'globex', amount: 25 },
    { account: 'acme', amount: 10, internal: true },
    { account: 'acme', amount: 5 },
  ]);
});

test('digestRow keeps only the account and amount', () => {
  assert.deepEqual(digestRow(rows[0]), { account: 'acme', amount: 10 });
  assert.deepEqual(digestRow({ account: 'acme', secret: 'x' }), { account: 'acme' });
});

test('formatDigest renders one line per row, biggest first', () => {
  assert.equal(formatDigest(rows), 'globex: 25\nacme: 10\nacme: 5');
  assert.equal(formatDigest([]), '');
});

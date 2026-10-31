const groupBy = require('lodash/groupBy');
const pick = require('lodash/pick');
const sortBy = require('lodash/sortBy');
const sum = require('lodash/sum');

function byAccount(rows) {
  return groupBy(rows, 'account');
}

function accountTotals(rows) {
  return Object.fromEntries(
    Object.entries(byAccount(rows)).map(([account, accountRows]) => [
      account,
      sum(accountRows.map((row) => row.amount ?? 0)),
    ]),
  );
}

function biggestFirst(rows) {
  return sortBy(rows, (row) => -(row.amount ?? 0));
}

function digestRow(row) {
  return pick(row, ['account', 'amount']);
}

function formatDigest(rows) {
  return biggestFirst(rows)
    .map(digestRow)
    .map((row) => `${row.account}: ${row.amount}`)
    .join('\n');
}

module.exports = { byAccount, accountTotals, biggestFirst, digestRow, formatDigest };

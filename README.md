# report-formatter

Formats usage reports for the weekly digest. Part of the dependency-defense demo fleet.

```bash
npm ci
npm test
npm run build
```

## Tests

`npm test` runs `test/*.test.js`: `test/report.test.js` plus `test/preservation.test.js`, which pin the
whole grouped, totalled, sorted and rendered output for legitimate usage rows. They must stay green
across a lodash upgrade, so a remediation PR can use them as proof it changed no behaviour.

There is no characterization suite here, because no vulnerable behaviour is observable through this
package's API (see below).

`npm run test:security` runs `test/security/**/*.test.js` and is deliberately **not** part of
`npm test`. It asserts that untrusted account names on usage rows cannot reach `Object.prototype`.

All 5 security tests are **green today**. The advisory against the pinned lodash version is real, but
this package only uses `groupBy`, `pick`, `sortBy` and `sum`. `groupBy` writes a hostile `__proto__`
group as an own key rather than walking into the prototype, and `pick` only copies out. These tests
exist to document the invariant and catch a regression if the formatter starts using a deep-write
lodash function such as `set` or `merge`.

What these tests do **not** cover: the planted unused dependencies (`chalk`, `moment`, `underscore`),
the bundled `dist/index.js`, dynamic `require`, and any network or filesystem path.

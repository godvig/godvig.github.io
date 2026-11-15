import assert from 'node:assert/strict';
import { test } from 'node:test';
import { campaignQuery, countUrl, outsideReferrer, skipReason } from './counter.js';

const visitor = { host: 'adamenglund.eu', doNotTrack: false, automated: false, framed: false, prerendering: false };
const visit = { host: 'adamenglund.eu', path: '/sv/', title: 'Adam Englund', referrer: '', search: '', screenWidth: 1440 };
const sent = (v) => new URL(countUrl(v, 'abcde')).searchParams;

test('counts an ordinary visitor on the published site', () => {
  assert.equal(skipReason(visitor), null);
});

test('counts nothing from localhost, a fork or a look-alike host', () => {
  for (const host of ['localhost:5173', 'someone.github.io', 'adamenglund.eu.example.com']) {
    assert.equal(skipReason({ ...visitor, host }), 'not the published site');
  }
});

test('respects Do Not Track and skips robots, frames and prerenders', () => {
  assert.match(skipReason({ ...visitor, doNotTrack: true }), /not to be tracked/);
  assert.equal(skipReason({ ...visitor, automated: true }), 'automated browser');
  assert.equal(skipReason({ ...visitor, framed: true }), 'inside a frame');
  assert.equal(skipReason({ ...visitor, prerendering: true }), 'prerendering');
});

test('sends the site and path, the title, the screen width and a cache buster, and nothing else', () => {
  const q = sent(visit);
  assert.ok(countUrl(visit, 'abcde').startsWith('https://godvig.goatcounter.com/count?'));
  assert.equal(q.get('p'), 'adamenglund.eu/sv/');
  assert.equal(q.get('t'), 'Adam Englund');
  assert.equal(q.get('s'), '1440');
  assert.deepEqual([...q.keys()].sort(), ['p', 'rnd', 's', 't']);
});

test('passes on campaign parameters but no other part of the query string', () => {
  assert.equal(campaignQuery('?fbclid=abc&x=1'), '');
  assert.equal(sent({ ...visit, search: '?utm_source=linkedin&token=SECRET' }).get('q'), '?utm_source=linkedin');
  assert.ok(!countUrl({ ...visit, search: '?token=SECRET' }, 'abcde').includes('SECRET'));
});

test('reports another site as referrer without its query string, and never this site', () => {
  assert.equal(outsideReferrer('https://www.linkedin.com/feed/?trk=abc', 'adamenglund.eu'), 'https://www.linkedin.com/feed/');
  assert.equal(outsideReferrer('android-app://com.linkedin.android', 'adamenglund.eu'), 'android-app://com.linkedin.android');
  assert.equal(outsideReferrer('https://adamenglund.eu/', 'adamenglund.eu'), '');
  assert.equal(outsideReferrer('', 'adamenglund.eu'), '');
});

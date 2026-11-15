// Anonymous visit counting with GoatCounter (https://www.goatcounter.com), through its documented /count endpoint.
//
// No script is loaded from another server. One request per page load carries exactly five things:
//   the page (site + path, never anything after ? or #), the page title, the site the visitor came from,
//   the screen width, and a campaign tag if the link carried one (utm_source, ref…).
// No cookies are set and nothing is saved in the browser. Nothing is sent from other hosts (forks, localhost),
// from automated browsers, or when the browser asks not to be tracked.

const ENDPOINT = 'https://godvig.goatcounter.com/count';
/** Only the published site is counted, so a fork or a local copy never reports to this account. */
const COUNTED_HOST = 'adamenglund.eu';
/** The only query parameters that are passed on: GoatCounter reads the campaign and its source from them. */
const CAMPAIGN_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'ref'];

/**
 * Why this page view is not counted, or null when it is.
 * @param {{ host: string, doNotTrack: boolean, automated: boolean, framed: boolean, prerendering: boolean }} b
 */
export function skipReason(b) {
  if (b.host !== COUNTED_HOST) return 'not the published site';
  if (b.doNotTrack) return 'the browser asks not to be tracked';
  if (b.automated) return 'automated browser';
  if (b.framed) return 'inside a frame';
  if (b.prerendering) return 'prerendering';
  return null;
}

/** The campaign parameters of a query string, as a new query string ("" when there are none). */
export function campaignQuery(search) {
  const all = new URLSearchParams(search);
  const kept = new URLSearchParams();
  for (const name of CAMPAIGN_PARAMS) {
    const value = all.get(name);
    if (value) kept.set(name, value);
  }
  const query = kept.toString();
  return query ? `?${query}` : '';
}

/** A referrer worth reporting: another site's address, without its query string or fragment. */
export function outsideReferrer(referrer, host) {
  try {
    const url = new URL(referrer);
    // Built from its parts instead of url.origin, which is "null" for app links such as android-app://org.telegram.messenger.
    return url.host === host ? '' : `${url.protocol}//${url.host}${url.pathname}`;
  } catch {
    return '';
  }
}

/**
 * The request that counts one page view. `rnd` only stops browsers and proxies from caching it.
 * @param {{ host: string, path: string, title: string, referrer: string, search: string, screenWidth: number }} v
 * @param {string} rnd
 */
export function countUrl(v, rnd) {
  const params = new URLSearchParams({ p: `${v.host}${v.path}`, t: v.title });
  if (v.referrer) params.set('r', v.referrer);
  const campaign = campaignQuery(v.search);
  if (campaign) params.set('q', campaign);
  params.set('s', String(v.screenWidth));
  params.set('rnd', rnd);
  return `${ENDPOINT}?${params}`;
}

/** Count one view of `path` ("/" or "/sv/"). */
export function countView(path) {
  const reason = skipReason({
    host: location.host,
    doNotTrack: navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true,
    automated: navigator.webdriver === true,
    framed: window.self !== window.top,
    prerendering: document.prerendering === true,
  });
  if (reason) return;

  const url = countUrl(
    {
      host: location.host,
      path,
      title: document.title,
      referrer: outsideReferrer(document.referrer, location.host),
      search: location.search,
      screenWidth: window.screen.width,
    },
    Math.random().toString(36).slice(2, 7),
  );
  // sendBeacon survives the page closing; an image request is the fallback where it is unavailable or refused.
  if (!navigator.sendBeacon?.(url)) new Image().src = url;
}

import { CONSENT_STORAGE_KEY } from './storage'

// Plain module (not 'use client') so the server layout can inline the head script.

export const GTM_ID = 'GTM-N82CQNLG'

// Fired by the footer's "Cookie settings" link; the banner listens for it and opens again.
export const OPEN_CONSENT_EVENT = 'mythos:consent-settings'

export enum ConsentChoice {
  Granted = 'granted',
  Denied = 'denied',
}

/**
 * Runs in <head> before first paint. Consent Mode starts with everything denied, and Tag Manager is not even
 * requested until the visitor accepts (basic consent mode): no request reaches Google before a yes.
 * `window.mythosLoadGtm` lets the banner load it later without a reload.
 */
export const ANALYTICS_HEAD_SCRIPT = `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments)}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});
window.mythosLoadGtm=function(){
  if(window.mythosGtmLoaded)return;window.mythosGtmLoaded=true;
  gtag('consent','update',{analytics_storage:'granted'});
  dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});
  var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtm.js?id=${GTM_ID}';
  document.head.appendChild(s);
};
try{if(localStorage.getItem('${CONSENT_STORAGE_KEY}')==='${ConsentChoice.Granted}')window.mythosLoadGtm()}catch(e){}
`

declare global {
  interface Window {
    mythosLoadGtm?: () => void
  }
}

export function readConsent(): ConsentChoice | null {
  try {
    const value = localStorage.getItem(CONSENT_STORAGE_KEY)
    return value === ConsentChoice.Granted || value === ConsentChoice.Denied ? value : null
  } catch {
    return null
  }
}

/** Saves the choice. Granting loads Tag Manager now; withdrawing deletes GA cookies and reloads, since a loaded GTM cannot be unloaded. */
export function saveConsent(choice: ConsentChoice): void {
  const wasGranted = readConsent() === ConsentChoice.Granted
  try { localStorage.setItem(CONSENT_STORAGE_KEY, choice) } catch { /* private mode: the choice lasts for this page only */ }
  if (choice === ConsentChoice.Granted) {
    window.mythosLoadGtm?.()
    return
  }
  if (!wasGranted) return
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0].trim()
    if (name === '_ga' || name.startsWith('_ga_')) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname.replace(/^www\./, '')}`
      document.cookie = `${name}=; Max-Age=0; path=/`
    }
  }
  location.reload()
}

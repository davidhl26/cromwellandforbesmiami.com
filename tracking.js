/* ============================================================
   PUB PAYANTE — tags de conversion (Google Ads + Meta Pixel)
   Remplir les identifiants au lancement des campagnes.
   Vides = AUCUN script chargé, la page reste 100 % légère.
   La conversion (« Lead ») se déclenche sur merci.html.
   ============================================================ */
const TRACKING = {
  googleAdsId: 'AW-18408844638', // balise Google Ads (installée 09/09/2026)
  googleConvLabel: '', // ex. 'AbCdEfGhIjK' — étiquette de l'action de conversion « Lead »
  metaPixelId: ''      // ex. '1234567890'  — Meta Events Manager → Pixel
};

(function () {
  const isMerci = /merci\.html$/.test(location.pathname);

  /* ---- Google Ads (gtag.js) ---- */
  if (TRACKING.googleAdsId) {
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + TRACKING.googleAdsId;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', TRACKING.googleAdsId);
    if (isMerci && TRACKING.googleConvLabel) {
      window.gtag('event', 'conversion', { send_to: TRACKING.googleAdsId + '/' + TRACKING.googleConvLabel });
    }
  }

  /* ---- Meta Pixel ---- */
  if (TRACKING.metaPixelId) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', TRACKING.metaPixelId);
    window.fbq('track', 'PageView');
    if (isMerci) window.fbq('track', 'Lead');
  }
})();

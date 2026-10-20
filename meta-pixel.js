/* Meta Pixel (BRO-128; decisions.md Product and marketing, Oct 20). Loaded ONLY by the home page (also /official),
   /about and /cover; never by /terms or /privacy, and the app, login and checkout live on another host.
   PageView on load, and one custom event, TextBro, when someone taps any sms: link ("Text Bro", "Let's go", "Start
   free"), fired before the Messages app opens. Never any user data: init passes no advanced-matching fields, and
   autoConfig is off (no automatic button, form or page metadata). The ID is public. */
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('set', 'autoConfig', false, '1144988201435478');
fbq('init', '1144988201435478');
fbq('track', 'PageView');
document.addEventListener('click', function (e) {
  var a = e.target && e.target.closest ? e.target.closest('a[href^="sms:"]') : null;
  if (a && window.fbq) fbq('trackCustom', 'TextBro');
}, true);

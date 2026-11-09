// check-legal.mjs (BRO-052): pins for the Google Calendar text in privacy.html and terms.html.
// The site has no build step; run by hand before pushing a legal edit:  node scripts/check-legal.mjs
import { readFileSync } from "node:fs";
const page = (f) => readFileSync(new URL(`../${f}`, import.meta.url), "utf8");
const privacy = page("privacy.html"), terms = page("terms.html");
let failed = 0;
const pin = (label, ok) => { console.log(`${ok ? "PASS" : "FAIL"}  ${label}`); if (!ok) failed++; };

const gcal = privacy.indexOf("<h2>Google Calendar</h2>"), providers = privacy.indexOf("<h2>Service providers</h2>"), ads = privacy.indexOf("<h2>Advertising on our website</h2>");
pin("privacy: the Google Calendar h2 sits after Advertising and before Service providers", ads !== -1 && gcal > ads && providers > gcal);
const section = privacy.slice(gcal, providers);
pin("privacy: the Limited Use sentence verbatim, with its link",
  section.includes(`<p>Texts From Bro's use and transfer to any other app of information received from Google APIs will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy">Google API Services User Data Policy</a>, including the Limited Use requirements.</p>`));
pin('privacy: "without asking you first"', section.includes("without asking you first"));
pin('privacy: "disconnect my calendar"', section.includes('"disconnect my calendar"'));
pin("privacy: Information we collect points at the section",
  privacy.includes(`of your payment card from our payment processor. If you connect Google Calendar, we also collect the calendar information described under "Google Calendar".</p>`));
const calTerms = /<p>If you connect Google Calendar,[^<]*<\/p>/.exec(terms)?.[0] ?? "";
pin('terms: the Service paragraph names "Google Calendar is a trademark of Google LLC"', calTerms.includes("Google Calendar is a trademark of Google LLC."));
pin("terms: it sits after \"These are off by default.\" and before the US/Canada paragraph",
  terms.indexOf("These are off by default.</p>") < terms.indexOf(calTerms) && terms.indexOf(calTerms) < terms.indexOf("The service is offered only to users with a United States or Canadian mobile number"));
const added = section + calTerms + 'If you connect Google Calendar, we also collect the calendar information described under "Google Calendar".';
pin("no em or en dashes in the new text", !/[–—]/.test(added));
console.log(failed ? `${failed} failed` : "all pins pass");
process.exit(failed ? 1 : 0);

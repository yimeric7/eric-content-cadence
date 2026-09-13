import {captureSableSitePageview,captureSableSiteEvent} from './vendor/analytics.js';
const productionHost="ericyim.vercel.app";
if(location.protocol==='https:' && location.hostname===productionHost && new URLSearchParams(location.search).get('utm_source')!=='protocol-qa'){
 const context={apiUrl:'https://app.protocolhome.com',siteSlug:"eric-content-cadence-tool"};
 captureSableSitePageview(context);
 document.querySelectorAll('a[href^="https://"]').forEach(a=>a.addEventListener('click',()=>{const u=new URL(a.href);captureSableSiteEvent('cta_click',{cta_kind:'project-link',target_host:u.hostname},context)}));
}

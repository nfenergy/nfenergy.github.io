/* NF ENERGY / Site navigation + Installazioni. Backwards-compatible with original public site. */
(function(){
'use strict';
function init(){
  const toggle=document.querySelector('.nav-toggle');
  const nav=document.querySelector('.desktop-nav');
  const english=(document.documentElement.lang||'it').toLowerCase().startsWith('en');
  const file=window.location.pathname.split('/').pop()||'index.html';
  const isHome=file==='index.html';
  const pageKey=english?'installations.html':'installazioni.html';
  const base=english?'../assets/':'assets/';
  // In the original site.js, the mobile navigation is opened/closed on click.
  if(toggle&&nav){
    toggle.addEventListener('click',function(){const expanded=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(expanded));nav.classList.toggle('is-open',expanded)});
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',function(){nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false')}));
  }
  // Load one isolated stylesheet for the new service, without modifying any legacy style files.
  if(!document.querySelector('link[data-nf-install-css]')){
    const link=document.createElement('link');link.rel='stylesheet';link.href=base+'css/installations.css';link.setAttribute('data-nf-install-css','');document.head.appendChild(link);
  }
  if(nav&&!nav.querySelector('.nf-install-link')){
    const a=document.createElement('a');a.href=pageKey;a.className='nf-install-link';a.textContent=english?'Installations':'Impianti';
    if(file===pageKey){a.classList.add('current');a.setAttribute('aria-current','page')}
    const prev=Array.from(nav.querySelectorAll('a')).find(x=>/competenze\.html|expertise\.html/.test(x.getAttribute('href')||''));
    if(prev){prev.after(a)}else{nav.appendChild(a)}
    if(toggle){a.addEventListener('click',function(){nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false')})}
  }
  const footer=document.querySelector('.footer-top');
  if(footer&&!footer.querySelector('.nf-install-footer-link')){
    const candidates=Array.from(footer.querySelectorAll('a'));const prev=candidates.find(x=>/competenze\.html|expertise\.html/.test(x.getAttribute('href')||''));
    const a=document.createElement('a');a.href=pageKey;a.className='nf-install-footer-link';a.textContent=english?'Installations':'Impianti e installazioni';
    if(prev){prev.after(a)}else{const col=footer.querySelector('div:nth-child(2)');if(col)col.appendChild(a)}
  }
  if(isHome&&document.querySelector('.services-home')&&!document.getElementById('nf-install-home')){
    const images={"home": "https://images.pexels.com/photos/29206495/pexels-photo-29206495.jpeg?auto=compress&cs=tinysrgb&w=1500", "industry": "https://images.pexels.com/photos/35454187/pexels-photo-35454187.jpeg?auto=compress&cs=tinysrgb&w=1500", "ev": "https://images.pexels.com/photos/37029446/pexels-photo-37029446.jpeg?auto=compress&cs=tinysrgb&w=1500", "public": "https://images.pexels.com/photos/6601008/pexels-photo-6601008.jpeg?auto=compress&cs=tinysrgb&w=1500", "work": "https://images.pexels.com/photos/11645008/pexels-photo-11645008.jpeg?auto=compress&cs=tinysrgb&w=1500"};
    const captions=english?[
      ['01 / RESIDENTIAL','Residential solar PV','Solar PV systems for homes, designed around household consumption, efficiency and practicality.'],
      ['02 / COMMERCIAL','Industrial solar PV','Solar PV for factories, commercial buildings and production facilities, tailored to operating needs.'],
      ['03 / E-MOBILITY','EV charging stations','EV charging solutions for homes, companies, workplaces and shared parking areas.'],
      ['04 / PUBLIC SECTOR','Public authorities','Solutions for local authorities and public facilities, subject to applicable procurement requirements.']
    ]:[
      ['01 / RESIDENZIALE','Fotovoltaico civile','Impianti per abitazioni private, progettati sui consumi e sulle esigenze reali delle famiglie.'],
      ['02 / IMPRESE','Fotovoltaico industriale','Impianti per aziende, capannoni e sedi produttive, con soluzioni calibrate sui fabbisogni.'],
      ['03 / MOBILITÀ','Colonnine di ricarica','Soluzioni di ricarica per abitazioni, aziende, luoghi di lavoro e parcheggi condivisi.'],
      ['04 / ENTI PUBBLICI','Pubblica Amministrazione','Soluzioni per enti e infrastrutture pubbliche, nel rispetto delle procedure applicabili.']
    ];
    const keys=['home','industry','ev','public'];
    const section=document.createElement('section');section.className='nf-install-feature';section.id='nf-install-home';section.setAttribute('aria-labelledby','nf-install-title');
    const link=english?'installations.html':'installazioni.html';
    const cards=captions.map((c,i)=>`<a class="nf-install-card" href="${link}#service-${i+1}"><div class="nf-install-image"><img loading="lazy" decoding="async" referrerpolicy="no-referrer" src="${images[keys[i]]}" alt="${c[1]}" data-nf-fallback="${base}img/${i===0?'hero.webp':i===1?'agrivoltaic.webp':i===2?'bess.webp':'boardroom.webp'}"></div><div class="nf-install-content"><span class="nf-install-kicker">${c[0]}</span><h3>${c[1]}</h3><p>${c[2]}</p><span class="nf-install-arrow">${english?'Explore service':'Scopri il servizio'} ↗</span></div></a>`).join('');
    section.innerHTML=`<div class="shell"><div class="nf-install-intro"><div><p class="small-cap gold">${english?'03 / Installation & energy solutions':'03 / Installazioni e soluzioni energetiche'}</p><h2 id="nf-install-title">${english?'From energy strategy<br>to <em>practical solutions.</em>':'Dalla visione energetica<br>alle <em>soluzioni concrete.</em>'}</h2></div><div><p>${english?'We provide residential and industrial solar PV installations, EV charging solutions and services for public-sector entities. A dedicated operational focus alongside origination and advisory.':'Realizziamo impianti fotovoltaici civili e industriali, infrastrutture di ricarica elettrica e soluzioni rivolte agli enti pubblici. Un ambito operativo che affianca le attività di origination e advisory.'}</p></div></div><div class="nf-install-grid">${cards}</div><div class="nf-install-band"><div class="nf-install-years"><strong>20+</strong><span>${english?'Years of sector experience among the qualified professionals involved in installation activities.':'Anni di esperienza nel settore maturati dal personale qualificato coinvolto nelle attività di installazione.'}</span></div><a class="nf-install-cta" href="${link}">${english?'Explore installation services':'Scopri i servizi di installazione'} <span>↗</span></a></div><p class="nf-install-note">${english?'Illustrative photography; not a portfolio of NF ENERGY completed projects.':'Fotografie illustrative; non rappresentano un portfolio di lavori già realizzati da NF ENERGY.'}</p></div>`;
    const after=document.querySelector('.services-home');after.insertAdjacentElement('afterend',section);
    // Keep progressive numbering on home: technologies 04, opportunities 05, approach 06.
    const map=[['.focus-home','.small-cap.gold','04 /'],['.opportunity-home','.small-cap.gold','05 /'],['.dark-approach','.small-cap.light-gold','06 /']];
    map.forEach(([scope,child,num])=>{const el=document.querySelector(scope+' '+child);if(el)el.textContent=el.textContent.replace(/^\d+ \/ /,num+' ')});
  }
  // Local fallback images for cases when a stock-photo CDN is blocked.
  document.querySelectorAll('img[data-nf-fallback]').forEach(img=>img.addEventListener('error',function(){if(!this.dataset.nfFallbackUsed){this.dataset.nfFallbackUsed='1';this.src=this.dataset.nfFallback}}));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

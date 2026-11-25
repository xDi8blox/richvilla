(function(){
  var WA='2348063108630';
  var d=document;d.documentElement.classList.remove('no-js');
  function wa(text){return 'https://wa.me/'+WA+'?text='+encodeURIComponent(text);}
  // static WhatsApp links
  d.querySelectorAll('a[data-wa]').forEach(function(a){a.href=wa(a.dataset.wa);a.target='_blank';a.rel='noopener';});

  // hero settle
  window.addEventListener('load',function(){d.body.classList.add('loaded');});
  requestAnimationFrame(function(){setTimeout(function(){d.body.classList.add('loaded');},60);});

  // header + mobile CTA on scroll
  var header=d.querySelector('.site-header'),mb=d.querySelector('.mobile-book'),hero=d.querySelector('.hero'),book=d.getElementById('book');
  function onScroll(){
    var y=window.scrollY,h=hero.offsetHeight;
    header.classList.toggle('solid',y>h-80);
    var br=book.getBoundingClientRect();
    mb.classList.toggle('show',y>h+book.offsetHeight && !(br.top<window.innerHeight&&br.bottom>0));
  }
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  // booking form
  var ci=d.getElementById('ci'),co=d.getElementById('co'),g=d.getElementById('guests'),apt=d.getElementById('apt'),nights=d.getElementById('nights'),form=d.getElementById('booking');
  function iso(dt){return dt.getFullYear()+'-'+String(dt.getMonth()+1).padStart(2,'0')+'-'+String(dt.getDate()).padStart(2,'0');}
  function parse(v){var p=v.split('-');return new Date(+p[0],+p[1]-1,+p[2]);}
  function pretty(v){return parse(v).toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short',year:'numeric'});}
  var today=new Date();today.setHours(0,0,0,0);
  ci.min=iso(today);
  var t1=new Date(today);t1.setDate(t1.getDate()+1);co.min=iso(t1);
  var update=function(){
    if(ci.value){var m=parse(ci.value);m.setDate(m.getDate()+1);co.min=iso(m);if(!co.value||parse(co.value)<=parse(ci.value)){co.value=iso(m);}}
    if(ci.value&&co.value){var n=Math.round((parse(co.value)-parse(ci.value))/864e5);nights.textContent=n+(n===1?' night':' nights');}
    else nights.textContent='Choose your dates';
  };
  function show(inp){var s=d.getElementById(inp.id+'-show');if(inp.value){s.textContent=parse(inp.value).toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'});s.classList.remove('empty');}else{s.textContent='Add date';s.classList.add('empty');}}
  var _u=update;update=function(){_u();show(ci);show(co);};
  [ci,co].forEach(function(inp){inp.parentNode.addEventListener('click',function(){if(inp.showPicker){try{inp.showPicker();}catch(_){}}});});
  show(ci);show(co);
  ci.addEventListener('change',update);co.addEventListener('change',update);
  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(!ci.value||!co.value){form.classList.add('invalid');(ci.value?co:ci).focus();if(ci.showPicker){try{(ci.value?co:ci).showPicker();}catch(_){}}return;}
    var n=Math.round((parse(co.value)-parse(ci.value))/864e5);
    var msg='Hello RichVilla, I would like to book a stay.\n\nCheck-in: '+pretty(ci.value)+'\nCheck-out: '+pretty(co.value)+' ('+n+(n===1?' night':' nights')+')\nGuests: '+g.value+(apt.value?'\nApartment: '+apt.value:'')+'\n\nIs it available, and what is the rate?';
    window.open(wa(msg),'_blank','noopener');
  });

  // reveal
  var els=d.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});},{rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(el){io.observe(el);});
  } else els.forEach(function(el){el.classList.add('in');});

  // lightbox
  var lb=d.getElementById('lightbox'),lbi=lb.querySelector('img');
  d.querySelectorAll('[data-full]').forEach(function(b){b.addEventListener('click',function(){lbi.src=b.dataset.full;lbi.alt=b.querySelector('img').alt;lb.hidden=false;d.body.style.overflow='hidden';});});
  function close(){lb.hidden=true;lbi.src='';d.body.style.overflow='';}
  lb.addEventListener('click',function(e){if(e.target!==lbi)close();});
  d.addEventListener('keydown',function(e){if(e.key==='Escape'&&!lb.hidden)close();});
})();

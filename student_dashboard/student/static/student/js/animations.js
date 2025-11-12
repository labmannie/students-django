document.addEventListener('DOMContentLoaded', function(){
  const cards = Array.from(document.querySelectorAll('.card'));

  // staggered entrance
  cards.forEach((c, i) => {
    c.style.opacity = 0;
    c.style.transform = 'translateY(16px)';
    setTimeout(() => {
      c.style.transition = 'opacity .45s ease, transform .55s cubic-bezier(.2,.9,.3,1)';
      c.style.opacity = 1;
      c.style.transform = 'translateY(0)';
    }, 60 * i);
  });

  // tilt and hover interactions
  cards.forEach(card => {
    card.addEventListener('pointermove', e => {
      const rect = card.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width/2);
      const dy = e.clientY - (rect.top + rect.height/2);
      const rx = (dy / rect.height) * 6;
      const ry = (dx / rect.width) * -6;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });

    // open modal on click or Enter
    card.addEventListener('click', () => openDetails(card));
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { openDetails(card); e.preventDefault(); }});
  });

  // search filter
  const search = document.getElementById('search');
  if (search){
    search.addEventListener('input', ()=>{
      applyClientFilters();
    });
  }

  // department filter and sort (client-side enhancement)
  const deptSelect = document.getElementById('dept');
  const sortSelect = document.getElementById('sort');
  const filterForm = document.getElementById('filters');


  function applyClientFilters(){
    const q = (search && search.value.trim().toLowerCase()) || '';
    const dept = deptSelect ? deptSelect.value : '';
    const sort = sortSelect ? sortSelect.value : 'joined';

    let visible = cards.filter(c => {
      const name = (c.dataset.name || '').toLowerCase();
      const email = (c.dataset.email || '').toLowerCase();
      const insta = (c.dataset.insta || '').toLowerCase();
      const bio = (c.dataset.bio || '').toLowerCase();
      const matchesQ = (!q) || name.includes(q) || email.includes(q) || insta.includes(q) || bio.includes(q);
      const matchesDept = (!dept) || (c.dataset.deptId === dept);
      return matchesQ && matchesDept;
    });

    // hide all first
    cards.forEach(c => c.style.display = 'none');

    // simple sorting by DOM content
    visible.sort((a,b)=>{
      if (sort === 'name') return a.querySelector('.student-name').textContent.localeCompare(b.querySelector('.student-name').textContent);
      if (sort === 'marks') return parseInt(b.querySelector('.marks strong').textContent) - parseInt(a.querySelector('.marks strong').textContent);
      // joined: sort by joined date if data-joined available, otherwise keep DOM order
      if (sort === 'joined'){
        const da = a.querySelector('.joined') ? new Date(a.querySelector('.joined').textContent) : null;
        const db = b.querySelector('.joined') ? new Date(b.querySelector('.joined').textContent) : null;
        if (da && db) return db - da; // newest first
        return 0;
      }
      return 0;
    });

    visible.forEach(c => c.style.display = '');
  }

  if (deptSelect) deptSelect.addEventListener('change', applyClientFilters);
  if (sortSelect) sortSelect.addEventListener('change', applyClientFilters);

  if (filterForm){
    filterForm.addEventListener('submit', (e)=>{
      // let JS handle filtering client-side to avoid full page reload
      e.preventDefault();
      applyClientFilters();
    });
  }

  // reset button if needed
  const resetBtn = document.querySelector('.controls .reset');
  if (resetBtn){
    resetBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      if (search) search.value = '';
      if (deptSelect) deptSelect.value = '';
      if (sortSelect) sortSelect.value = 'joined';
      applyClientFilters();
    });
  }

  // modal handling
  const modal = document.getElementById('detailsModal');
  function openDetails(card){
    const id = card.dataset.id;
    const name = card.querySelector('.student-name').textContent;
    const email = card.querySelector('.email').textContent;
    const dept = card.querySelector('.badge').textContent;
    const marks = card.querySelector('.marks strong').textContent;
    const joined = card.querySelector('.joined').textContent;
    const img = card.querySelector('.card-media img');

    modal.querySelector('.modal-name').textContent = name;
    modal.querySelector('.modal-email').textContent = email;
    modal.querySelector('.modal-dept').textContent = dept;
    modal.querySelector('.modal-marks').textContent = 'Marks: ' + marks;
    modal.querySelector('.modal-joined').textContent = joined;
    // extra fields
    const bioEl = modal.querySelector('.modal-bio');
    const instaEl = modal.querySelector('.modal-insta');
    const webEl = modal.querySelector('.modal-website');

    const bio = card.dataset.bio || '';
    const insta = card.dataset.insta || '';
    const web = card.dataset.website || '';

    bioEl.textContent = bio;
    if (insta){
      instaEl.textContent = '@' + insta.replace(/^@/,'');
      instaEl.href = insta.startsWith('http') ? insta : 'https://instagram.com/' + insta.replace(/^@/, '');
      instaEl.style.display = '';
    } else {
      instaEl.style.display = 'none';
    }
    if (web){
      webEl.textContent = web.replace(/^https?:\/\//,'');
      webEl.href = web;
      webEl.style.display = '';
    } else {
      webEl.style.display = 'none';
    }

    const media = modal.querySelector('.modal-media');
    media.innerHTML = '';
    if (img){
      const newImg = document.createElement('img');
      newImg.src = img.src;
      newImg.alt = name + ' photo';
      media.appendChild(newImg);
    } else {
      const fallback = document.createElement('div');
      fallback.className = 'avatar-fallback';
      fallback.textContent = name.charAt(0).toUpperCase();
      media.appendChild(fallback);
    }

    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    // focus for accessibility
    modal.querySelector('.modal-close').focus();
  }

  // close handlers
  modal.addEventListener('click', (e)=>{
    if (e.target.dataset.close === 'true') closeModal();
  });
  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape') closeModal(); });

  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
});

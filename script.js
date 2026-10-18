(function() {
  // Base Projects Dataset
  const projectsData = window.WEBS_STUDIO_PROJECTS || [];

  let currentCategory = 'all';

  // Render Projects Grid
  function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const filtered = currentCategory === 'all' 
      ? projectsData 
      : projectsData.filter(p => p.category.toLowerCase() === currentCategory.toLowerCase());

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-12 text-center text-on-surface-variant font-body-md">
          No hay proyectos registrados en esta categoría actualmente.
        </div>`;
      return;
    }

    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = "bg-surface-container-low rounded-xl overflow-hidden shadow-md hover:bg-surface-container transition-all flex flex-col justify-between group";
      card.innerHTML = `
        <div>
          <div class="relative h-52 overflow-hidden bg-surface-container-highest cursor-pointer project-img-trigger" data-id="${p.id}">
            <img src="${p.image}" alt="${p.imageAlt}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            <div class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-secondary font-label-sm text-label-sm font-semibold flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span>${p.status}</span>
            </div>
            <div class="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-md bg-surface-container-high/90 text-on-surface font-label-sm text-label-sm">
              ${p.category}
            </div>
          </div>
          <div class="p-space-md">
            <h3 class="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-primary transition-colors cursor-pointer project-title-trigger" data-id="${p.id}">
              ${p.title}
            </h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
              ${p.shortDesc}
            </p>
            <div class="flex flex-wrap gap-1.5 mt-4">
              ${p.tags.map(t => `<span class="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">${t}</span>`).join('')}
            </div>
          </div>
        </div>
        <div class="p-space-md pt-0 flex items-center justify-between gap-2 mt-4">
          <button class="open-details-btn px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-sm text-label-sm font-semibold flex items-center gap-1 transition-colors" data-id="${p.id}">
            <span class="material-symbols-outlined text-[16px]">info</span>
            <span>Ficha Detallada</span>
          </button>
          <a href="${p.repoUrl}" target="_blank" rel="noopener noreferrer" onclick="selectSector('${p.category}')" class="px-3 py-1.5 rounded-lg bg-primary-container text-on-primary-container font-label-sm text-label-sm font-semibold hover:bg-inverse-primary transition-colors flex items-center gap-1">
            <span>Ver repositorio</span>
            <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
          </a>
        </div>
      `;
      grid.appendChild(card);
    });

    // Attach trigger listeners
    document.querySelectorAll('.open-details-btn, .project-img-trigger, .project-title-trigger').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-id');
        openProjectModal(id);
      });
    });
  }

  // Filter Bar Interaction
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        const selected = b === btn;
        b.classList.toggle('active', selected);
        b.setAttribute('aria-pressed', String(selected));
        b.classList.toggle('bg-primary-container', selected);
        b.classList.toggle('text-on-primary-container', selected);
        b.classList.toggle('bg-surface-container-high', !selected);
        b.classList.toggle('text-on-surface-variant', !selected);
      });
      
      currentCategory = btn.getAttribute('data-filter');
      renderProjects();
    });
  });

  // Modal Open & Close logic
  const projectModal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const closeModalBtn = document.getElementById('close-modal-btn');

  function openProjectModal(id) {
    const project = projectsData.find(p => p.id === id);
    if (!project) return;

    modalContent.innerHTML = `
      <div class="relative h-64 sm:h-80 rounded-lg overflow-hidden bg-surface-container-lowest">
        <img src="${project.image}" data-alt="${project.imageAlt}" class="w-full h-full object-cover">
        <div class="absolute top-4 left-4 px-3 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-secondary font-label-sm text-label-sm font-semibold flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-secondary"></span>
          <span>${project.status}</span>
        </div>
      </div>
      <div>
        <div class="flex items-center gap-2 font-label-sm text-label-sm text-primary font-semibold uppercase">
          <span>${project.category}</span>
          <span>•</span>
          <span>Webs Studio Mallorca Edition</span>
        </div>
        <h2 class="font-headline-lg text-headline-lg font-bold text-on-surface mt-1">${project.title}</h2>
      </div>
      <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
        ${project.fullDesc}
      </p>
      
      <div>
        <h4 class="font-label-lg text-label-lg font-bold text-on-surface mb-2">Funcionalidades Clave:</h4>
        <ul class="flex flex-col gap-2">
          ${project.features.map(f => `
            <li class="flex items-start gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <span class="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
              <span>${f}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div class="flex flex-wrap gap-2 pt-2">
        ${project.tags.map(t => `<span class="px-2.5 py-1 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm font-mono">${t}</span>`).join('')}
      </div>

      <div class="pt-4 flex flex-col sm:flex-row items-center justify-between gap-space-sm border-t border-surface-container-highest">
        <button onclick="document.getElementById('project-modal').classList.add('hidden');document.getElementById('project-modal').classList.remove('flex');document.body.style.overflow=''" class="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-bright font-label-md text-label-md">
          Cerrar Ficha
        </button>
        <a href="#contacto" onclick="selectSector('${project.category}'); document.getElementById('project-modal').classList.add('hidden')" class="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md font-semibold hover:bg-inverse-primary shadow-md flex items-center justify-center gap-2">
          <span>Quiero una web similar para mi negocio</span>
          <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
        </a>
      </div>
    `;

    projectModal.classList.remove('hidden');
    projectModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  if (projectModal) {
    projectModal.addEventListener('click', (event) => {
      if (event.target === projectModal) {
        projectModal.classList.add('hidden');
        projectModal.classList.remove('flex');
        document.body.style.overflow = '';
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !projectModal.classList.contains('hidden')) {
        projectModal.classList.add('hidden');
        projectModal.classList.remove('flex');
        document.body.style.overflow = '';
      }
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      projectModal.classList.add('hidden');
      projectModal.classList.remove('flex');
      document.body.style.overflow = '';
    });
  }

  // Pre-fill Sector Select on contact form
  window.selectSector = function(category) {
    const typeSelect = document.getElementById('form-type');
    if (!typeSelect) return;
    if (category.includes('Taller')) typeSelect.value = 'Taller';
    else if (category.includes('Restaurante')) typeSelect.value = 'Restaurante';
    else if (category.includes('Comercio')) typeSelect.value = 'Comercio';
    else if (category.includes('Profesional')) typeSelect.value = 'Profesional';
    else typeSelect.value = 'Otro';
  };

  const mobileDrawer = document.getElementById('mobile-drawer');
  if (mobileDrawer) {
    mobileDrawer.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => mobileDrawer.classList.add('hidden')));
  }

  // FAQ Accordion
  const faqToggles = document.querySelectorAll('.faq-toggle');
  faqToggles.forEach((toggle, index) => {
    const answer = toggle.nextElementSibling;
    if (answer && !answer.id) answer.id = `faq-answer-${index + 1}`;
    if (answer) toggle.setAttribute('aria-controls', answer.id);
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', () => {
      const answer = toggle.nextElementSibling;
      const icon = toggle.querySelector('.faq-icon');
      const isExpanded = !answer.classList.contains('hidden');

      // Close all
      document.querySelectorAll('.faq-answer').forEach(a => a.classList.add('hidden'));
      document.querySelectorAll('.faq-toggle').forEach(button => button.setAttribute('aria-expanded', 'false'));
      document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-180'));

      if (!isExpanded) {
        answer.classList.remove('hidden');
        toggle.setAttribute('aria-expanded', 'true');
        icon.classList.add('rotate-180');
      }
    });
  });

  // Contact form: opens a prefilled email. No message is sent until the visitor confirms in their email app.
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;
      const data = new FormData(contactForm);
      const payload = {
        name: data.get('name'),
        business: data.get('business') || 'No indicado',
        email: data.get('email'),
        type: document.getElementById('form-type').value,
        budget: document.getElementById('form-budget').selectedOptions[0].textContent,
        message: data.get('message'),
        _subject: 'Nueva consulta desde Webs Studio',
        _replyto: data.get('email')
      };
      const submitButton = contactForm.querySelector('[type="submit"]');
      if (submitButton) submitButton.disabled = true;
      formSuccess.classList.remove('hidden');
      formSuccess.textContent = 'Enviando tu consulta…';
      fetch('https://formsubmit.co/ajax/webslocalstudio@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      }).then(async response => {
        const result = await response.json().catch(() => ({}));
        if (!response.ok || result.success === 'false' || result.success === false) throw new Error('No se pudo enviar');
        contactForm.reset();
        formSuccess.textContent = 'Gracias. Tu consulta se ha enviado correctamente.';
      }).catch(() => {
        formSuccess.textContent = 'No se pudo enviar ahora. Escríbenos a webslocalstudio@gmail.com o llama al +34 663 236 304.';
      }).finally(() => {
        if (submitButton) submitButton.disabled = false;
      });
    });
  }

  renderProjects();

  const year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();

})();




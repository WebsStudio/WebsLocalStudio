(() => {
  const projects = window.WEBS_STUDIO_PROJECTS || [];
  const grid = document.getElementById("projects-grid");
  const modal = document.getElementById("project-modal");
  let priorFocus = null;

  function makeProjectCard(project) {
    const card = document.createElement("article");
    card.className = "group bg-surface-container-low rounded-xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col";
    card.dataset.category = project.filterCategory;
    const visual = document.createElement("div");
    visual.className = "project-visual relative h-56 overflow-hidden bg-surface-container-lowest";
    const image = document.createElement("img");
    image.src = project.image;
    image.alt = project.imageAlt;
    image.loading = "lazy";
    image.className = "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105";
    image.addEventListener("error", () => {
      image.remove();
      const fallback = document.createElement("div");
      fallback.className = "h-full min-h-48 flex items-center justify-center bg-gradient-to-br from-primary-container/30 via-surface-container-high to-surface-container-lowest text-primary";
      fallback.innerHTML = '<span class="material-symbols-outlined text-6xl" aria-hidden="true">code</span>';
      visual.append(fallback);
    }, { once: true });
    visual.append(image);
    const badge = document.createElement("span");
    badge.className = "absolute top-3 left-3 px-3 py-1 rounded-full bg-surface-container-lowest/90 text-secondary font-label-sm text-label-sm font-semibold";
    badge.textContent = project.status;
    visual.append(badge);

    const content = document.createElement("div");
    content.className = "p-space-lg flex flex-col gap-space-sm flex-1";
    const category = document.createElement("span");
    category.className = "font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold";
    category.textContent = project.category;
    const title = document.createElement("h3");
    title.className = "font-headline-sm text-headline-sm text-on-surface font-bold";
    title.textContent = project.title;
    const description = document.createElement("p");
    description.className = "font-body-sm text-body-sm text-on-surface-variant leading-relaxed flex-1";
    description.textContent = project.shortDesc;
    const tags = document.createElement("div");
    tags.className = "flex flex-wrap gap-2";
    project.tags.forEach(tag => {
      const item = document.createElement("span");
      item.className = "px-2.5 py-1 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm";
      item.textContent = tag;
      tags.append(item);
    });
    content.append(category, title, description, tags);

    const actions = document.createElement("div");
    actions.className = "p-space-lg pt-0 flex flex-wrap gap-2 mt-auto";
    const details = document.createElement("button");
    details.type = "button";
    details.className = "flex-1 px-3 py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-sm text-label-sm font-semibold";
    details.textContent = "Detalles";
    details.addEventListener("click", () => openProject(project, details));
    const repo = document.createElement("a");
    repo.href = project.repoUrl;
    repo.target = "_blank";
    repo.rel = "noopener noreferrer";
    repo.className = "flex-1 text-center px-3 py-2 rounded-lg bg-primary-container hover:bg-inverse-primary text-on-primary-container font-label-sm text-label-sm font-semibold";
    repo.textContent = "Ver repositorio";
    actions.append(details, repo);
    card.append(visual, content, actions);
    return card;
  }

  function renderProjects(filter = "all") {
    if (!grid) return;
    grid.replaceChildren();
    const visible = projects.filter(project => filter === "all" || project.filterCategory === filter);
    if (!visible.length) {
      const empty = document.createElement("p");
      empty.className = "col-span-full py-12 text-center text-on-surface-variant";
      empty.textContent = "No hay repositorios en esta categoría.";
      grid.append(empty);
      return;
    }
    visible.forEach(project => grid.append(makeProjectCard(project)));
  }

  function openProject(project, opener) {
    if (!modal) return;
    priorFocus = opener || document.activeElement;
    modal.innerHTML = `
      <section class="relative w-full max-w-2xl bg-surface-container-low rounded-xl shadow-2xl overflow-hidden my-8" role="document">
        <button type="button" class="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-surface-container-high hover:bg-surface-bright text-on-surface" aria-label="Cerrar detalles">×</button>
        <div class="p-space-lg sm:p-space-xl flex flex-col gap-space-md">
          <span class="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">${project.status} · ${project.category}</span>
          <h2 class="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface font-bold" tabindex="-1">${project.title}</h2>
          <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">${project.fullDesc}</p>
          <p class="font-label-sm text-label-sm text-on-surface-variant">El botón abre el repositorio de código, no una web publicada.</p>
          <div class="flex flex-col sm:flex-row gap-space-sm pt-space-md border-t border-surface-container-highest">
            <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="flex-1 text-center px-5 py-3 rounded-lg bg-primary-container hover:bg-inverse-primary text-on-primary-container font-semibold">Abrir en GitHub</a>
            <button type="button" class="close-details px-5 py-3 rounded-lg bg-surface-container-high text-on-surface font-semibold">Cerrar</button>
          </div>
        </div>
      </section>`;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
    modal.setAttribute("aria-label", `Detalles de ${project.title}`);
    modal.querySelector("h2").focus();
    modal.querySelectorAll("button").forEach(button => button.addEventListener("click", closeModal));
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
    priorFocus?.focus?.();
  }

  window.filterProjects = (category, button) => {
    document.querySelectorAll(".filter-pill").forEach(pill => {
      const active = pill === button;
      pill.setAttribute("aria-pressed", String(active));
      pill.classList.toggle("bg-primary-container", active);
      pill.classList.toggle("text-on-primary-container", active);
      pill.classList.toggle("bg-surface-container-high", !active);
      pill.classList.toggle("text-on-surface-variant", !active);
    });
    renderProjects(category);
  };

  if (modal) {
    modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
    });
  }

  const filters = document.getElementById("filter-container");
  if (filters) {
    filters.replaceChildren();
    [["all","Todos los repositorios"],["motor","Talleres y motor"],["hosteleria","Restaurantes"],["otros","Otros sectores"]].forEach(([category,label]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "filter-pill font-label-lg text-label-lg px-space-md py-2 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all";
      button.textContent = label;
      button.setAttribute("aria-pressed", String(category === "all"));
      if (category === "all") button.classList.add("bg-primary-container","text-on-primary-container");
      button.addEventListener("click", () => window.filterProjects(category, button));
      filters.append(button);
    });
  }
  renderProjects();
})();

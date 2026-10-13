(() => {
  "use strict";

  const body = document.body;
  const header = document.querySelector("[data-header]");
  const progress = document.querySelector("[data-progress]");
  const menuButton = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const roleButton = document.querySelector("[data-role-toggle]");
  const rolePanel = document.querySelector("[data-role-panel]");
  const enableButton = document.querySelector("[data-enable-toggle]");
  const enableRoles = document.querySelector("[data-enable-roles]");
  const mechanismTrack = document.querySelector("[data-mechanism-track]");
  const mechanismChapters = [...document.querySelectorAll("[data-mechanism-chapter]")];
  const mechanismPrev = document.querySelector("[data-mechanism-prev]");
  const mechanismNext = document.querySelector("[data-mechanism-next]");
  const mechanismCurrent = document.querySelector("[data-mechanism-current]");
  const mechanismDots = [...document.querySelectorAll("[data-mechanism-dot]")];
  const mechanismStatus = document.querySelector("[data-mechanism-status]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const setExpanded = (control, panel, open) => {
    if (!control || !panel) return;
    control.setAttribute("aria-expanded", String(open));
    panel.hidden = !open;
  };

  const closeMenu = () => {
    setExpanded(menuButton, mobileMenu, false);
    body.classList.remove("menu-open");
  };

  const closeRoleChooser = () => {
    setExpanded(roleButton, rolePanel, false);
    setExpanded(enableButton, enableRoles, false);
  };

  menuButton?.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    setExpanded(menuButton, mobileMenu, open);
    body.classList.toggle("menu-open", open);
  });

  mobileMenu?.addEventListener("click", event => {
    if (event.target.closest("a, button")) closeMenu();
  });

  roleButton?.addEventListener("click", () => {
    const open = roleButton.getAttribute("aria-expanded") !== "true";
    setExpanded(roleButton, rolePanel, open);
    if (open) requestAnimationFrame(() => rolePanel.querySelector("a, button")?.focus());
  });

  enableButton?.addEventListener("click", () => {
    const open = enableButton.getAttribute("aria-expanded") !== "true";
    setExpanded(enableButton, enableRoles, open);
  });

  document.addEventListener("click", event => {
    if (!event.target.closest(".role-cta")) closeRoleChooser();
  });

  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    if (roleButton?.getAttribute("aria-expanded") === "true") {
      closeRoleChooser();
      roleButton.focus();
    }
    if (menuButton?.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuButton.focus();
    }
  });

  document.querySelectorAll("[data-signup]").forEach(button => {
    button.addEventListener("click", () => {
      const role = button.dataset.signup || "seller";
      if (window.ONDCSignup?.open) {
        window.ONDCSignup.open(role);
        return;
      }

      window.location.href = "https://portal.ondc.org/";
    });
  });

  let activeMechanismChapter = 0;
  let mechanismScheduled = false;
  let dragState = null;

  const mechanismLeft = chapter => {
    if (!mechanismTrack || !chapter) return 0;
    const padding = Number.parseFloat(getComputedStyle(mechanismTrack).paddingLeft) || 0;
    return Math.max(0, chapter.offsetLeft - padding);
  };

  const updateMechanism = index => {
    if (!mechanismChapters.length) return;
    const nextIndex = Math.max(0, Math.min(mechanismChapters.length - 1, index));
    if (nextIndex === activeMechanismChapter && mechanismChapters[nextIndex].classList.contains("is-active")) return;

    activeMechanismChapter = nextIndex;
    mechanismChapters.forEach((chapter, chapterIndex) => chapter.classList.toggle("is-active", chapterIndex === nextIndex));
    mechanismDots.forEach((dot, dotIndex) => {
      if (dotIndex === nextIndex) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });

    if (mechanismCurrent) mechanismCurrent.textContent = String(nextIndex + 1).padStart(2, "0");
    if (mechanismPrev) mechanismPrev.disabled = nextIndex === 0;
    if (mechanismNext) mechanismNext.disabled = nextIndex === mechanismChapters.length - 1;

    const title = mechanismChapters[nextIndex].querySelector("h3")?.textContent?.trim() || "";
    if (mechanismStatus) mechanismStatus.textContent = `Chapter ${nextIndex + 1} of ${mechanismChapters.length}: ${title}`;
  };

  const nearestMechanismChapter = () => {
    if (!mechanismTrack || !mechanismChapters.length) return 0;
    return mechanismChapters.reduce((nearest, chapter, index) => {
      const distance = Math.abs(mechanismTrack.scrollLeft - mechanismLeft(chapter));
      return distance < nearest.distance ? { index, distance } : nearest;
    }, { index: 0, distance: Number.POSITIVE_INFINITY }).index;
  };

  const scrollToMechanismChapter = (index, smooth = true) => {
    if (!mechanismTrack || !mechanismChapters.length) return;
    const nextIndex = Math.max(0, Math.min(mechanismChapters.length - 1, index));
    mechanismTrack.scrollTo({
      left: mechanismLeft(mechanismChapters[nextIndex]),
      behavior: smooth && !reducedMotion.matches ? "smooth" : "auto"
    });
    updateMechanism(nextIndex);
  };

  mechanismPrev?.addEventListener("click", () => scrollToMechanismChapter(activeMechanismChapter - 1));
  mechanismNext?.addEventListener("click", () => scrollToMechanismChapter(activeMechanismChapter + 1));
  mechanismDots.forEach((dot, index) => dot.addEventListener("click", () => scrollToMechanismChapter(index)));

  mechanismTrack?.addEventListener("scroll", () => {
    if (mechanismScheduled) return;
    mechanismScheduled = true;
    requestAnimationFrame(() => {
      updateMechanism(nearestMechanismChapter());
      mechanismScheduled = false;
    });
  }, { passive: true });

  mechanismTrack?.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToMechanismChapter(activeMechanismChapter - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToMechanismChapter(activeMechanismChapter + 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      scrollToMechanismChapter(0);
    } else if (event.key === "End") {
      event.preventDefault();
      scrollToMechanismChapter(mechanismChapters.length - 1);
    }
  });

  mechanismTrack?.addEventListener("pointerdown", event => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    dragState = { pointerId: event.pointerId, x: event.clientX, left: mechanismTrack.scrollLeft };
    mechanismTrack.setPointerCapture(event.pointerId);
  });

  mechanismTrack?.addEventListener("pointermove", event => {
    if (!dragState || dragState.pointerId !== event.pointerId) return;
    const travel = event.clientX - dragState.x;
    if (Math.abs(travel) < 4) return;
    mechanismTrack.classList.add("is-dragging");
    mechanismTrack.scrollLeft = dragState.left - travel;
  });

  const endMechanismDrag = event => {
    if (!dragState || dragState.pointerId !== event.pointerId) return;
    dragState = null;
    mechanismTrack?.classList.remove("is-dragging");
    scrollToMechanismChapter(nearestMechanismChapter());
  };

  mechanismTrack?.addEventListener("pointerup", endMechanismDrag);
  mechanismTrack?.addEventListener("pointercancel", endMechanismDrag);

  const updateScrollState = () => {
    const scrollTop = window.scrollY;
    const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
    const pageRatio = scrollRange > 0 ? Math.min(1, scrollTop / scrollRange) : 0;
    progress?.style.setProperty("transform", `scaleX(${pageRatio})`);
    header?.classList.toggle("is-scrolled", scrollTop > 24);

  };

  let scheduled = false;
  const onScroll = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      updateScrollState();
      scheduled = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
    updateScrollState();
    scrollToMechanismChapter(activeMechanismChapter, false);
  });
  reducedMotion.addEventListener?.("change", updateScrollState);

  requestAnimationFrame(() => {
    body.classList.add("is-ready");
    updateMechanism(0);
    updateScrollState();
  });
})();

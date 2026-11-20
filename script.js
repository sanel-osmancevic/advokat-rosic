(function () {
  // E-mail adresa na koju stižu upiti iz forme
  var EMAIL_KANCELARIJE = "rosicmarko0000@gmail.com";

  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");

  var callBtn = document.getElementById("callBtn");
  var hero = document.getElementById("pocetna");
  var contact = document.getElementById("kontakt");

  // Pozadina navigacije i dugme za poziv posle skrola
  function onScroll() {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);

    // dugme za poziv: posle početnog ekrana, a ne u kontakt sekciji (tamo je broj već vidljiv)
    var pastHero = hero.getBoundingClientRect().bottom < window.innerHeight * 0.4;
    var c = contact.getBoundingClientRect();
    var inContact = c.top < window.innerHeight * 0.75 && c.bottom > 0;
    var menuOpen = menu.classList.contains("is-open");
    callBtn.classList.toggle("is-visible", pastHero && !inContact && !menuOpen);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  // Mobilni meni
  function setMenu(open) {
    menu.classList.toggle("is-open", open);
    nav.classList.toggle("menu-open", open);
    document.documentElement.classList.toggle("menu-locked", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Zatvori meni" : "Otvori meni");
    onScroll();
  }
  function closeMenu() { setMenu(false); }
  toggle.addEventListener("click", function () {
    setMenu(!menu.classList.contains("is-open"));
  });
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });
  // zatvaranje dodirom van menija ili tasterom Esc
  document.addEventListener("click", function (e) {
    if (menu.classList.contains("is-open") && !nav.contains(e.target)) closeMenu();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu.classList.contains("is-open")) {
      closeMenu();
      toggle.focus();
    }
  });
  // ako se ekran proširi (npr. tablet okrenut položeno), meni se zatvara
  window.addEventListener("resize", function () {
    if (window.innerWidth > 860 && menu.classList.contains("is-open")) closeMenu();
  });

  // Diskretna pojava sekcija pri skrolu
  var targets = document.querySelectorAll(
    ".section__head, .about__visual, .about__text, .practice__item, .steps li,.contact__info, .contact__form"
  );
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    targets.forEach(function (el) {
      el.classList.add("reveal");
      io.observe(el);
    });

    // Kartice u istom redu izranjaju jedna za drugom (kratak razmak po koloni)
    document.querySelectorAll(".practice, .steps").forEach(function (grid) {
      var cols = getComputedStyle(grid).gridTemplateColumns.split(" ").length || 1;
      Array.prototype.forEach.call(grid.children, function (item, i) {
        var delay = (i % cols) * 90;
        if (!delay) return;
        item.style.transitionDelay = delay + "ms";
        // posle pojave se kašnjenje uklanja, da prelazak mišem reaguje odmah
        item.addEventListener("transitionend", function clear() {
          item.style.transitionDelay = "";
          item.removeEventListener("transitionend", clear);
        });
      });
    });

    // Oznaka trenutne sekcije u meniju
    var links = {};
    menu.querySelectorAll('a[href^="#"]').forEach(function (a) {
      links[a.getAttribute("href").slice(1)] = a;
    });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var link = links[e.target.id];
        if (!link) return;
        if (e.isIntersecting) {
          Object.keys(links).forEach(function (k) { links[k].classList.remove("is-active"); });
          link.classList.add("is-active");
        } else {
          link.classList.remove("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(links).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) spy.observe(section);
    });
  }

  // Kontakt forma – otvara e-mail klijent sa popunjenim upitom
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");
  // crveni okvir greške nestaje čim korisnik ispravi polje
  form.addEventListener("input", function (e) {
    var field = e.target.parentElement;
    if (field && field.classList.contains("has-error")) {
      field.classList.remove("has-error");
      if (!form.querySelector(".has-error")) note.textContent = "";
    }
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var valid = true;
    ["ime", "email", "poruka"].forEach(function (id) {
      var el = form.elements[id];
      var ok = el.value.trim() !== "" && (id !== "email" || /\S+@\S+\.\S+/.test(el.value));
      el.parentElement.classList.toggle("has-error", !ok);
      if (!ok) valid = false;
    });
    if (!valid) {
      note.textContent = "Molimo popunite ime, ispravnu e-mail adresu i opis.";
      return;
    }
    var f = form.elements;
    var subject = "Upit sa sajta" + (f.oblast.value ? " – " + f.oblast.value : "");
    var body =
      "Ime i prezime: " + f.ime.value + "\n" +
      "Telefon: " + f.telefon.value + "\n" +
      "E-mail: " + f.email.value + "\n" +
      (f.oblast.value ? "Oblast: " + f.oblast.value + "\n" : "") +
      "\n" + f.poruka.value;
    window.location.href =
      "mailto:" + EMAIL_KANCELARIJE +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
    note.textContent = "Otvara se vaš e-mail program sa pripremljenom porukom.";
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();

(function () {
  // E-mail adresa na koju stižu upiti iz forme
  var EMAIL_KANCELARIJE = "rosicmarko0000@gmail.com";

  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");

  // Pozadina navigacije posle skrola
  function onScroll() {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobilni meni
  function closeMenu() {
    menu.classList.remove("is-open");
    nav.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
  }
  toggle.addEventListener("click", function () {
    var open = menu.classList.toggle("is-open");
    nav.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeMenu);
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
  }

  // Kontakt forma – otvara e-mail klijent sa popunjenim upitom
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");
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

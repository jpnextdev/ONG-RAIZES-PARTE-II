/* Menu principal: hambúrguer (mobile) e submenus dropdown (desktop e mobile). */
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".menu-toggle");
  var menu = document.getElementById("menu-principal");
  var desktop = window.matchMedia("(min-width: 64em)");
  if (!toggle || !menu) return;

  function fecharSubmenus(exceto) {
    menu.querySelectorAll(".tem-submenu.is-aberto").forEach(function (item) {
      if (item === exceto) return;
      item.classList.remove("is-aberto");
      item.querySelector(".submenu-toggle").setAttribute("aria-expanded", "false");
    });
  }

  function alternarMenu(abrir) {
    menu.classList.toggle("menu--aberto", abrir);
    toggle.setAttribute("aria-expanded", String(abrir));
    if (!abrir) fecharSubmenus();
  }

  toggle.addEventListener("click", function () {
    alternarMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  menu.querySelectorAll(".submenu-toggle").forEach(function (botao) {
    botao.addEventListener("click", function () {
      var item = botao.closest(".tem-submenu");
      var abrir = !item.classList.contains("is-aberto");
      fecharSubmenus(item);
      item.classList.toggle("is-aberto", abrir);
      botao.setAttribute("aria-expanded", String(abrir));
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    var aberto = menu.querySelector(".tem-submenu.is-aberto .submenu-toggle");
    fecharSubmenus();
    if (aberto) aberto.focus();
    else if (!desktop.matches && toggle.getAttribute("aria-expanded") === "true") {
      alternarMenu(false);
      toggle.focus();
    }
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".topo")) { fecharSubmenus(); if (!desktop.matches) alternarMenu(false); }
  });

  menu.addEventListener("click", function (e) {
    if (e.target.closest(".submenu a") || (e.target.closest("a") && !e.target.closest(".tem-submenu") && !desktop.matches)) {
      fecharSubmenus();
      if (!desktop.matches) alternarMenu(false);
    }
  });

  desktop.addEventListener("change", function () { alternarMenu(false); });
});

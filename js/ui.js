/* Componentes de interface: alerts, toasts, modals e validação visual de formulários. */
(function () {
  "use strict";

  /* ---------- Toasts ---------- */
  function mostrarToast(mensagem, tipo, duracao) {
    var area = document.getElementById("toasts");
    if (!area) {
      area = document.createElement("div");
      area.id = "toasts";
      area.className = "toasts";
      area.setAttribute("aria-live", "polite");
      document.body.appendChild(area);
    }
    var toast = document.createElement("div");
    toast.className = "toast toast-" + (tipo || "info");
    var texto = document.createElement("p");
    texto.textContent = mensagem;
    var fechar = document.createElement("button");
    fechar.type = "button";
    fechar.setAttribute("aria-label", "Fechar notificação");
    fechar.textContent = "×";
    toast.append(texto, fechar);
    area.appendChild(toast);

    function remover() {
      toast.classList.add("saindo");
      setTimeout(function () { toast.remove(); }, 300);
    }
    fechar.addEventListener("click", remover);
    setTimeout(function () { if (toast.isConnected) remover(); }, duracao || 5000);
  }
  window.mostrarToast = mostrarToast;

  /* ---------- Alerts dispensáveis ---------- */
  document.addEventListener("click", function (e) {
    var fechar = e.target.closest("[data-fechar-alerta]");
    if (fechar) fechar.closest(".alerta").hidden = true;
  });

  /* ---------- Modals (<dialog>) ---------- */
  document.addEventListener("click", function (e) {
    var abrir = e.target.closest("[data-modal-abrir]");
    if (abrir) {
      var modal = document.getElementById(abrir.dataset.modalAbrir);
      if (modal && modal.showModal) modal.showModal();
      return;
    }
    var fechar = e.target.closest("[data-modal-fechar]");
    if (fechar) { fechar.closest("dialog").close(); return; }
    if (e.target.tagName === "DIALOG") {
      var limites = e.target.getBoundingClientRect();
      if (e.clientX < limites.left || e.clientX > limites.right || e.clientY < limites.top || e.clientY > limites.bottom) e.target.close();
    }
  });

  /* ---------- Copiar chave Pix ---------- */
  document.addEventListener("click", function (e) {
    var botao = e.target.closest("[data-copiar]");
    if (!botao) return;
    var texto = botao.dataset.copiar;
    var ok = function () { mostrarToast("Chave Pix copiada!", "sucesso"); };
    var falha = function () { mostrarToast("Não foi possível copiar. Selecione a chave e copie manualmente.", "erro"); };
    if (navigator.clipboard) navigator.clipboard.writeText(texto).then(ok, falha);
    else falha();
  });

  /* ---------- Botões de demonstração (guia de estilo) ---------- */
  document.addEventListener("click", function (e) {
    var botao = e.target.closest("[data-toast]");
    if (botao) mostrarToast(botao.dataset.mensagem || "Mensagem de exemplo.", botao.dataset.toast);
  });

  /* ---------- Validação visual de formulários ---------- */
  function atualizarCampo(controle) {
    var campo = controle.closest(".campo");
    if (!campo) return;
    var erro = campo.querySelector(".mensagem-erro");
    var valido = controle.checkValidity();
    var vazio = controle.value === "" && !controle.required;
    campo.classList.toggle("is-invalido", !valido);
    campo.classList.toggle("is-valido", valido && !vazio);
    controle.setAttribute("aria-invalid", String(!valido));
    if (valido) {
      if (erro) erro.remove();
      controle.removeAttribute("aria-describedby");
      return;
    }
    if (!erro) {
      erro = document.createElement("small");
      erro.className = "mensagem-erro";
      erro.id = controle.id + "-erro";
      campo.appendChild(erro);
      controle.setAttribute("aria-describedby", ((controle.getAttribute("aria-describedby") || "") + " " + erro.id).trim());
    }
    erro.textContent = controle.validity.patternMismatch && controle.title ? controle.title : controle.validationMessage;
  }

  document.querySelectorAll("form[data-validar]").forEach(function (form) {
    var controles = form.querySelectorAll(".campo input, .campo select, .campo textarea");
    controles.forEach(function (c) {
      c.addEventListener("blur", function () { if (c.value !== "" || c.required) atualizarCampo(c); });
      c.addEventListener("input", function () { if (c.closest(".campo").classList.contains("is-invalido")) atualizarCampo(c); });
      c.addEventListener("change", function () { atualizarCampo(c); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      controles.forEach(atualizarCampo);
      if (!form.checkValidity()) {
        var primeiro = form.querySelector(":invalid");
        if (primeiro) primeiro.focus();
        mostrarToast("Revise os campos destacados antes de enviar.", "erro");
        return;
      }
      mostrarToast("Validação concluída. Este formulário é uma demonstração e não envia dados.", "info", 7000);
      var modal = document.getElementById("modal-sucesso");
      if (modal && modal.showModal) modal.showModal();
      form.reset();
      controles.forEach(function (c) { c.removeAttribute("aria-invalid"); c.removeAttribute("aria-describedby"); });
      form.querySelectorAll(".is-valido, .is-invalido").forEach(function (c) { c.classList.remove("is-valido", "is-invalido"); });
    });

    form.addEventListener("reset", function () {
      form.querySelectorAll(".mensagem-erro").forEach(function (m) { m.remove(); });
      controles.forEach(function (c) { c.removeAttribute("aria-invalid"); c.removeAttribute("aria-describedby"); });
      form.querySelectorAll(".is-valido, .is-invalido").forEach(function (c) { c.classList.remove("is-valido", "is-invalido"); });
    });
  });
})();

/* Máscaras de entrada para CPF, telefone e CEP.
   A validação continua sendo feita pelos atributos HTML5 (required, pattern). */
function somenteNumeros(valor) {
  return valor.replace(/\D/g, "");
}

function mascaraCPF(valor) {
  return somenteNumeros(valor)
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function mascaraTelefone(valor) {
  const n = somenteNumeros(valor).slice(0, 11);
  if (n.length <= 2) return n.replace(/(\d{1,2})/, "($1");
  if (n.length <= 10) return n.replace(/(\d{2})(\d{0,4})(\d{0,4})/, "($1) $2-$3").replace(/-$/, "");
  return n.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}

function mascaraCEP(valor) {
  return somenteNumeros(valor).slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2");
}

function aplicarMascara(id, funcao) {
  const campo = document.getElementById(id);
  if (!campo) return;
  campo.addEventListener("input", function () {
    campo.value = funcao(campo.value);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  aplicarMascara("cpf", mascaraCPF);
  aplicarMascara("telefone", mascaraTelefone);
  aplicarMascara("cep", mascaraCEP);
});

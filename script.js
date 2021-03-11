var botaoSimular = document.querySelector(".simular");
var valorEl = document.getElementById("valor");
var prazoAnosEl = document.getElementById("prazoAnos");
var jurosAnoEl = document.getElementById("jurosAno");
var prazoMesesEl = document.getElementById("prazoMes");
var jurosMesEl = document.getElementById("jurosMes");
var jurosAcuEl = document.getElementById("jurosAcu");
var prestacaoEl = document.getElementById("prestacao");
var amortizacaoEl = document.getElementById("amortizacao");
var jurosEl = document.getElementById("juros");
var totaisEl = document.getElementById("totais");
var titulosEl = document.querySelectorAll("h3");
var prestacoesIniciais = 5;
var valor, prazoAnos, jurosAno, prazoMeses, jurosMes, jurosAcu, amortizacao;

botaoSimular.addEventListener("click", simular);

function simular() {
  valor = valorEl.valueAsNumber;
  prazoAnos = prazoAnosEl.valueAsNumber;
  jurosAno = jurosAnoEl.valueAsNumber;
  limpaResultados();
  exibeTitulos();
  calculaPrazo();
  calculaJurosMes();
  calculaAmortizacao();
  exibeAmortizacao();
  calculaJurosAcumulados();
  exibePrestacoes();
  exibeJurosIniciais();
  exibeTotaisIniciais();
}

function calculaPrazo() {
  prazoMeses = prazoAnos * 12;
  prazoMesesEl.value = prazoMeses;
}

function calculaJurosMes() {
  jurosMes = (1 + jurosAno) ** (1 / 12) - 1;
  jurosMesEl.value = jurosMes;
}

function calculaAmortizacao() {
  amortizacao = valor / prazoMeses;
}

function calculaJurosAcumulados() {
  var jurosAcumulados = 0;
  for (i = 1; i <= prazoMeses; i++) {
    jurosAcumulados += calculaJurosDoMes(i);
  }

  jurosAcuEl.value = jurosAcumulados.toFixed(2);
}

function calculaJurosDoMes(parcela) {
  return (valor - calculaAmortizadoAcumulado(parcela)) * jurosMes;
}

function calculaAmortizadoAcumulado(parcela) {
  return (parcela - 1) * amortizacao;
}

function limpaResultados() {
  if (prestacao.children[1] != undefined) {
    for (i = 1; i <= prestacoesIniciais; i++) {
      prestacaoEl.removeChild(prestacaoEl.lastChild);
      amortizacaoEl.removeChild(amortizacaoEl.lastChild);
      jurosEl.removeChild(jurosEl.lastChild);
      totaisEl.removeChild(totaisEl.lastChild);
    }
  }
}

function exibeTitulos() {
  for (i = 0; i < 4; i++) {
    titulosEl[i].style.display = "block";
    prestacaoEl.style.display = "block";
    amortizacaoEl.style.display = "block";
    jurosEl.style.display = "block";
    totaisEl.style.display = "block";
  }
}

function exibePrestacoes() {
  for (i = 1; i <= prestacoesIniciais; i++) {
    var p = document.createElement("p");
    var text = document.createTextNode(i + "ª");
    p.appendChild(text);
    prestacaoEl.appendChild(p);
  }
}

function exibeAmortizacao() {
  for (i = 1; i <= prestacoesIniciais; i++) {
    var p = document.createElement("p");
    var text = document.createTextNode("R$ " + amortizacao.toFixed(2));
    p.appendChild(text);
    amortizacaoEl.appendChild(p);
  }
}

function exibeJurosIniciais() {
  for (i = 1; i <= prestacoesIniciais; i++) {
    var p = document.createElement("p");
    var text = document.createTextNode("R$ " + calculaJurosDoMes(i).toFixed(2));
    p.appendChild(text);
    jurosEl.appendChild(p);
  }
}

function exibeTotaisIniciais() {
  var total;

  for (i = 1; i <= prestacoesIniciais; i++) {
    var p = document.createElement("p");
    total = amortizacao + calculaJurosDoMes(i);
    var text = document.createTextNode("R$ " + total.toFixed(2));
    p.appendChild(text);
    totaisEl.appendChild(p);
  }
}

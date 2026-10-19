const WHATSAPP = "5584991421656";

const MENSAGENS = {
  oi: "Olá! Vim pelo site da Synex Sistemas e gostaria de conversar com um especialista sobre o meu negócio.",
  diagnostico: "Olá! Vim pelo site da Synex Sistemas e gostaria de solicitar o diagnóstico gratuito da minha presença digital.",
  contato: "Olá! Vim pelo site da Synex Sistemas e quero saber como ter um site ou sistema sob medida para o meu negócio.",
  duvida: "Olá! Vim pelo site da Synex Sistemas e tenho uma dúvida:",
  modernizar: "Olá! Vi o comparativo no site da Synex Sistemas e quero modernizar o atendimento da minha empresa.",
  presencial: "Olá! Sou da região de Natal/Parnamirim e gostaria de agendar uma reunião presencial para conhecer as soluções da Synex para a minha empresa.",
  vitrine: "Olá! Vi a demonstração de atendimento automático no site da Synex Sistemas e quero uma automação assim no meu negócio.",
};

const linkWhatsApp = (texto) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;

const abrirFora = (a) => {
  a.target = "_blank";
  a.rel = "noopener";
};

document.querySelectorAll("[data-wa]").forEach((a) => {
  a.href = linkWhatsApp(MENSAGENS[a.dataset.wa] || MENSAGENS.oi);
  abrirFora(a);
});

const topo = document.getElementById("topo");
const onScroll = () => topo.classList.toggle("rolou", window.scrollY > 20);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
const alternarMenu = (abrir) => {
  menu.classList.toggle("aberto", abrir);
  burger.setAttribute("aria-expanded", String(abrir));
  burger.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
};
burger.addEventListener("click", () => alternarMenu(!menu.classList.contains("aberto")));
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => alternarMenu(false)));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu.classList.contains("aberto")) {
    alternarMenu(false);
    burger.focus();
  }
});

document.getElementById("ano").textContent = new Date().getFullYear();

const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const note = document.getElementById("note");
const heroPainel = document.getElementById("heroPainel");
const pedidoFlutua = heroPainel.querySelector(".flutua--pedido");

function abrirNote() {
  const t = (ms) => (reduzMovimento ? 0 : ms);
  note.classList.add("aberto");
  setTimeout(() => {
    note.classList.add("ligado");
  }, t(900));
  setTimeout(() => pedidoFlutua.classList.add("mostra"), t(3200));
}

const obsNote = new IntersectionObserver(
  (entradas) => {
    if (!entradas[0].isIntersecting) return;
    obsNote.disconnect();
    setTimeout(abrirNote, reduzMovimento ? 0 : 250);
  },
  { threshold: 0.35 }
);
obsNote.observe(note);

const blocos = document.querySelectorAll(
  ".secao__cab, .lado, .card, .vitrine__palco, .vitrine__cta, .passos li, .duelo__card, .duelo__cta, .pilar, .presencial__cta, .faq, .final__in"
);
const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("vis");
      observador.unobserve(e.target);
    });
  },
  { threshold: 0.15 }
);
blocos.forEach((b, i) => {
  b.classList.add("rev");
  b.style.transitionDelay = `${(i % 4) * 80}ms`;
  observador.observe(b);
});

const comparar = document.getElementById("comparar");
const obsComparar = new IntersectionObserver(
  (entradas) => {
    if (!entradas[0].isIntersecting) return;
    comparar.querySelectorAll(".carga i").forEach((b) => (b.style.width = b.dataset.alvo + "%"));
    obsComparar.disconnect();
  },
  { threshold: 0.4 }
);
obsComparar.observe(comparar);

const ICONES = {
  lampada: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
  quadra: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M12 5v14"/><circle cx="12" cy="12" r="3"/>',
  camiseta: '<path d="M8 3 3 6l2 4 3-1v12h8V9l3 1 2-4-5-3a4 4 0 0 1-8 0z"/>',
  agenda: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
};
const icone = (nome) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONES[nome]}</svg>`;

const CENARIOS = [
  {
    nicho: "Loja de Iluminação",
    loja: "Lumen Iluminação LED",
    icone: "lampada",
    cliente:
      "Olá! Gostaria de fechar o pedido do site:<br><b>2x</b> Refletor LED 100W (Branco Frio)<br><b>1x</b> Fita LED 5m<br><b>Total: R$ 389,70</b><br>Endereço: Capim Macio, Natal.",
    resposta: "Pedido <b>#1042</b> confirmado! 💡 Separando no estoque. Segue a chave Pix com desconto:",
    acao: "Copiar chave Pix",
  },
  {
    nicho: "Centro Esportivo",
    loja: "Arena & Sport Club",
    icone: "quadra",
    cliente:
      "Reserva solicitada pelo site:<br><b>Quadra de Beach Tennis</b><br>Quinta-feira às 19:00 (1h)<br>Aluguel de 2 raquetes<br><b>Total: R$ 90,00</b>",
    resposta: "Horário reservado com sucesso! 🎾 Enviamos o comprovante para a portaria. Bom jogo!",
  },
  {
    nicho: "Moda & Varejo",
    loja: "Use Urban Store",
    icone: "camiseta",
    cliente:
      "Novo pedido via catálogo:<br><b>1x</b> Camiseta Oversized Preta (Tam G)<br><b>1x</b> Boné Strapback<br><b>Total: R$ 179,90</b><br>Retirada no balcão.",
    resposta: "Pedido recebido! 📦 Já estamos separando seu pacote na loja. Te avisamos assim que estiver pronto para retirada!",
  },
  {
    nicho: "Prestação de Serviços",
    loja: "Clínica & Estética",
    icone: "agenda",
    cliente:
      "Agendamento pelo portal:<br><b>Avaliação Inicial com Especialista</b><br>Sexta às 14:30<br>Paciente: Lucas Silva",
    resposta: "Olá, Lucas! Consulta pré-agendada na agenda do doutor. 📅 Confirmamos sua presença por aqui 2h antes!",
  },
];

const ROTEIRO = [
  [500, "enviar"],
  [1300, "lido"],
  [1600, "digitar"],
  [3100, "responder"],
  [7000, "sair"],
];
const DURACAO = 7500;

const vitrine = {
  celular: document.getElementById("vitrineCelular"),
  nichos: document.getElementById("vitrineNichos"),
  chat: document.getElementById("waChat"),
  nome: document.getElementById("waNome"),
  status: document.getElementById("waStatus"),
  avatar: document.getElementById("waAvatar"),
  ilha: document.querySelector("#vitrineCelular .celular__ilha"),
  cta: document.querySelector('[data-wa="vitrine"]'),
  atual: 0,
  tempo: 0,
  passo: 0,
  pausado: false,
  visivel: false,
  ultimo: 0,
};

vitrine.nichos.innerHTML = CENARIOS.map(
  (c, i) => `<button type="button" class="nicho" data-i="${i}">${icone(c.icone)}${c.nicho}</button>`
).join("");
const botoesNicho = [...vitrine.nichos.querySelectorAll(".nicho")];

const horaAgora = () => new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

function rolarChat() {
  vitrine.chat.scrollTo({ top: vitrine.chat.scrollHeight, behavior: reduzMovimento ? "auto" : "smooth" });
}

function balao(html, lado) {
  const b = document.createElement("div");
  b.className = `balao balao--${lado}`;
  b.innerHTML = `${html}<span class="balao__hora">${horaAgora()}${lado === "eu" ? '<i class="checks"></i>' : ""}</span>`;
  vitrine.chat.appendChild(b);
  rolarChat();
  return b;
}

const ACOES = {
  enviar() {
    balao(CENARIOS[vitrine.atual].cliente, "eu");
    vitrine.ilha.classList.add("ativa");
  },
  lido() {
    vitrine.chat.querySelector(".balao--eu:last-of-type .checks")?.classList.add("lido");
  },
  digitar() {
    vitrine.status.textContent = "digitando...";
    vitrine.status.classList.add("digitando");
    const bolha = document.createElement("div");
    bolha.className = "digitando-bolha";
    bolha.innerHTML = "<i></i><i></i><i></i>";
    vitrine.chat.appendChild(bolha);
    rolarChat();
  },
  responder() {
    const c = CENARIOS[vitrine.atual];
    vitrine.chat.querySelector(".digitando-bolha")?.remove();
    vitrine.status.textContent = "online";
    vitrine.status.classList.remove("digitando");
    balao(c.acao ? `${c.resposta}<span class="balao__acao">${c.acao}</span>` : c.resposta, "ele");
  },
  sair() {
    vitrine.celular.classList.add("troca");
    vitrine.ilha.classList.remove("ativa");
  },
};

function carregarCenario(i) {
  const c = CENARIOS[i];
  vitrine.atual = i;
  vitrine.tempo = 0;
  vitrine.passo = 0;
  vitrine.chat.innerHTML = '<p class="wa__dia">HOJE</p>';
  vitrine.nome.textContent = c.loja;
  vitrine.avatar.innerHTML = icone(c.icone);
  vitrine.status.textContent = "online";
  vitrine.status.classList.remove("digitando");
  vitrine.celular.classList.remove("troca");
  botoesNicho.forEach((b, j) => {
    b.setAttribute("aria-current", String(j === i));
    b.style.setProperty("--p", 0);
  });
  vitrine.cta.href = linkWhatsApp(
    `Olá! Vi no site da Synex Sistemas a demonstração de atendimento automático (${c.nicho}) e quero uma automação assim no meu negócio.`
  );
}

function quadro(agora) {
  const dt = Math.min(agora - (vitrine.ultimo || agora), 100);
  vitrine.ultimo = agora;
  if (!vitrine.pausado && vitrine.visivel) {
    vitrine.tempo += dt;
    while (vitrine.passo < ROTEIRO.length && vitrine.tempo >= ROTEIRO[vitrine.passo][0]) {
      ACOES[ROTEIRO[vitrine.passo][1]]();
      vitrine.passo++;
    }
    botoesNicho[vitrine.atual].style.setProperty("--p", Math.min(1, vitrine.tempo / DURACAO));
    if (vitrine.tempo >= DURACAO) carregarCenario((vitrine.atual + 1) % CENARIOS.length);
  }
  vitrine.rodando = vitrine.visivel;
  if (vitrine.rodando) requestAnimationFrame(quadro);
}

function pausar(estado) {
  vitrine.pausado = estado;
  vitrine.celular.classList.toggle("pausado", estado);
}

vitrine.celular.addEventListener("pointerenter", (e) => e.pointerType === "mouse" && pausar(true));
vitrine.celular.addEventListener("pointerleave", (e) => e.pointerType === "mouse" && pausar(false));
vitrine.celular.addEventListener("click", (e) => {
  if (e.pointerType !== "mouse") pausar(!vitrine.pausado);
});
vitrine.celular.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Enter") {
    e.preventDefault();
    pausar(!vitrine.pausado);
  }
});

vitrine.nichos.addEventListener("click", (e) => {
  const b = e.target.closest(".nicho");
  if (!b) return;
  carregarCenario(Number(b.dataset.i));
  pausar(false);
});

new IntersectionObserver(
  (entradas) => {
    vitrine.visivel = entradas[0].isIntersecting;
    if (vitrine.visivel && !vitrine.rodando) {
      vitrine.rodando = true;
      vitrine.ultimo = 0;
      requestAnimationFrame(quadro);
    }
  },
  { threshold: 0.3 }
).observe(vitrine.celular);

carregarCenario(0);

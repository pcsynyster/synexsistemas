const WHATSAPP = "5584991421656";

const MENSAGENS = {
  oi: "Olá! Vim pelo site da Synex Sistemas e gostaria de conversar com um especialista sobre o meu negócio.",
  diagnostico: "Olá! Vim pelo site da Synex Sistemas e gostaria de solicitar o diagnóstico gratuito da minha presença digital.",
  contato: "Olá! Vim pelo site da Synex Sistemas e quero saber como ter um site ou sistema sob medida para o meu negócio.",
  duvida: "Olá! Vim pelo site da Synex Sistemas e tenho uma dúvida:",
  presencial: "Olá! Sou da região de Natal/Parnamirim e gostaria de agendar uma reunião presencial para conhecer as soluções da Synex para a minha empresa.",
  parcelar: "Olá! Vi no site da Synex Sistemas que dá para parcelar em até 12x e quero saber mais sobre o meu projeto.",
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
const abertura = document.querySelector(".abertura");
const onScroll = () => topo.classList.toggle("rolou", window.scrollY > abertura.offsetHeight - topo.offsetHeight - 10);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);

const intro = document.getElementById("intro");
if (intro) setTimeout(() => intro.remove(), 2800);

const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
const alternarMenu = (abrir) => {
  menu.classList.toggle("aberto", abrir);
  document.body.classList.toggle("menu-aberto", abrir);
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
const blocos = document.querySelectorAll(
  ".secao__cab, .barra, .spec, .card, .vitrine__palco, .vitrine__cta, .etapa, .pilar, .presencial__cta, .motivos__cab, .faq, .final__in, .editorial__texto, .editorial__fig, .espalhadas__texto, .oferta__in"
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
    comparar.querySelectorAll(".barra__trilho i").forEach((b) => (b.style.width = b.dataset.alvo + "%"));
    obsComparar.disconnect();
  },
  { threshold: 0.4 }
);
obsComparar.observe(comparar);

const trilha = document.getElementById("trilha");
const obsTrilha = new IntersectionObserver(
  (entradas) => {
    if (!entradas[0].isIntersecting) return;
    trilha.classList.add("ativa");
    obsTrilha.disconnect();
  },
  { threshold: 0.35 }
);
obsTrilha.observe(trilha);

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
    resposta: "Pedido <b>#1042</b> confirmado! Separando no estoque. Segue a chave Pix com desconto:",
    acao: "Copiar chave Pix",
  },
  {
    nicho: "Centro Esportivo",
    loja: "Arena & Sport Club",
    icone: "quadra",
    cliente:
      "Reserva solicitada pelo site:<br><b>Quadra de Beach Tennis</b><br>Quinta-feira às 19:00 (1h)<br>Aluguel de 2 raquetes<br><b>Total: R$ 90,00</b>",
    resposta: "Horário reservado com sucesso! Enviamos o comprovante para a portaria. Bom jogo!",
  },
  {
    nicho: "Moda & Varejo",
    loja: "Use Urban Store",
    icone: "camiseta",
    cliente:
      "Novo pedido via catálogo:<br><b>1x</b> Camiseta Oversized Preta (Tam G)<br><b>1x</b> Boné Strapback<br><b>Total: R$ 179,90</b><br>Retirada no balcão.",
    resposta: "Pedido recebido! Já estamos separando seu pacote na loja. Te avisamos assim que estiver pronto para retirada!",
  },
  {
    nicho: "Prestação de Serviços",
    loja: "Clínica & Estética",
    icone: "agenda",
    cliente:
      "Agendamento pelo portal:<br><b>Avaliação Inicial com Especialista</b><br>Sexta às 14:30<br>Paciente: Lucas Silva",
    resposta: "Olá, Lucas! Consulta pré-agendada na agenda do doutor. Confirmamos sua presença por aqui 2h antes!",
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
    vitrine.status.textContent = "digitando…";
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
    if (vitrine.tempo >= DURACAO) carregarCenario((vitrine.atual + 1) % CENARIOS.length);
  }
  vitrine.rodando = vitrine.visivel;
  if (vitrine.rodando) requestAnimationFrame(quadro);
}

carregarCenario(0);

if (reduzMovimento) {
  ACOES.enviar();
  ACOES.lido();
  ACOES.responder();
} else {
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
}

const trilho = document.getElementById("motivosTrilho");
const setas = document.querySelectorAll(".motivos__seta");
const atualizarSetas = () => {
  setas[0].disabled = trilho.scrollLeft < 8;
  setas[1].disabled = trilho.scrollLeft + trilho.clientWidth > trilho.scrollWidth - 8;
};
setas.forEach((b) =>
  b.addEventListener("click", () => {
    const passo = trilho.querySelector(".motivo").offsetWidth + 20;
    trilho.scrollBy({ left: passo * Number(b.dataset.dir), behavior: reduzMovimento ? "auto" : "smooth" });
  })
);
trilho.addEventListener("scroll", atualizarSetas, { passive: true });
window.addEventListener("resize", atualizarSetas);
atualizarSetas();

(() => {
  const cv = document.getElementById("particulas");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  const reduzir = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const PALAVRA = "SYNEX";
  let w = 0, h = 0, dpr = 1, ps = [], visivel = true, raf = 0;
  const mouse = { x: -999, y: -999, ativo: false };

  const montar = () => {
    const r = cv.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = r.width; h = r.height;
    if (!w || !h) return;
    cv.width = w * dpr; cv.height = h * dpr;
    const off = document.createElement("canvas");
    off.width = w; off.height = h;
    const o = off.getContext("2d");
    const fam = getComputedStyle(document.documentElement).getPropertyValue("--fonte-luxo") || "Georgia, serif";
    let fs = h * 0.78;
    o.font = `400 ${fs}px ${fam}`;
    const m = o.measureText(PALAVRA).width;
    if (m > w * 0.88) { fs *= (w * 0.88) / m; o.font = `400 ${fs}px ${fam}`; }
    o.textAlign = "center"; o.textBaseline = "middle";
    o.fillStyle = "#000";
    o.strokeStyle = "#000"; o.lineJoin = "round"; o.lineWidth = fs * 0.045;
    o.strokeText(PALAVRA, w / 2, h * 0.54);
    o.fillText(PALAVRA, w / 2, h * 0.54);
    const d = o.getImageData(0, 0, w, h).data;
    const passo = w < 600 ? 4 : 5;
    const alvos = [];
    for (let y = 0; y < h; y += passo)
      for (let x = 0; x < w; x += passo)
        if (d[(y * w + x) * 4 + 3] > 128) alvos.push([x, y]);
    ps = alvos.map(([x, y]) => {
      const a = Math.random() * Math.PI * 2, dist = Math.max(w, h) * (0.4 + Math.random() * 0.6);
      return { tx: x, ty: y, x: w / 2 + Math.cos(a) * dist, y: h / 2 + Math.sin(a) * dist, vx: 0, vy: 0, r: 1 + Math.random() * 0.9, c: Math.random() < 0.07 };
    });
  };

  const quadro = () => {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const raio = Math.min(w, h) * 0.22, r2 = raio * raio;
    for (const p of ps) {
      let ax = (p.tx - p.x) * 0.045, ay = (p.ty - p.y) * 0.045;
      if (mouse.ativo) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y, q = dx * dx + dy * dy;
        if (q < r2 && q > 0.01) {
          const f = (1 - Math.sqrt(q) / raio) * 7, n = Math.sqrt(q);
          ax += (dx / n) * f; ay += (dy / n) * f;
        }
      }
      p.vx = (p.vx + ax) * 0.82; p.vy = (p.vy + ay) * 0.82;
      p.x += p.vx; p.y += p.vy;
      ctx.fillStyle = p.c ? "#8a8a85" : "#0b0b0b";
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill();
    }
    raf = visivel ? requestAnimationFrame(quadro) : 0;
  };

  const desenharEstatico = () => {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#0b0b0b";
    for (const p of ps) { ctx.beginPath(); ctx.arc(p.tx, p.ty, p.r, 0, 6.2832); ctx.fill(); }
  };

  const mover = (e) => {
    const r = cv.getBoundingClientRect(), t = e.touches ? e.touches[0] : e;
    mouse.x = t.clientX - r.left; mouse.y = t.clientY - r.top; mouse.ativo = true;
  };
  cv.addEventListener("pointermove", mover);
  cv.addEventListener("pointerdown", mover);
  cv.addEventListener("pointerleave", () => { mouse.ativo = false; });
  cv.addEventListener("pointerup", () => { mouse.ativo = false; });

  const iniciar = () => {
    montar();
    if (reduzir) { desenharEstatico(); return; }
    if (!raf) raf = requestAnimationFrame(quadro);
  };
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(iniciar);
  let t;
  addEventListener("resize", () => { clearTimeout(t); t = setTimeout(iniciar, 150); });
  new IntersectionObserver(([e]) => {
    visivel = e.isIntersecting;
    if (visivel && !raf && !reduzir) raf = requestAnimationFrame(quadro);
  }).observe(cv);
})();

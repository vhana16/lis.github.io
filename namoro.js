// namoro.js — versão completa atualizada
const carta = document.getElementById('carta');
const pedido = document.getElementById('pedido');
const simbtn = document.getElementById('simbtn');
const naobtn = document.getElementById('naobtn');
const musica = document.getElementById('musica');
const cortina = document.getElementById("cortina");
const canvas = document.getElementById("estrelas");
const ctx = canvas.getContext("2d");
const containerImg = document.getElementById("estrelascomimg");
const containerEstrelas = document.getElementById("estrelaspenduradas");
const envelope = document.getElementById("envelope");

// canvas responsivo
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* ---------- estado inicial do pedido/botões ---------- */
if (pedido) {
  pedido.style.display = "none";
  // move o pedido para body mais tarde quando necessário
}
const botoesContainer = document.querySelector(".botoes");
if (botoesContainer) botoesContainer.style.display = "none";

/* ---------- evento: clicar na carta mostra o pedido (modal) ---------- */
carta.addEventListener("click", () => {
  // garante que o pedido esteja no body para evitar problemas de stacking
  if (pedido.parentElement !== document.body) {
    document.body.appendChild(pedido);
    pedido.style.position = "fixed";
    pedido.style.left = "50%";
    pedido.style.top = "50%";
    pedido.style.transform = "translate(-50%, -50%) scale(0)";
    pedido.style.opacity = "0";
    pedido.style.zIndex = "10001";
    pedido.style.display = "block";
    pedido.style.transition = "transform 0.25s ease, opacity 0.25s ease";
  } else {
    pedido.style.display = "block";
    pedido.style.transition = "transform 0.25s ease, opacity 0.25s ease";
    pedido.style.opacity = "0";
    pedido.style.transform = "translate(-50%, -50%) scale(0)";
  }

  // anima o modal do pedido
  requestAnimationFrame(() => {
    pedido.style.transform = "translate(-50%, -50%) scale(1)";
    pedido.style.opacity = "1";
    if (botoesContainer) botoesContainer.style.display = "flex";
  });
});

/* ---------- botões SIM / NÃO ---------- */
simbtn.addEventListener("click", () => {
  alert("Agora sou oficialmente seu homem, minha querida☝️");

  // mostra e coloca as camadas das estrelas por cima (ajusta z-index)
  canvas.style.display = "block";
  canvas.style.zIndex = 1001;

  containerEstrelas.style.display = "block";
  containerEstrelas.style.zIndex = 1002;

  containerImg.style.display = "block";
  containerImg.style.zIndex = 1003;

  // inicia as animações das estrelas
  desenharEstrelas();
  criarEstrelasPenduradas();
  criarEstrelasComImagens();

  // sobe a cortina
  cortina.style.top = "0";

  // fade out do envelope / carta / pedido
  envelope.style.transition = "opacity 2s ease";
  carta.style.transition = "opacity 2s ease";
  pedido.style.transition = "opacity 2s ease";

  // garantir que carta/pedido estão no body pra não ter stacking weird
  if (carta.parentElement !== document.body) document.body.appendChild(carta);
  if (pedido.parentElement !== document.body) {
    document.body.appendChild(pedido);
    // garante estilo caso nunca tenha sido mostrado
    pedido.style.position = "fixed";
    pedido.style.left = "50%";
    pedido.style.top = "50%";
    pedido.style.transform = "translate(-50%, -50%) scale(0)";
    pedido.style.opacity = "0";
    pedido.style.zIndex = "10001";
    pedido.style.display = "none";
    pedido.style.transition = "transform 0.25s ease, opacity 0.25s ease";
  }

  envelope.style.opacity = 0;
  carta.style.opacity = 0;
  pedido.style.opacity = 0;

  setTimeout(() => {
    envelope.style.display = "none";
    carta.style.display = "none";
    pedido.style.display = "none";
  }, 2000);

  // acelera as estrelas enquanto a cortina sobe
  const acelerar = 4;
  estrelas.forEach(star => star.speed *= acelerar);
});

naobtn.addEventListener("click", () => {
  alert("Mentira isso aí, se for verdade eu continuo te amando");
});

/* ---------- estrelas (canvas + elementos) ---------- */
const estrelas = [];
for (let i = 0; i < 100; i++) {
  estrelas.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    speed: Math.random() * 0.5 + 0.2
  });
}

function desenharEstrelas() {
  // se o canvas estiver invisível, evita rodar
  if (!canvas || canvas.style.display === "none") return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  estrelas.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(desenharEstrelas);
}

function criarEstrelasPenduradas() {
  const cores = ["#fff", "#ffd700", "#ff69b4"];
  for (let i = 0; i < 20; i++) {
    const estrela = document.createElement("div");
    estrela.classList.add("estrela");
    const cor = cores[Math.floor(Math.random() * cores.length)];
    estrela.style.background = cor;

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight * 0.5;
    estrela.style.left = `${x}px`;
    estrela.style.top = `${y}px`;

    const fio = document.createElement("div");
    fio.classList.add("fio");
    fio.style.height = `${y}px`;
    fio.style.left = `${x + 9}px`;

    containerEstrelas.appendChild(fio);
    containerEstrelas.appendChild(estrela);

    let velocidade = Math.random() * 1 + 0.5;
    (function animar() {
      let topAtual = parseFloat(estrela.style.top);
      if (topAtual < window.innerHeight) {
        estrela.style.top = `${topAtual + velocidade}px`;
        fio.style.height = `${parseFloat(fio.style.height) + velocidade}px`;
        requestAnimationFrame(animar);
      } else {
        estrela.style.top = '0px';
        estrela.style.left = `${Math.random() * window.innerWidth}px`;
        fio.style.height = '0px';
        animar();
      }
    })();
  }
}

function criarEstrelasComImagens() {
  const imagens = ["img/red.png", "img/blue.png"];
  for (let i = 0; i < 20; i++) {
    const estrela = document.createElement("img");
    estrela.src = imagens[Math.floor(Math.random() * imagens.length)];
    estrela.classList.add("estrela-img");
    estrela.style.left = `${Math.random() * window.innerWidth}px`;
    estrela.style.top = `${Math.random() * window.innerHeight * 0.5}px`;

    containerImg.appendChild(estrela);

    let velocidade = Math.random() * 1 + 0.5;
    (function animar() {
      let topAtual = parseFloat(estrela.style.top);
      if (topAtual < window.innerHeight) {
        estrela.style.top = `${topAtual + velocidade}px`;
        requestAnimationFrame(animar);
      } else {
        estrela.style.top = "0px";
        estrela.style.left = `${Math.random() * window.innerWidth}px`;
        animar();
      }
    })();
  }
}

/* ---------- handler envelope: carta sai subindo de dentro e desce na frente ---------- */
let cartaAnimada = false;

envelope.addEventListener("click", () => {
  if (cartaAnimada) return;
  cartaAnimada = true;

  // abre tampa e toca música
  envelope.classList.add("abrir");
  musica.play();

  // rects/dimensões
  const rect = carta.getBoundingClientRect();
  const envRect = envelope.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;

  // início: mais pra cima dentro do envelope (assim ela não "saí de baixo")
  const startTop = Math.round(envRect.top + Math.max(8, envRect.height * 0.12));

  // sobe bastante (bem acima do envelope)
  const upTop = Math.max(6, Math.round(envRect.top - Math.min(h * 0.8, 300)));

  // final: na frente do envelope (alto)
  const finalLeft = Math.round((window.innerWidth - w) / 2);
  const finalTop = Math.max(6, Math.round(envRect.top + 10));

  // move carta e pedido para body se necessário (remove overflow)
  if (carta.parentElement !== document.body) document.body.appendChild(carta);
  if (pedido.parentElement !== document.body) {
    document.body.appendChild(pedido);
    pedido.style.position = "fixed";
    pedido.style.left = "50%";
    pedido.style.top = "50%";
    pedido.style.transform = "translate(-50%, -50%) scale(0)";
    pedido.style.opacity = "0";
    pedido.style.zIndex = "10001";
    pedido.style.display = "none";
    pedido.style.transition = "transform 0.25s ease, opacity 0.25s ease";
  }

  // fixa carta na posição inicial VISUAL (dentro do envelope, mais alto)
  carta.style.position = "fixed";
  carta.style.width = `${w}px`;
  carta.style.left = `${rect.left}px`;
  carta.style.top = `${startTop}px`;
  carta.style.zIndex = "2"; // abaixo da tampa no começo
  carta.style.margin = "0";
  carta.style.transform = "none";
  carta.style.transition = "none";

  // reflow
  void carta.offsetWidth;

  // tempos de animação
  const upDuration = 700;
  const pauseBetween = 160;
  const downDuration = 900;

  // fase 1: subir (sair do envelope)
  carta.style.transition = `top ${upDuration}ms ease, left ${upDuration}ms ease, transform ${upDuration}ms ease`;
  carta.style.top = `${upTop}px`;
  carta.style.transform = "scale(1.04)";

  // quando já tiver emergido, coloca z-index alto pra ficar por cima da tampa
  setTimeout(() => {
    carta.style.zIndex = "9999";
  }, Math.round(upDuration * 0.55));

  // fase 2: depois descer devagar para frente do envelope (posição alta)
  setTimeout(() => {
    carta.style.transition = `top ${downDuration}ms cubic-bezier(.22,.9,.32,1), left ${downDuration}ms cubic-bezier(.22,.9,.32,1), transform ${downDuration}ms ease`;
    carta.style.top = `${finalTop}px`;
    carta.style.left = `${finalLeft}px`;
    carta.style.transform = "scale(1)";
  }, upDuration + pauseBetween);
});

/* ---------- resize do canvas ---------- */
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

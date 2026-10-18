// Número do WhatsApp (código do país + DDD + número)
const WHATSAPP = "557141035354";

const carros = [
  { nome: "Renault Sandero", ano: "2019/2020", km: "48.000 km", cambio: "Manual", tipo: "hatch", preco: 52900, img: "img/car1.jpg" },
  { nome: "Fiat Doblò", ano: "2018/2018", km: "72.000 km", cambio: "Manual", tipo: "utilitario", preco: 64900, img: "img/car2.jpg" },
  { nome: "Fiat Palio", ano: "2015/2016", km: "89.000 km", cambio: "Manual", tipo: "hatch", preco: 32900, img: "img/car3.jpg" },
  { nome: "Renault Logan", ano: "2020/2021", km: "41.000 km", cambio: "Manual", tipo: "sedan", preco: 58900, img: "img/car1.jpg" },
  { nome: "Fiat Siena", ano: "2016/2017", km: "80.000 km", cambio: "Manual", tipo: "sedan", preco: 39900, img: "img/car3.jpg" },
  { nome: "Fiat Doblò Adventure", ano: "2019/2020", km: "55.000 km", cambio: "Manual", tipo: "utilitario", preco: 74900, img: "img/car2.jpg" }
];

const linkZap = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
const real = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

function render(filtro) {
  const grid = document.getElementById("grid");
  grid.innerHTML = carros
    .filter((c) => filtro === "todos" || c.tipo === filtro)
    .map((c) => {
      const msg = `Olá! Tenho interesse no ${c.nome} ${c.ano} (${real(c.preco)}) que vi no site. Ainda está disponível?`;
      return `
      <article class="card">
        <img src="${c.img}" alt="${c.nome}" loading="lazy">
        <div class="card-body">
          <h3>${c.nome}</h3>
          <div class="specs"><span>${c.ano}</span><span>${c.km}</span><span>${c.cambio}</span></div>
          <div class="preco">${real(c.preco)}</div>
          <a class="btn btn-red" href="${linkZap(msg)}" target="_blank" rel="noopener">Tenho interesse – WhatsApp</a>
        </div>
      </article>`;
    })
    .join("");
}

document.querySelectorAll(".filtro").forEach((b) =>
  b.addEventListener("click", () => {
    document.querySelector(".filtro.ativo").classList.remove("ativo");
    b.classList.add("ativo");
    render(b.dataset.f);
  })
);

document.querySelectorAll(".js-zap").forEach((a) => {
  a.href = linkZap(a.dataset.msg);
  a.target = "_blank";
  a.rel = "noopener";
});

const menu = document.querySelector(".menu");
document.querySelector(".menu-btn").addEventListener("click", () => menu.classList.toggle("aberto"));
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => menu.classList.remove("aberto")));

document.getElementById("ano").textContent = new Date().getFullYear();
render("todos");

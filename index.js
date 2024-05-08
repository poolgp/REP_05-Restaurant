// Primeros platos
const primerosPlatos = [
  {
    nombrePlato: "Ensalada César",
    imagen: "EnsaladaCesar.png",
    precio: 12.5,
    alergenos: ["Gluten", "Lácteos"],
    categoria: "primerPlato",
  },
  {
    nombrePlato: "Sopa de Tomate",
    imagen: "SopaTomate.png",
    precio: 8.0,
    alergenos: ["Gluten"],
    categoria: "primerPlato",
  },
  {
    nombrePlato: "Carpaccio de Res",
    imagen: "CarpaccioRes.png",
    precio: 15.75,
    alergenos: ["Lácteos"],
    categoria: "primerPlato",
  },
];

// Segundos platos
const segundosPlatos = [
  {
    nombrePlato: "Filete de Salmón",
    imagen: "FileteSalmon.png",
    precio: 18.9,
    alergenos: ["Pescado"],
    categoria: "segundoPlato",
  },
  {
    nombrePlato: "Lasaña de Verduras",
    imagen: "LasañaVerduras.png",
    precio: 14.25,
    alergenos: ["Gluten", "Lácteos"],
    categoria: "segundoPlato",
  },
  {
    nombrePlato: "Pollo al Curry",
    imagen: "PolloCurry.png",
    precio: 16.5,
    alergenos: ["Lácteos"],
    categoria: "segundoPlato",
  },
];

// Postres
const postres = [
  {
    nombrePlato: "Tiramisú",
    imagen: "Tiramisu.png",
    precio: 9.5,
    alergenos: ["Gluten", "Lácteos"],
    categoria: "postre",
  },
  {
    nombrePlato: "Coulant de Chocolate",
    imagen: "CoulantChocolate.png",
    precio: 10.75,
    alergenos: ["Gluten", "Lácteos"],
    categoria: "postre",
  },
  {
    nombrePlato: "Frutas de Temporada",
    imagen: "FrutasTemporada.png",
    precio: 7.0,
    alergenos: [],
    categoria: "postre",
  },
];

// Bebidas
const bebidas = [
  {
    nombrePlato: "Vino Tinto",
    imagen: "VinoTinto.png",
    precio: 20.0,
    alergenos: [],
    categoria: "bebida",
  },
  {
    nombrePlato: "Agua Mineral",
    imagen: "AguaMineral.png",
    precio: 3.0,
    alergenos: [],
    categoria: "bebida",
  },
  {
    nombrePlato: "Refresco de Limón",
    imagen: "RefrescoLimon.png",
    precio: 4.5,
    alergenos: ["Gluten"],
    categoria: "bebida",
  },
];

let totalCuenta = 0;
let platosEnLista = [];

// Obtener referencias a los contenedores de cada tipo de plato
const primerPlatoContainer = document.querySelector(".primerPlato");
const segundoPlatoContainer = document.querySelector(".segundoPlato");
const postreContainer = document.querySelector(".postre");
const bebidasContainer = document.querySelector(".bebidas");

function crearCartaPlato(plato) {
  const carta = document.createElement("div");
  carta.classList.add("card");

  carta.style.height = "25rem";
  carta.style.width = "14rem";

  const imagen = document.createElement("img");
  imagen.classList.add("card-img-top");
  imagen.style.height = "222px";
  imagen.src = `img/${plato.imagen}`;
  imagen.alt = plato.nombrePlato;

  const cuerpoCarta = document.createElement("div");
  cuerpoCarta.classList.add("card-body", "d-flex", "flex-column");

  const titulo = document.createElement("h5");
  titulo.classList.add("card-title");
  titulo.textContent = plato.nombrePlato;

  const precio = document.createElement("p");
  precio.classList.add("card-text");
  precio.textContent = `Precio: ${plato.precio.toFixed(2)}€`;

  const alergenos = document.createElement("p");
  alergenos.classList.add("card-text");
  alergenos.textContent = `Alergenos: ${plato.alergenos.join(", ")}`;

  const botonAñadir = document.createElement("button");
  botonAñadir.classList.add("btn", "btn-primary", "w-100", "mt-auto");
  botonAñadir.textContent = "Añadir";
  botonAñadir.addEventListener("click", () => {
    agregarPlatoALista(plato);
  });

  cuerpoCarta.appendChild(titulo);
  cuerpoCarta.appendChild(precio);
  cuerpoCarta.appendChild(alergenos);
  cuerpoCarta.appendChild(botonAñadir);

  carta.appendChild(imagen);
  carta.appendChild(cuerpoCarta);

  return carta;
}

function mostrarPlatos(platos, contenedor) {
  contenedor.innerHTML = "";

  platos.forEach((plato) => {
    const carta = crearCartaPlato(plato);
    contenedor.appendChild(carta);
  });
}

mostrarPlatos(primerosPlatos, primerPlatoContainer);

mostrarPlatos(segundosPlatos, segundoPlatoContainer);

mostrarPlatos(postres, postreContainer);

mostrarPlatos(bebidas, bebidasContainer);

function agregarPlatoALista(plato) {
  const listaPlatos = document.querySelector(".listaPlatos");

  const platoElemento = document.createElement("div");
  platoElemento.classList.add("plato");

  const tituloPlato = document.createElement("h5");
  tituloPlato.textContent = plato.nombrePlato;

  const precioPlato = document.createElement("p");
  precioPlato.textContent = `Precio: ${plato.precio.toFixed(2)}€`;

  const botonEliminar = document.createElement("button");
  botonEliminar.classList.add(
    "btn",
    "btn-danger",
    "w-100",
    "mt-auto",
    "eliminar"
  );
  botonEliminar.textContent = "Eliminar";
  botonEliminar.addEventListener("click", () => {
    eliminarPlatoDeLista(plato, platoElemento);
  });

  platoElemento.appendChild(tituloPlato);
  platoElemento.appendChild(precioPlato);
  platoElemento.appendChild(botonEliminar);

  listaPlatos.appendChild(platoElemento);

  platosEnLista.push(plato);

  totalCuenta += plato.precio;
  actualizarTotalCuenta();
}

function actualizarTotalCuenta() {
  const totalCuentaElemento = document.querySelector(".totalCuenta");
  totalCuentaElemento.innerHTML = `<h3>Total: ${totalCuenta.toFixed(2)}€</h3>`;
}

function eliminarPlatoDeLista(plato, platoElemento) {
  const index = platosEnLista.indexOf(plato);
  if (index !== -1) {
    platosEnLista.splice(index, 1);
    platoElemento.remove();
    totalCuenta -= plato.precio;
    actualizarTotalCuenta();
  }
}

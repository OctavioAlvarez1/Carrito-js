//Identificando elementos
const carro = document.querySelector("#carro");
const listaCursos = document.querySelector("#lista-cursos");
const botonVaciarCarro = document.querySelector("#vaciar-carro");
const contenidoCarro = document.querySelector("#carro tbody");

//array para almacenar productos
let productosCarro = [];

listaCursos.addEventListener("click", agregarCurso);
botonVaciarCarro.addEventListener("click", vaciarCarro);
carro.addEventListener("click", eliminarCurso);

//Funciones
function agregarCurso(e) {
	e.preventDefault();

	if (e.target.classList.contains("agregar-carro")) {
		getDatosCursos(e.target.parentElement.parentElement);
	}
}

function getDatosCursos(curso) {
	const datosCursos = {
		imagen: curso.querySelector("img").src,
		titulo_curso: curso.querySelector("h4").textContent,
		precio_curso: curso.querySelector(".precio span").textContent,
		id_curso: curso.querySelector("a").getAttribute("data-id"),
		cantidad: 1,
	};

	for (let i = 0; i < productosCarro.length; i++) {
		if (productosCarro[i].id_curso == datosCursos.id_curso) {
			productosCarro[i].cantidad++;
			agregarACarro();
			return;
		}
	}

	productosCarro.push(datosCursos); //agrego el curso al array
	agregarACarro();
}

function agregarACarro() {
	limpiarCarro();

	console.log(productosCarro);

	//recorro el carro agregando los cursos
	productosCarro.forEach((curso) => {
		const filaTabla = document.createElement("tr");
		filaTabla.innerHTML = `<td><img src="${curso.imagen}" width="125%"/></td>
							   <td style="text-align:center; font-size:0.8em">${curso.titulo_curso}</td>
							   <td style="text-align:center">${curso.precio_curso}</td>
							   <td style="text-align:center">${curso.cantidad}</td>
							   <td><a href="#" class="borrar-curso" dataId="${curso.id_curso}">X</a></td>

		`;
		contenidoCarro.appendChild(filaTabla); //lo agrego al carro
	});

	mostrarTotal();
}

function eliminarCurso(e) {
	if (e.target.classList.contains("borrar-curso")) {
		const cursoId = e.target.getAttribute("dataId");
		productosCarro = productosCarro.filter(
			(curso) => curso.id_curso != cursoId
		);

		agregarACarro();
	}
	mostrarTotal();
}

function calcularTotal() {
	let total = 0;
	productosCarro.forEach((producto) => {
		total += parseFloat(producto.precio_curso) * producto.cantidad;
	});
	return total;
}

function mostrarTotal() {
	const elemTotal = document.querySelector("#total-carro span");
	elemTotal.textContent = calcularTotal();
}

function limpiarCarro() {
	//borro el contenido antes de agregarlo
	contenidoCarro.innerHTML = "";
}

function vaciarCarro() {
	productosCarro = [];
	limpiarCarro();
}

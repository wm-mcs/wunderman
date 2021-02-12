const departamentos = () => {
	const DATA = {
		Artigas: ["Artigas", "Bella Unión"],
		Canelones: ["Canelones", "Santa Lucía"],
		Montevideo: ["Montevideo"],
		Salto: ["Salto", "Daymán", "Arapey"]
	};

	const SELECT_DEPARTEMENTOS = document.getElementById("departamento");
	const SELECT_LOCALIDAD = document.getElementById("localidad");

	const DEPARTAMENTOS = Object.keys(DATA);

	DEPARTAMENTOS.forEach(itema => {
		let option = document.createElement("option");
		var text = document.createTextNode(`${itema}`);
		option.appendChild(text);
		option.value = itema;
		SELECT_DEPARTEMENTOS.appendChild(option);
	});

	SELECT_DEPARTEMENTOS.addEventListener("change", event => {
		let Localidades = DATA[SELECT_DEPARTEMENTOS.value];

		SELECT_LOCALIDAD.innerHTML = "";

		Localidades.forEach(itema => {
			let option = document.createElement("option");
			var text = document.createTextNode(`${itema}`);
			option.appendChild(text);
			option.value = itema;
			SELECT_LOCALIDAD.appendChild(option);
		});
	});
};

export default departamentos;

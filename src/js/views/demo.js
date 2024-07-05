import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Demo = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		email: "",
		address: ""
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
		console.log('name', name, 'value', value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Llamar a la función para crear un nuevo contacto
		fetch(`https://playground.4geeks.com/contact/agendas/sebas/contacts`, {
			method: "POST",
			body: JSON.stringify({ agenda_slug: "sebas", ...formData }),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Error en la creación del contacto');
				}
				return response.json();
			})
			.then(data => {
				console.log('Contacto creado:', data);
				// Redirigir a la página de contactos después de guardar el nuevo contacto
				navigate("/");
			})
			.catch(error => console.log('Error:', error));
	};
	return (
		<div className="container boxAddContact">
			<h3 className="titleDemo">Agregar Contacto</h3>


			<form className="formulario" onSubmit={handleSubmit}>

				<label>Nombre Completo</label>
				<br />
				<input type="text" placeholder="Nombre Completo" name="name" onChange={handleChange} />
				<br />

				<label>Email</label>
				<br />
				<input type="email" placeholder="Email" name="email" onChange={handleChange} />
				<br />

				<label>Telefono</label>
				<br />
				<input type="tel" placeholder="Telefono" name="phone" onChange={handleChange} />
				<br />

				<label>Dirección</label>
				<br />
				<input type="text" placeholder="Dirección" name="address" onChange={handleChange} />
				<br />

				<div className="btnGuardar">
					<Link to="/">
						<button className="btn btn-primary">Volver a Inicio</button>
					</Link>
					<button className="btn btn-success" type="submit" >Guardar</button>
				</div>

			</form>




		</div>
	);
};

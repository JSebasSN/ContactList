import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


import "../../styles/demo.css";

export const Edit = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: ""
    });

    useEffect(() => {
        // Función asincrónica para obtener y establecer los datos del contacto
        const fetchEditContact = async () => {
            try {
                const response = await fetch(`https://playground.4geeks.com/contact/agendas/sebas/contacts/`);
                if (!response.ok) {
                    throw new Error('Error al obtener el contacto');
                }
                const data = await response.json();
                setFormData(data); // Establecer los datos del contacto en el estado formData
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchEditContact();
    }, [id]);





    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log('name', name, 'value', value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // Llamar a la función para actualizar el contacto
        fetch(`https://playground.4geeks.com/contact/agendas/sebas/contacts/${id}`, {
            method: "PUT",
            body: JSON.stringify({ agenda_slug: "sebas", ...formData }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la actualización del contacto');
                }
                return response.json();
            })
            .then(data => {
                console.log('Contacto actualizado:', data);
                // Redirigir a la página de contactos después de guardar el contacto actualizado
                navigate("/");
            })
            .catch(error => console.log('Error:', error));
    };

    return (
        <div className="container boxAddContact">
            <h3 className="titleDemo">Actualizar Contacto</h3>


            <form className="formulario" onSubmit={handleSubmit}>

                <label>Nombre Completo</label>
                <br />
                <input type="text" placeholder="nombre" name="name" value={id.name} onChange={handleChange} />
                <br />

                <label>Email</label>
                <br />
                <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
                <br />

                <label>Telefono</label>
                <br />
                <input type="tel" placeholder="Telefono" name="phone" value={formData.phone} onChange={handleChange} />
                <br />

                <label>Dirección</label>
                <br />
                <input type="text" placeholder="Dirección" name="address" value={formData.address} onChange={handleChange} />
                <br />

                <div className="btnGuardar">
                    <Link to="/">
                        <button className="btn btn-primary">Volver a Inicio</button>
                    </Link>
                    <button className="btn btn-success" type="submit" >Guardar Cambios</button>
                </div>

            </form>




        </div>
    );
};
import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Single } from "./single";
import { Link } from "react-router-dom";

export const Home = () => (

	

	<div className="text-center mt-5 box">
		<div className="secBtn">
			<Link to={'/demo'} className="btn btn-success btnAgr">Agregar Contacto</Link>
		</div>
		<Single />

	</div>
);

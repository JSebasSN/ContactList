import React, { useState, useEffect, useContext } from "react";
import menPic from "../../img/boy.png";
import womenPic from "../../img/girl.png"
import Icon from '@mdi/react';
import { mdiPhone } from '@mdi/js';
import { mdiGoogleMaps } from '@mdi/js';
import { mdiEmail } from '@mdi/js';
import { mdiDeleteCircleOutline } from '@mdi/js';
import { mdiPencil } from '@mdi/js';
import { Link } from "react-router-dom";


export const Single = () => {

	const [contact, setContact] = useState([]);

	useEffect(() => {
		fetchCreateAgenda()
		fetchGetTask()
		console.log(fetchGetTask())
	}, [])


	const fetchGetTask = () => {
		fetch('https://playground.4geeks.com/contact/agendas/sebas', {
			method: "GET"
		})
			.then(response => response.json())
			.then(data => setContact(data.contacts))
			.catch(error => console.log(error))
	}


	const fetchCreateAgenda = () => {
		fetch('https://playground.4geeks.com/contact/agendas/sebas', {
			method: "POST",
			body: JSON.stringify(),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(data => (console.log(data)))
			.catch(error => console.log(error))
	}


	const fetchDeleteTask = (id) => {
		fetch(`https://playground.4geeks.com/contact/agendas/sebas/contacts/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response)
			.then(data => fetchGetTask())
			.catch(error => console.log(error))
	}



	return (


		<div>
			{contact.map((contactItem, i) => (

				<div className="baseCard py-2" key={i}>
					<div className="cardImg">
						<img src={menPic} />
					</div>
					<div className="cardData">
						<h3 >{contactItem.name}</h3>
						<p><Icon path={mdiPhone} size={0.8} className="mx-2" />{contactItem.phone}</p>
						<p><Icon path={mdiGoogleMaps} size={0.8} className="mx-2" />{contactItem.address}</p>
						<p><Icon path={mdiEmail} size={0.8} className="mx-2" />{contactItem.email}</p>

					</div>
					<div className="delete-button">
						<Link to={`/edit/${contactItem.id}`} className="btnDel"><Icon path={mdiPencil} size={1.2} /></Link>
					</div>
					<div className="delete-button">
						<button className="btnDel" onClick={() => fetchDeleteTask(contactItem.id)}><Icon path={mdiDeleteCircleOutline} size={1.2} /></button>
					</div>
				</div>
			))}

		</div>

	);
};


import React, { useState, useEffect, useContext } from "react"; //Paso 1 importar useContext
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js"; //Paso 2 importar el context
import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";

export const Contacts = () => {
	const [state, setState] = useState({
		showModal: false
	});

	// Paso 3 ejecutamos el contexto  y extraemos los estados. SIEMPRE va a ser así
	const { store, actions } = useContext(Context);

	//como no hay onload usamos un useEffect para que aparezca la función getAllAgenda al cargar la pagina
	useEffect(() => {
		actions.getAllAgenda();
	}, []);

	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">
						Add new contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{/* En este caso, dibujaremos con un map los contactos que haya dentro de nuestra agenda en la API */}
						{/* Siempre usaremos item como param en el map para hacerlo facil. */}
						{/* siempre tiene que tener un key y siempre que tengamos id será la ID sino el index */}
						{/* Para usar el componente contactCard como una plantilla, deberemos poner los atributos de lo que tiene la card y como valor le pondremos
								item.loque sea que hemos creado en ContactCard */}
						{store.listContacts.map(item => (
							<ContactCard
								key={item.id}
								full_name={item.full_name}
								address={item.address}
								phone={item.phone}
								email={item.email}
								onDelete={() => setState({ showModal: true })}
							/>
						))}
					</ul>
				</div>
			</div>
			<Modal show={state.showModal} onClose={() => setState({ showModal: false })} />
		</div>
	);
};

import React, { useState, useEffect, useContext } from "react"; //Paso 1 importar useContext
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js"; //Paso 2 importar el context
import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";
import { UpdateModal } from "../component/UpdateModal.js";

export const Contacts = () => {
	const [state, setState] = useState({
		showModal: false,
		contactId: null,
		showUpdateModal: false
		// Añadimos como stado en el modal el contactID para que de primeras sea null y cuando se le cliquee
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
								onDelete={() => {
									setState({ showModal: true, contactId: item.id });
								}}
								onUpdate={() => {
									setState({ showUpdateModal: true, contactId: item.id });
								}}
								// Se llama al evento onDelete con una función anonima que llama a dos cosas:
								// 1. Cuando se active el onDelete, se mostrará un modal
								// 2.Cogerá el id del contacto que se ha seleccionado.
							/>
						))}
					</ul>
				</div>
			</div>
			<Modal id={state.contactId} show={state.showModal} onClose={() => setState({ showModal: false })} />
			<UpdateModal
				id={state.contactId}
				show={state.showUpdateModal}
				onClose={() => setState({ showUpdateModal: false })}
			/>
			{/* En el modal tendrá el ID del selected. */}
		</div>
	);
};

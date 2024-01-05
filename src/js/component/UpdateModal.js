import React, { useState, useEffect, useContext, useSyncExternalStore } from "react"; //Paso 1 importar el useContext
import { Context } from "../store/appContext.js"; //Paso 2 importar el context
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const UpdateModal = ({ currentContact, onSave }) => {
	const [state, setState] = useState({
		//initialize state here
		showModal: false
	});

	// Paso 3 ejecutamos el contexto  y extraemos los estados. SIEMPRE va a ser así
	const { store, actions } = useContext(Context);

	// Traemos la información del store de CurrentContact;
	const selectedContact = store.currentContact;
	console.log(selectedContact);
	// Para preservar la info del contacto
	const [originalSelectedContact, setOriginalSelectedContact] = useState({});
	// Creamos un estado para almacenar el contacto editado y le damos como valor inicial el actual contacto que teniamos escogido.
	const [editedContact, setEditedContact] = useState({});

	// Creamos los estados para cambiarlos por lo editado.
	// const [updatedFullName, setUpdatedFullName] = useState(editedContact.full_name);
	// const [updatedEmail, setUpdatedEmail] = useState(editedContact.email);
	// const [updatedPhone, setUpdatedPhone] = useState(editedContact.phone);
	// const [updatedAddress, setUpdatedAddress] = useState(editedContact.address);
	// const [updatedId, setUpdatedId] = useState(selectedContact.id); No cambia el ID

	function handleUpdate(event) {
		// actions.updateContact(
		// 	// {
		// 	// 	// full_name: {props.full_name},
		// 	// 	// email: {props.email},
		// 	// 	phone: updatedPhone,
		// 	// 	address: updatedAddress
		// 	// },
		// 	(store.currentContact = {})
		// )

		// Aquí cambiamos el estado edited contact todos los target les asignamos el valor del input
		setEditedContact({ ...editedContact, [event.target.name]: event.target.value });
		// Tenemos que seleccionar el id del elemento a eliminar. Como modal trabaja con props, para llamar al ID deberemos usar los props que en el boton ya se están llamando, por lo tanto aquí usaremos el nombre del prop(id) y se le pasa a actions el parametro id.
		// IMPORTANTE debemos ponerlos también en proptypes debajo.
	}

	function handleSubmit(event) {
		event.preventDefault();
		handleUpdate();
		actions.updateContact({
			full_name: editedContact.full_name,
			email: editedContact.email,
			phone: editedContact.phone,
			address: editedContact.address
		});
		// updatedFullName, updatedEmail, updatedPhone, updatedAddress, updatedId);
		// console.log(fullName, email, phone, address);
		// store.currentContact = {};
	}

	function handleGetBackToContacts(e) {
		setEditedContact(originalSelectedContact);
		// Deberia deshacer todos los cambios escritos en value
		// Hacer condicional? Si el boton save no ha sido apretado, edited contact = selectedContact
	}

	// En este caso
	useEffect(() => {
		// Se cambiará el estado editedContact cada vez que selected contact cambie.
		// setUpdatedFullName(editedContact.full_name);
		// setUpdatedEmail(editedContact.email);
		// setUpdatedPhone(editedContact.phone);
		// setUpdatedAddress(editedContact.address);
		// setUpdatedId(editedContact.id);
		setOriginalSelectedContact(selectedContact);
		setEditedContact(selectedContact);
	}, [selectedContact]);

	return (
		<div className=" container">
			<div>
				<h1 className="text-center mt-5">Update Contact</h1>
				<form onSubmit={handleSubmit}>
					{/* / el onsubmit en este caso va en el form. */}
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							className="form-control"
							placeholder={selectedContact.full_name}
							value={editedContact.full_name}
							onChange={handleUpdate}
							// onChange={event => handleUpdate(event.target.value)}
							// al ser un form queremos siempre aplicar el onChange.
							// Dentro ira un evento como parametro que cambiara el estadoFullName por el valor del input
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							placeholder={selectedContact.email}
							value={editedContact.email}
							onChange={handleUpdate}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							className="form-control"
							placeholder={selectedContact.phone}
							value={editedContact.phone}
							onChange={handleUpdate}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							className="form-control"
							placeholder={selectedContact.address}
							value={editedContact.address}
							onChange={handleUpdate}
						/>
					</div>
					<button type="submit" className="btn btn-primary form-control" onClick={handleGetBackToContacts}>
						save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};
/**
 * Define the data-types for
 * your component's properties
 **/
UpdateModal.propTypes = {
	currentContact: PropTypes.object,
	onSave: PropTypes.func
};
/**
 * Define the default values for
 * your component's properties
 **/
UpdateModal.defaultProps = {
	show: false,
	onClose: null
	// currentContact: {},
	// onSave: () => {}
};

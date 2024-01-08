import React, { useState, useEffect, useContext, useSyncExternalStore } from "react"; //Paso 1 importar el useContext
import { Context } from "../store/appContext.js"; //Paso 2 importar el context
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

export const UpdateModal = props => {
	const [state, setState] = useState({
		//initialize state here
		showModal: false
	});

	// Paso 3 ejecutamos el contexto  y extraemos los estados. SIEMPRE va a ser así
	const { store, actions } = useContext(Context);

	console.log(props.id);

	// Creamos un estado para almacenar el contacto editado y le damos como valor inicial el actual contacto que teniamos escogido.
	const [editedContact, setEditedContact] = useState({
		{full_name: selectedContact.full_name,
		email: selectedContact.email,
		phone: selectedContact.phone,
		address: selectedContact.address,
		id: selectedContact.id}
	});

	// Creamos los estados para cambiarlos por lo editado.
	// const [updatedFullName, setUpdatedFullName] = useState(selectedContact.full_name);
	// const [updatedEmail, setUpdatedEmail] = useState(selectedContact.email);
	// const [updatedPhone, setUpdatedPhone] = useState(selectedContact.phone);
	// const [updatedAddress, setUpdatedAddress] = useState(selectedContact.address);
	// const [updatedId, setUpdatedId] = useState(selectedContact.id); No cambia el ID

	function handleUpdate(event) {
		const { name, value } = event.target;
		setEditedContact(prevState => ({
			...prevState,
			[name]: value
		}));
		// if (name === "full_name") {
		// 	setUpdatedFullName(value);
		// } else if (name === "email") {
		// 	setUpdatedEmail(value);
		// } else if (name === "phone") {
		// 	setUpdatedPhone(value);
		// } else if (name === "address") {
		// 	setUpdatedAddress(value);
		// }
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
		// setEditedContact({ ...editedContact, [event.target.name]: event.target.value });
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
		e.preventDefault();
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
		setEditedContact({
			full_name: selectedContact.full_name,
			email: selectedContact.email,
			phone: selectedContact.phone,
			address: selectedContact.address,
			id: selectedContact.id
		});
	}, [selectedContact]);

	return (
		<div className="modal" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Are you sure?</h5>
						{props.onClose ? (
							<button
								onClick={() => props.onClose()}
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						) : (
							""
						)}
					</div>
					<div className="modal-body">
					// 	<div>
		// 		<h1 className="text-center mt-5">Update Contact</h1>
		// 		<form onSubmit={handleSubmit}>
		// 			{/* / el onsubmit en este caso va en el form. */}
		// 			<div className="form-group">
		// 				<label>Full Name</label>
		// 				<input
							type="text"
							className="form-control"
							name="full_name"
							placeholder={selectedContact.full_name}
							value={editedContact.full_name}
							onChange={handleUpdate}
							onChange={event => handleUpdate(event.target.value)}
							// al ser un form queremos siempre aplicar el onChange.
							// Dentro ira un evento como parametro que cambiara el estadoFullName por el valor del input
						/>
					</div>
		// 			<div className="form-group">
		// 				<label>Email</label>
		// 				<input
		// 					type="email"
		// 					className="form-control"
		// 					name="email"
		// 					placeholder={selectedContact.email}
		// 					value={editedContact.email}
		// 					onChange={handleUpdate}
		// 				/>
		// 			</div>
		// 			<div className="form-group">
		// 				<label>Phone</label>
		// 				<input
		// 					type="phone"
		// 					className="form-control"
		// 					name="phone"
		// 					placeholder={selectedContact.phone}
		// 					value={editedContact.phone}
		// 					onChange={handleUpdate}
		// 				/>
		// 			</div>
		// 			<div className="form-group">
		// 				<label>Address</label>
		// 				<input
		// 					type="text"
		// 					className="form-control"
		// 					name="address"
		// 					placeholder={selectedContact.address}
		// 					value={editedContact.address}
		// 					onChange={handleUpdate}
		// 				/>
		// 			</div>
		// 			<button type="submit" className="btn btn-primary form-control" onClick={handleGetBackToContacts}>
		// 				save
		// 			</button>
		// 			<Link className="mt-3 w-100 text-center" to="/">
		// 				or get back to contacts
		// 			</Link>
		// 		</form>
		// 	</div>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-primary">
							Oh no!
						</button>
						<button
							type="button"
							onClick={() => HandleDelete(props.id)}
							// En el boton do it se le llama la función handle delete
							// Hay que pasarle el props.id como parametro
							className="btn btn-secondary"
							data-dismiss="modal">
							Do it!
						</button>
					</div>
				</div>
			</div>
		</div>
		// <div className=" container">

		// </div>
	);
};
/**
 * Define the data-types for
 * your component's properties
 **/
UpdateModal.propTypes = {
	currentContact: PropTypes.object,
	onSave: PropTypes.func,
	onClose: PropTypes.func,
	id: PropTypes.number,
	show: PropTypes.bool
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

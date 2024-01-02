import React, { useState, useEffect, useContext, useSyncExternalStore } from "react"; //Paso 1 importar el useContext
import { Context } from "../store/appContext.js"; //Paso 2 importar el context
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const UpdateModal = () => {
	const [state, setState] = useState({
		//initialize state here
	});

	// Paso 3 ejecutamos el contexto  y extraemos los estados. SIEMPRE va a ser así
	const { store, actions } = useContext(Context);

	const [contactSelected, setcontactSelected] = useState({
		full_name: "",
		email: "",
		phone: "",
		address: ""
	});

	const [updatedFullName, setUpdatedFullName] = useState(contactSelected.full_name);
	const [updatedEmail, setUpdatedEmail] = useState(contactSelected.email);
	const [updatedPhone, setUpdatedPhone] = useState(contactSelected.phone);
	const [updatedAddress, setUpdatedAddress] = useState(contactSelected.address);
	const [updatedId, setUpdatedId] = useState(selectedContact.id);

	function HandleUpdate(id) {
		actions.updateContact(
			id,
			{
				full_name: updatedFullName,
				email: updatedEmail,
				phone: updatedPhone,
				address: updatedAddress
			},
			(store.currentContact = {})
		);
		// Tenemos que seleccionar el id del elemento a eliminar. Como modal trabaja con props, para llamar al ID deberemos usar los props que en el boton ya se están llamando, por lo tanto aquí usaremos el nombre del prop(id) y se le pasa a actions el parametro id.
		// IMPORTANTE debemos ponerlos también en proptypes debajo.
	}

	function handleSubmit(event) {
		event.preventDefault();
		HandleUpdate(updatedId);
		// console.log(fullName, email, phone, address);
		// actions.updateContact(updatedFullName, updatedEmail, updatedPhone, updatedAddress);
		// store.currentContact = {};
	}

	useEffect(() => {
		const selectedContact = store.currentContact;
		setcontactSelected(selectedContact);
	}, []);

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
							placeholder={contactSelected.full_name}
							value={contactSelected.full_name}
							onChange={event => setUpdatedFullName(event.target.value)}
							// al ser un form queremos siempre aplicar el onChange.
							// Dentro ira un evento como parametro que cambiara el estadoFullName por el valor del input
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							placeholder={contactSelected.email}
							value={contactSelected.email}
							onChange={event => setUpdatedEmail(event.target.value)}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							className="form-control"
							placeholder={contactSelected.phone}
							value={contactSelected.phone}
							onChange={event => setUpdatedPhone(event.target.value)}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							className="form-control"
							placeholder={contactSelected.address}
							value={contactSelected.address}
							onChange={event => setUpdatedAddress(event.target.value)}
						/>
					</div>
					<button type="submit" className="btn btn-primary form-control">
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
	history: PropTypes.object,
	onClose: PropTypes.func,
	onUpdate: PropTypes.func,
	show: PropTypes.bool,
	id: PropTypes.number,
	full_name: PropTypes.string,
	email: PropTypes.string,
	address: PropTypes.string,
	phone: PropTypes.string
	// poner el id en proptypes
};

/**
 * Define the default values for
 * your component's properties
 **/
UpdateModal.defaultProps = {
	show: false,
	onClose: null
};

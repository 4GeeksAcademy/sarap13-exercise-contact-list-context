import React, { useState, useContext } from "react"; //Paso 1 importar el useContext
import { Context } from "../store/appContext.js"; //Paso 2 importar el context

import { Link } from "react-router-dom";

export const AddContact = () => {
	const [state, setState] = useState({
		showModal: false
	});

	// Paso 3 ejecutamos el contexto  y extraemos los estados. SIEMPRE va a ser así
	const { store, actions } = useContext(Context);

	// Para todos los input del formulario creamos useState, para así modificar su valor.
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");

	// Necesitamos crear una función para el submit del form (especificado en html form)
	// Como en el onChange hemos puesto una función anonima de un evento, hay que pasar como parametro el evento
	// Al ser un evento, necesitamos que deje de hacer por defecto lo que haga, sino no nos hará caso a nuestro código.
	// Para vincularla con Flux y la función creada en sus actions, pasaremos action.addContact(Con los estados)
	function handleSubmit(event) {
		event.preventDefault();
		// console.log(fullName, email, phone, address);
		actions.addContact(fullName, email, phone, address);
	}

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
				<form onSubmit={handleSubmit}>
					{/* / el onsubmit en este caso va en el form. */}
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							className="form-control"
							placeholder="Full Name"
							onChange={event => setFullName(event.target.value)}
							// al ser un form queremos siempre aplicar el onChange.
							// Dentro ira un evento como parametro que cambiara el estadoFullName por el valor del input
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							placeholder="Enter email"
							onChange={event => setEmail(event.target.value)}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							className="form-control"
							placeholder="Enter phone"
							onChange={event => setPhone(event.target.value)}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter address"
							onChange={event => setAddress(event.target.value)}
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

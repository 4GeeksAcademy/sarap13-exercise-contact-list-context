import React, { useState, useEffect, useContext } from "react"; //Paso 1 importar el useContext
import { Context } from "../store/appContext.js"; //Paso 2 importar el context
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

export const Modal = props => {
	const [state, setState] = useState({
		//initialize state here
	});

	// Paso 3 ejecutamos el contexto  y extraemos los estados. SIEMPRE va a ser así
	const { store, actions } = useContext(Context);

	function HandleDelete(id) {
		actions.deleteContact(id);
		// Quiero que cuando le de al boton do it, se elimine el contacto de la agenda.
		// Tenemos que seleccionar el id del elemento a eliminar. Como modal trabaja con props, para llamar al ID deberemos usar los props que en el boton ya se están llamando, por lo tanto aquí usaremos el nombre del prop(id) y se le pasa a actions el parametro id.
		// IMPORTANTE debemos ponerlos también en proptypes debajo.
	}

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
						<p>Warning: unknown consequences after this point... Kidding!</p>
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
	);
};
/**
 * Define the data-types for
 * your component's properties
 **/
Modal.propTypes = {
	history: PropTypes.object,
	onClose: PropTypes.func,
	show: PropTypes.bool,
	id: PropTypes.number
	// poner el id en proptypes
};

/**
 * Define the default values for
 * your component's properties
 **/
Modal.defaultProps = {
	show: false,
	onClose: null
};

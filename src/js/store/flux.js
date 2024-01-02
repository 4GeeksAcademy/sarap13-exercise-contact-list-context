import { number } from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			//Creamos un espacio donde meteremos los contactos.
			listContacts: [],
			// Creamos un espacio donde meteremos el contacto que queremos editar
			currentContact: {}
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()

			// Creamos funcion getAllAgenda para traer la agenda de la API. Anteriormente hemos en Postman traigo la agenda y creado una nueva agenda con sarap.
			getAllAgenda: () => {
				fetch("https://playground.4geeks.com/apis/fake/contact/agenda/sarap")
					.then(response => {
						// console.log(response);
						return response.json();
					})
					.then(data => {
						// console.log(data);
						// Ponme la información que traes del API en listContacts
						setStore({ listContacts: data });
					})
					.catch(error => console.log(error));
			},

			// Creamos función addContact para actualizar la agenda
			// Se le pasan los param anteriormente creados en AddContact.
			// En el body del fetch ponemos lo que nos pida la api y en los valores los parametros (estados de los useState de Addcontact).
			// Como en GetAllAgenda ya pone los contactos en contactList, en la segunda promesa no se le mete nada mas.
			addContact: (fullName, email, address, phone) => {
				// console.log(fullName, email, address, phone); CREADO PARA VER SI LOS TRAIA
				fetch("https://playground.4geeks.com/apis/fake/contact", {
					method: "POST",
					body: JSON.stringify({
						full_name: fullName,
						email: email,
						agenda_slug: "sarap",
						address: address,
						phone: phone
					}),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(response => {
						console.log(response);
						return response.json();
					})
					.then(data => {
						console.log(data);
					})
					.catch(error => console.log(error));
			},

			// función en actions para eliminar el contacto.
			// Se le pasa contactId creado en el state de Contacts.js para que coja el id.
			// En el delete no hay que poner nada mas que el method.

			deleteContact: contactId => {
				// console.log(contactId); Hacer siempre un console.log para ver si funciona
				fetch(`https://playground.4geeks.com/apis/fake/contact/${contactId}`, {
					method: "DELETE"
				})
					.then(response => {
						console.log(response);
						if (response.status === 201) {
							// Haremos un condicional para que cuando el usuario se elimine y este ok (cod 201) se ejecute la función getAgenda de nuevo.
							// Para acceder a las funciones de actions desde mismo actions usaremos getActions que se tiene que poner en getStore arriba SIEMPRE
							// hay que crear getActions y hay que acceder a la agenda a través de getActions ya que es una función de si mismo.
							getActions().getAllAgenda();
						}
						return response.json();
					})
					.then(data => {
						console.log(data);
					})
					.catch(error => console.log(error));
			}

			// updateContact: contactId => {
			// 	fetch(`https://playground.4geeks.com/apis/fake/contact/${contactId}`, {
			// 		method: "PUT",
			// 		body: JSON.stringify({
			// 			full_name: fullName,
			// 			email: email,
			// 			agenda_slug: "sarap",
			// 			address: address,
			// 			phone: phone
			// 		}),
			// 		headers: {
			// 			"Content-Type": "application/json"
			// 		}
			// 	})
			// 		.then(response => {
			// 			console.log(response);
			// 			return response.json();
			// 		})
			// 		.then(data => {
			// 			console.log(data);
			// 		})
			// 		.catch(error => console.log(error));
			// 	}
			// 	)

			// Quiero crear una función que al darle al lapiz, me aparezca el formulario con el placeholder de la información del cliente y al escribir se modifique y se guarde
		}
	};
};

export default getState;

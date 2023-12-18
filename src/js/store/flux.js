import { number } from "prop-types";

const getState = ({ getStore, setStore }) => {
	return {
		store: {
			//Creamos un espacio donde meteremos los contactos.
			listContacts: []
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
			}
		}
	};
};

export default getState;

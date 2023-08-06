import React from "react";
export const ContactShortDisplay = (props: { contact: any; onEdit: any, onDelete: any }) => {
	let {contact, onEdit, onDelete } = props;
	return (
		<div className="contact-short-display">
			<span>
				{contact.firstName}, {contact.lastName} ,{contact.gender} ,{contact.email}
			</span>
			<button  className="edit-button" onClick={() => onEdit(contact.id)}>
					Edit
			</button>
			<button className="delete-button" onClick={() => onDelete(contact.id)}>
					Delete
			</button>
		</div>
	);
};

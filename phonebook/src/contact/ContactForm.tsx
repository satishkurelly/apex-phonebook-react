import React, { useEffect } from "react";
export default function ContactForm(props) {
	const [firstName, setFirstName] = React.useState("");
	const [lastName, setLastName] = React.useState("");
	const [gender, setGender] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [id, setId] = React.useState(null);

	useEffect(() => {
		if(props.contact){
			setFirstName(props.contact.firstName);
			setLastName(props.contact.lastName);
			setGender(props.contact.gender);
			setEmail(props.contact.email);
			setId(props.contact.id);
		}
	}, [props.contact]);


	const handleSubmit = event => {
		event.preventDefault();
		console.log(`
    //   email: ${email}
    //   firstName: ${firstName}
    //   lastName: ${lastName}
    //   gender: ${gender}`);

	  const contact = { firstName, lastName, email, gender };
	  const url = id ? `http://localhost:3001/contacts/${id}` : "http://localhost:3001/contacts";
	  const method = id ? "PUT" : "POST";
	
	  fetch(url, {
			method: method,
			mode: "cors",
			cache: "no-cache",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(contact)
		})
			.then(res => res.json())
			.then(
				result => {
					props.onSuccess(result);
				},
				error => {
					props.onError(error);
				}
			);
	};
	return (
		<form onSubmit={handleSubmit}>
			<h1>Create Contact</h1>

			<label>
				First Name:
				<input
					name="firstName"
					type="text"
					value={firstName}
					onChange={e => setFirstName(e.target.value)}
					required
				/>
			</label>
			<label>
				Last Name:
				<input
					name="lastName"
					type="text"
					value={lastName}
					onChange={e => setLastName(e.target.value)}
					required
				/>
			</label>

			<label>
				Gender:
				<select
					name="gender"
					value={gender}
					onChange={e => setGender(e.target.value)}
					required
				>
					<option key="" />
					{["MALE", "FEMALE"].map(gender => (
						<option key={gender}>{gender}</option>
					))}
				</select>
			</label>

			<label>
				Email:
				<input
					name="email"
					type="email"
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
				/>
			</label>

			<button>Submit</button>
		</form>
	);
}

import React, { Component } from "react";
import { ContactShortDisplay } from "./ContactShortDisplay";
type ContactsComponentState = {
	isLoaded: boolean,
	items: any,
	error: any,
	savedContact: any;

};
class ContactsComponent extends Component<{onEdit, savedContact}, ContactsComponentState> {
	constructor(props) {
		super(props);

		this.state = {
			error: null,
			isLoaded: false,
			items: [],
			savedContact:  null
		};
	}

	onDeleteHandler = (id) => {
		console.log('Contact-component onDeleteHandler' );
		let remainingContacts = this.state.items.filter(c => c.id !== id);
		this.setState({items: remainingContacts});
		fetch(`http://localhost:3001/contacts/${id}`, {
			method: "DELETE",
		}).then(response => 
			response.json().then(json => {
				return json;
			})
		);
	}

	onEditHandler = (id) => {
		console.log('Contact-component onEditHandler' );
		let contactSelected = this.state.items.filter(c => c.id === id);
		this.props.onEdit(contactSelected[0]);
	}

	componentDidUpdate(prevProps: Readonly<{ savedContact: any; }>, prevState: Readonly<ContactsComponentState>, snapshot?: any): void {
		if(this.props.savedContact !== this.state.savedContact){
			this.setState({items: [...this.state.items, this.props.savedContact], savedContact: this.props.savedContact});
		}
	}
	componentDidMount() {
		
		if(!this.state.items.length){
			fetch("http://localhost:3001/contacts")
				.then(res => res.json())
				.then(
					result => {
						console.log(result);
						this.setState({
							isLoaded: true,
							items: result || []
						});
					},
					error => {
						this.setState({
							isLoaded: true,
							error
						});
					}
				);
		}
	}
	render() {
		const { error, isLoaded, items } = this.state;
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>;
		} else {
			return (
				<ul>
					{items.map((item, index) => (
						<li key={index}>
							<ContactShortDisplay onDelete={this.onDeleteHandler} onEdit={this.onEditHandler} contact={item} />
						</li>
					))}
				</ul>
			);
		}
	}
}
export default ContactsComponent;

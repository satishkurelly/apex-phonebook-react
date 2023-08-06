import React, { useState } from "react";
import "./App.css";
import ContactsComponent from "./contact/contacts-component";
import ContactForm from "./contact/ContactForm";
function App() {
    const [savedContact, setSavedContact] = useState(null);
    const [error, setError] = useState(null);

   const  onEditHandler = (contact: any) => {
    console.log('APP: onEditHandler');
      setSavedContact(contact);
    }

    return (
        <div className="App">
            {error}
            <ContactForm
                onError={setError}
                onSuccess={setSavedContact}
                contact={savedContact}
            />
            <ContactsComponent onEdit={onEditHandler} savedContact={savedContact} />
        </div>
    );
}
export default App;

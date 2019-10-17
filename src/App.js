import React, { Component } from 'react';
import './App.css';
import Record from "./components/Record.js"

class App extends Component {

  constructor() {
    super();

    this.state = {
      id: "",
      name: "",
      number: "",
      phoneBook: [
        { id: 1, name: "Abc", number: "+7898378532" },
        { id: 2, name: "Xyz", number: "+9399452757" }
      ],
      showForm: false,
      edit: false
    }
  }
  handleInputChange1 = (event) => {
    this.setState({
      name: event.target.value
    }, () => console.log(this.state))
  }

  handleInputChange2 = (event) => {
    this.setState({
      number: event.target.value
    })
  }

  addContact = () => {

    const newContact = {
      name: this.state.name,
      number: this.state.number
    }

    if (this.state.name === "" || this.state.number === "") {
      alert('Both fields are required.');
      return;
    }

    this.setState((prevState) => ({
      phoneBook: prevState.phoneBook.concat(newContact),
      name: "",
      number: ""
    }))

  }

  toggleShowForm = () => {
    this.setState(
      { showForm: !this.state.showForm, edit: false, name: "", number: "" }
    )
  }

  delContact = (id) => {
    this.setState(
      { phoneBook: this.state.phoneBook.filter(contact => contact.id !== id) }
    )
  }

  editContact = (id) => {
    this.setState(
      {
        name: this.state.phoneBook.find(contact => contact.id === id).name,
        number: this.state.phoneBook.find(contact => contact.id === id).number,
        showForm: true, edit: true, id
      }
    )
  }

  saveContact = (id) => {
    console.log(this.state.id)

    const phoneBook = [...this.state.phoneBook]
    const contact = phoneBook.find(contact => contact.id === this.state.id)
    console.log(contact)
    contact.name = this.state.name
    contact.number = this.state.number

    const phoneBookWithout = phoneBook.filter(contact => contact.id !== this.state.id)
    phoneBookWithout.unshift(contact)
    console.log(phoneBookWithout)
    this.setState(
      { phoneBook: phoneBookWithout, showForm: false }
    )
  }

  render() {

    let form = null;
    if (this.state.showForm) {
      form =
        (
          <div className="container">
            <div className="form">
              <div className="form-group">
                <input type="text" className="form-control" onChange={this.handleInputChange1} value={this.state.name} placeholder="Name" />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" onChange={this.handleInputChange2} value={this.state.number} placeholder="Number" />
              </div>
              {this.state.edit ? <button className="btn btn-primary" onClick={this.saveContact}>Save</button> :
                <button className="btn btn-primary" onClick={this.addContact}>Add</button>}
            </div>
          </div>
        )
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4"></div>


          <div className="col-md-4">
            <div className="App">
              <h2 className="header">PhoneBook</h2>
              <span style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }} onClick={this.toggleShowForm}>Create New Contact</span>

              {form}

              {this.state.phoneBook.map((contact, i) =>
                // <div className="contacts">
                //   <h5>{contact.name}</h5>
                //   <p>{contact.number}</p>
                //   <button>edit</button>
                //   <button>delete</button>
                //   <hr />
                // </div>
                <Record key={i} contact={contact} delContact={this.delContact} editContact={this.editContact} />
              )}
            </div>
          </div>


          <div className="col-md-4"></div>
        </div>
      </div>
    );
  }
}

export default App;

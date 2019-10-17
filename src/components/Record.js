import React, { Component } from 'react';
// import './components/Record.css';

export default class Record extends Component {

    constructor(props) {
        super();

    }

    render() {
        return (
            <div className="contacts">
                <h5>{this.props.contact.name}</h5>
                <p>{this.props.contact.number}</p>
                <button onClick={() => this.props.editContact(this.props.contact.id)}>edit</button>
                <button onClick={() => this.props.delContact(this.props.contact.id)}>delete</button>
                <hr />
            </div>
        )
    }
}

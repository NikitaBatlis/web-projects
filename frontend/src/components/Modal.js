import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';

export default class EditModal extends React.Component {
    
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <ModalHeader className="modal-container" closeButton>
                    <Modal.Title>Edit Title</Modal.Title>
                </ModalHeader>
                <Modal.Body className="modal-container">
                    <form onSubmit={this.props.submitEdit}> 
                        <input type="text" name="title" placeholder="New Title.."></input>
                        <button>Save</button>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

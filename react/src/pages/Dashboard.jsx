import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import AddRoommateModal from '../components/AddRoommateModal';
import RemoveRoommateModal from '../components/RemoveRoommateModal';
import StickyNoteWall from '../components/StickyNoteWall';
import InOutButtons from '../components/InOutButtons';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            names: ['Brandon', 'Kadison', 'Ryan', 'Steven'],
            addModalShow: false,
            addModalName: ''
        };

        this.handleChangeAddRoommateModal = this.handleChangeAddRoommateModal.bind(this);
        this.handleAddRoommate = this.handleAddRoommate.bind(this);
        this.handleRemoveRoommate = this.handleRemoveRoommate.bind(this);
    }

    handleChangeAddRoommateModal(e) {
        this.setState({ addModalName: e.target.value });
    }

    handleAddRoommate(e) {
        e.preventDefault();
        // console.log("Roommate added: " + this.state.addModalName);
        // capitalize first letter
        var newName = this.state.addModalName.substr(0, 1).toUpperCase()
                                    + this.state.addModalName.substr(1);
        var newNames = [...this.state.names, newName].sort();

        this.setState({
            names: newNames,
            addModalName: '',
            addModalShow: false,
            removeModalName: '',
            removeModalShow: false
        });
    }

    handleRemoveRoommate(e) {
        var newNames = [...this.state.names];
        newNames.splice(newNames.indexOf(this.state.removeModalName), 1);
        console.log("Roommate removed: " + this.state.removeModalName);

        this.setState({
            names: newNames,
            removeModalName: '',
            removeModalShow: false
        });
    }

    handleShowRemoveModal(name, e) {
        // console.log(name);
        this.setState({
            removeModalName: name,
            removeModalShow: true
        });
    }

    render() {
        return (
            <div className='app'>
                <h1 className='text-center m-0'>Dashboard</h1>

                <InOutButtons
                    names={this.state.names} 
                    handleShowAddModal={() => this.setState({addModalShow: true})}
                    handleShowRemoveModal={(name, e) => this.handleShowRemoveModal(name, e)}
                />
                <StickyNoteWall />

                <Button as={Link} to='/calendar'>Calendar</Button>

                <AddRoommateModal 
                    show={this.state.addModalShow}
                    onHide={() => this.setState({addModalShow: false})}
                    addModalName={this.state.addModalName}
                    onChangeAddRoommate={this.handleChangeAddRoommateModal}
                    onAddRoommate={this.handleAddRoommate}
                />
                <RemoveRoommateModal
                    show={this.state.removeModalShow}
                    onHide={() => this.setState({removeModalShow: false})}
                    name={this.state.removeModalName}
                    onRemoveRoommate={this.handleRemoveRoommate}
                />
            </div>
        );
    }
}

export default Dashboard;

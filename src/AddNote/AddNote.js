import React from 'react';
//import ReactDOM from 'react-dom';
import App from '../App/App';
import Config from '../config'
import ApiContext from '../ApiContext'
import './AddNote.css'

class AddNote extends React.Component {
    constructor(props) {
        super(props);
    }
    static contextType = ApiContext;
    
    handleSubmit = e => {
        e.preventDefault();
        const note = {
            id: e.target['folderId'].value,
            name: e.target['name'].value,
            modified: new Date(),
            folderId: e.target['folderId'].value,
            content: e.target['content'].value
        }
        console.log(note.id);
        fetch(`${Config.API_ENDPOINT}/notes`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(note),
        })
            .then(res => res.json())
            .then(note => {
                console.log(note.id);
                //this.context.addNote(note);
                this.context.notes[note.id] = note.name;
                this.context.notes.push(note)
                this.props.history.push('/')
           })
    }

    render () {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Add Note</h2>
                <div>
                    <label htmlFor='name'>
                        Note Name
                    </label>
                    <input
                        type='text'
                        name='name'
                    />
                     <label htmlFor='name'>
                        Note Content
                    </label>
                    <textarea
                        type='text'
                        name='content'
                    />
                    <label htmlFor='name'>
                        Folder
                    </label>
                    <select
                        name='folderId'
                    >
                    <option value={null}>...</option>
                    {this.context.folders.map(folder => (
                        <option key={folder.name} name='folderId' value={folder.id}>
                            {folder.name}
                        </option>
                    ))}
                    </select>
                </div>
                <button type='submit'>
                    Submit
                </button>
            </form>
        )   
    }
}

export default AddNote;
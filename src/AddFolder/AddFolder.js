import React from 'react';
import Config from '../config'
import ApiContext from '../ApiContext'
import './AddFolder.css';

class AddFolder extends React.Component {
  constructor(props) {
    super(props);
  }
    static contextType = ApiContext;

    // addFolder = folder => {
    //   this.setState({
    //       folders: [...this.context.folders, folder]
    //   });
    // };

    //THIS.CONTEXT.FOLDERS IS AN OBJECT, HOW DO I ADD A NEW KEY/VALUE PAIR ({FOLDER}) TO IT

    handleSubmit = e => {
        e.preventDefault()
        const folder = {
          id: e.target['id'].value,
          name: e.target['name'].value
        }
        fetch(`${Config.API_ENDPOINT}/folders`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(folder),
        })
          .then(res => res.json())
          .then(folder => {
            this.context.folders[folder.name] = folder.name;
            console.log(this.context.folders)
            this.context.folders[folder.id] = folder.id;
            console.log(this.context.folders)
            //this.props.history.push('/')
            this.context.folders.push(folder)
            this.props.history.push('/')
          })
    }

    render () {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Add Folder</h2>
                <div>
                    <label htmlFor='name'>
                        Name
                    </label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                    />
                </div>
                <button type='submit'>
                    Submit
                </button>
            </form>
        )   
    }
}

export default AddFolder;
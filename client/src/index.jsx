import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/toDos',
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('There was an error retrieving data from the server.');
      }
    })
  }

  render () {
    return (<div>
      <h1>Here are your Do-Time items:</h1>
      <List itemsArray={this.state.items} /> 
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
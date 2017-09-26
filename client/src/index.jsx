import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import AddTask from './components/AddTask.jsx';

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

  addDoTimeItem(description, estimatedTime) {
    let doTimeObj = {
      toDo: description,
      predictedTime: estimatedTime
    };

    $.ajax({
      method: 'POST',
      url: '/toDos',
      data: JSON.stringify(doTimeObj),
      contentType: 'application/json',
      success: (data) => {
        console.log('Successfully posted');
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

      },
      error: (err) => {
        console.log('Post error:', err)
      }
    })
  }

  render () {
    return (<div>
      <AddTask addDoTimeItem={this.addDoTimeItem.bind(this)} />
      <h2>Current Do-Times:</h2>
      <List itemsArray={this.state.items} /> 
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
import React from 'react';

class AddTask extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			toDo: '',
			predictedTime: 0
		}
	}

	changeToDo(e) {
		this.setState({
			toDo: e.target.value
		});
	}

	changePredictedTime(e) {
		this.setState({
			predictedTime: e.target.value
		});
	}

	postDoTimeItem() {
		this.props.addDoTimeItem(this.state.toDo, this.state.predictedTime);
	}

	render () {
    return (

      <div>
      	<h2>Enter a new Do-Time task:</h2>
        Do-Time Task: <input type="text" value={this.state.toDo} onChange={this.changeToDo.bind(this)} />
        <br />
        Predicted Time: <input type="number" value={this.state.predictedTime} onChange={this.changePredictedTime.bind(this)} />
        <br />
        <button onClick={this.postDoTimeItem.bind(this)}>Add Do-Time Item</button>
      </div>

    )
  }
}

export default AddTask;
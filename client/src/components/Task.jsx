import React from 'react';

class Task extends React.Component {
	constructor(props) {
		super(props);
	}

	setStartTime() {
		let startTime = Date.now();
	}

	render() {
		return (
			<div onClick={this.setStartTime.bind(this)}>
				<h4> Do Time Item: {this.props.individualTaskProp.toDo} </h4>
				<p>Predicted Time: {this.props.individualTaskProp.predictedTime} Actual Time: {this.props.individualTaskProp.actualTime}</p>
				<br />
			</div>
		)
	} 
	
}

export default Task;
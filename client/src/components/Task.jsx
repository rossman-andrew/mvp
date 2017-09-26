import React from 'react';
import $ from 'jquery';

class Task extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clickNum: 0,
			startTime: 0,
			stopTime: 0
		}
	}

	setStartTime() {
		let startTimeObj = {
			startTime: Date.now(),
			toDo: this.props.individualTaskProp.toDo
		};
		if (this.state.clickNum === 0) {
			this.setState({
				clickNum: this.state.clickNum + 1,
				startTime: 0.1
			});
		} else if (this.state.clickNum === 1) {
			this.setState({
				clickNum: this.state.clickNum + 1,
				stopTime: Date.now()
			})
		}
		$.ajax({
      method: 'POST',
      url: '/toDos',
      data: JSON.stringify(startTimeObj),
      contentType: 'application/json',
      success: function(data) {
      	console.log("Successful post of start time");
      },
      error: function(err) {
      	console.log("Unsuccessful post of start time");
      }
    });
	}

	render() {
		return (
			<div onClick={this.setStartTime.bind(this)}>
				<h4> Do Time Item: {this.props.individualTaskProp.toDo} </h4>
				<p>Predicted Time: {this.props.individualTaskProp.predictedTime} Start Time: {this.state.startTime} Stop Time: {this.state.stopTime} Actual Time: {this.props.individualTaskProp.actualTime}</p>
				<br />
			</div>
		)
	} 
	
}

export default Task;
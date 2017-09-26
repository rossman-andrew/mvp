import React from 'react';
import $ from 'jquery';

class Task extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clickNum: 0,
			startTime: 0,
			stopTime: 0,
			actualTime: 0
		}
	}

	setStartTime() {
		if (this.state.clickNum === 0) {
			let startTimeObj = {
				startTime: new Date().toLocaleString(),
				toDo: this.props.individualTaskProp.toDo
			};
			this.setState({
				clickNum: this.state.clickNum + 1,
				startTime: startTimeObj.startTime
			});
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
		} else if (this.state.clickNum === 1) {
			this.setState({
				clickNum: this.state.clickNum + 1,
				stopTime: new Date().toLocaleString(),
				actualTime: (Date.parse(new Date().toLocaleString()) - Date.parse(this.state.startTime)) / 60000
			});
		}
	}

	render() {
		return (
			<div onClick={this.setStartTime.bind(this)}>
				<h4> Do Time Item: {this.props.individualTaskProp.toDo} </h4>
				<p>Predicted Time: {this.props.individualTaskProp.predictedTime} Actual Time (minutes): {this.state.actualTime}</p>
				<p>Start Time: {this.state.startTime} Stop Time: {this.state.stopTime}</p>
				<br />
			</div>
		)
	} 
	
}

export default Task;
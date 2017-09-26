import React from 'react';
import $ from 'jquery';

class Task extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clickNum: 0,
			startTime: this.props.individualTaskProp.startTime || 0,
			stopTime: this.props.individualTaskProp.stopTime || 0,
			actualTime: this.props.individualTaskProp.actualTime || 0
		}
	}

	setTimes() {
		if (this.state.clickNum === 0) {
			let startTimeObj = {
				startTime: new Date().toLocaleString(),
				toDo: this.props.individualTaskProp.toDo
			};
			this.setState({
				clickNum: this.state.clickNum + 1,
				startTime: startTimeObj.startTime
			}, function() {
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
			});
		} else if (this.state.clickNum === 1) {
			let stopTimeObj = {
				stopTime: new Date().toLocaleString(),
				toDo: this.props.individualTaskProp.toDo	
			};
			stopTimeObj.actualTime = (Date.parse(stopTimeObj.stopTime) - Date.parse(this.state.startTime)) / 60000
			this.setState({
				clickNum: this.state.clickNum + 1,
				stopTime: stopTimeObj.stopTime,
				actualTime: stopTimeObj.actualTime
			}, function() {
				console.log("current state", this.state);
				stopTimeObj['actualTime'] = this.state.actualTime;
				console.log("Stop time object", stopTimeObj);
				$.ajax({
		      method: 'POST',
		      url: '/toDos',
		      data: JSON.stringify(stopTimeObj),
		      contentType: 'application/json',
		      success: function(data) {
		      	console.log("Successful post of stop time");
		      },
		      error: function(err) {
		      	console.log("Unsuccessful post of stop time");
		      }
		    });
			});
		}
	}

	render() {
		return (
			<div onClick={this.setTimes.bind(this)}>
				<h4> Do Time Item: {this.props.individualTaskProp.toDo} </h4>
				<p>Predicted Time: {this.props.individualTaskProp.predictedTime} Actual Time (minutes): {this.state.actualTime}</p>
				<p>Start Time: {this.state.startTime} Stop Time: {this.state.stopTime}</p>
				<br />
			</div>
		)
	} 
	
}

export default Task;
import React from 'react';

const Task = (props) => (
	<div>
		<h3> Do Time Item: {props.individualTaskProp.toDo} </h3>
		<h5> Predicted Time: {props.individualTaskProp.predictedTime} </h5>
		<h5> Actual Time: {props.individualTaskProp.actualTime} </h5>
	</div>
)

export default Task;
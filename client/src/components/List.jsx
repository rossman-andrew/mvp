import React from 'react';
import Task from './Task.jsx';


const List = (props) => (
	<div>
		{props.itemsArray.map( individualItem => <Task individualTaskProp={individualItem} /> )}
	</div>
)

export default List;
import * as types from './../constants/ActionTypes';
var s4 = () =>{
	return Math.floor((Math.random()*16)).toString(16);
}
var randomID = () => {
	return s4()+s4()+s4()+s4()+'-'+
	s4()+s4()+s4()+s4()+'-'+
	s4()+s4()+s4()+s4()+'-'+
	s4()+s4()+s4()+s4();
}
var data = JSON.parse(localStorage.getItem("tasks"));
var findId = ( tasks, id) =>{
	var result = -1;
	tasks.forEach((task,index) =>{
		if(task.id === id){
			result  = index   ; 
		}
	})
	return result;
}

var initialState = data ? data : []; 
var myReducer = ( state = initialState, action) => {
	var id, index;
	switch (action.type) {
		case types.LIST_ALL:
			return state;
		case types.ADD_TASK: 
			console.log(action)
			if(action.task.id){
				id = action.task.id;
				index = findId(state, id); 
				state[index] = action.task;
				console.log(state[index]);
			}else{
				var newTask = action.task;
				newTask.id = randomID();
				console.log(newTask);
				state.push(newTask);
			}

			localStorage.setItem('tasks', JSON.stringify(state));
			return [...state];
		case types.UPDATE_STATUS_TASK:
			console.log(action);

			id = action.id;
			index = findId(state, id); 
			state[index] = {
				...state[index],
				status : !state[index].status
			}

			localStorage.setItem('tasks',JSON.stringify(state));
		return [...state];
		case types.DELETE_TASK:
			console.log(action);
			id = action.id;
			index = findId(state, id); 
			console.log(state);
			state.splice(index,1);
			console.log(state);
			localStorage.setItem('tasks',JSON.stringify(state));
		return [...state];
		case types.CREATE_DATA:
			state = [
			{
				id : randomID(),
				name :'study',
				status: true
			},
			{
				id : randomID(),
				name :'sleep',
				status: true
			},
			{
				id : randomID(),
				name :'eat',
				status: false
			}
			];
			localStorage.setItem('tasks',JSON.stringify(state));
		return [...state];
		default:
			// statements_def
			break;
		}
		return state;
	};

	export default myReducer;
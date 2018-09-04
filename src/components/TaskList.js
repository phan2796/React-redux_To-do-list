import React, { Component } from 'react';
import TaskItem from './TaskItem.js';
import {connect} from 'react-redux';
import * as actions from './../actions/index';
class TaskList extends Component {
    constructor(props){
        super(props);
        this.state ={
            filterName : '',
            filterStatus : -1
        }
    }
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        var filter = {
            name : name === "filterName" ? value : this.state.filterName,
            status: name === "filterStatus" ? value : this.state.filterStatus
        };
        this.props.onFilterTable(filter);
        this.setState({
            [name] : value
        });
       
    }
  render() {
    var { tasks, filterTable, searchTask, sortTask } = this.props;
    var {filterName, filterStatus} = this.state;


    console.log(filterTable);
    if(filterTable.name){
        tasks = tasks.filter((task) =>{
            return task.name.toLowerCase().indexOf(filterTable.name) !== -1;
        })
    }
       // console.log(tasks);

       tasks = tasks.filter((task) =>{
        if(filterTable.status === -1){
            return task;
        }else{
            return task.status === (filterTable.status === 1 ? true : false);

        }

    })
    console.log(searchTask);    
    if(searchTask){
        tasks = tasks.filter((task) =>{
            return task.name.toLowerCase().indexOf(searchTask) !== -1;
        })
    }
       // console.log(tasks);


    if(sortTask.by === "name"){
        tasks.sort((a, b) =>{
            if (a.name > b.name) return sortTask.value;
            else if (a.name < b.name) return -sortTask.value;
            else return 0;
        });
    }else if(sortTask.by === "status"){
        tasks.sort((a, b) =>{
            if (a.status > b.status) return -sortTask.value;
            else if (a.status < b.status) return sortTask.value;
            else return 0;
        });
    }
    var elmTask = tasks.map((item, index) =>{
        return <TaskItem 
            key = {index}  
            index = {index + 1} 
            content = {item}
            />
    }) 

    return (
                <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center">STT</th>
                                    <th className="text-center">Tên</th>
                                    <th className="text-center">Trạng Thái</th>
                                    <th className="text-center">Hành Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            name = "filterName"
                                            value = {filterName}
                                            onChange = {this.onChange}
                                            />
                                    </td>
                                    <td>
                                        <select 
                                            className="form-control"
                                            name = "filterStatus"
                                            value = {filterStatus}
                                            onChange = {this.onChange}>
                                            <option value={-1}>Tất Cả</option>
                                            <option value={0}>Chưa thực hiện</option>
                                            <option value={1}>Đã thực hiện</option>
                                        </select>
                                    </td>
                                    <td></td>
                                </tr>
                                {elmTask}
                            </tbody>
                        </table>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        tasks : state.tasks,
        filterTable : state.filterTable,
        searchTask : state.searchTask,
        sortTask : state.sortTask
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
      onFilterTable : (filter) => {
        dispatch(actions.filterTable(filter));
      }
    };
  }
export default connect(mapStateToProps, mapDispatchToProps) (TaskList);

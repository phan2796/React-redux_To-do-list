import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm.js'
import Control from './components/Control.js'
import TaskList from './components/TaskList.js'
import {connect} from 'react-redux';
import * as actions from './actions/index'



class App extends Component {
  constructor(props){
    super(props);
    this.state ={
    }
  }

  onGenerateData = () => {
    this.props.onCreateData();

  }
  
  onAddWorkHandle = () =>{
    var {editTask} = this.props;
    if(editTask && editTask.id !== ''){
      this.props.onOpenForm();
    }else{
      this.props.onToggleForm();
    }

    this.props.onClearTask({
      id : '',
      name : '',
      status : false
    });
  }

  render() {
        var { isDisplayForm } = this.props;
        return (

          <div className="container">
            <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr/>
            </div>
            <div className="row">
              <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4"
              : ""}>
                <TaskForm/> 
              </div>
              <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={this.onAddWorkHandle}>
                  <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                </button>
                  <button 
                  type="button" 
                  className="btn btn-danger ml-5"
                  onClick = {this.onGenerateData}>
                  <span className="fa fa-plus "></span>Generate Data
                </button>
                <Control />
                <br/>
                <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList/>
                </div>
                </div>
              </div>
            </div>
          </div>
          );
      }
    }
    const mapStateToProps = state => {
     return {
      isDisplayForm : state.isDisplayForm,
      editTask : state.editTask,

    };
  };

  const mapDispatchToProps = (dispatch, props) => {
    return {
      onToggleForm : () => {
        dispatch(actions.toggleForm())
      },

      onOpenForm : () => {
        dispatch(actions.openForm())
      },
      onClearTask: (task) => {
        dispatch(actions.editTask(task))
      },
      onCreateData : () => {
        dispatch(actions.createData())
      }
    };
  }
  export default connect(mapStateToProps, mapDispatchToProps) (App);

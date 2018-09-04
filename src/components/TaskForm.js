import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions/index'
class TaskForm extends Component {
    constructor(props){
       super(props);
        this.state ={
            id: '',
            name : '',
            status : false
        }
    }
    componentWillMount(){
        if(this.props.editTask !== null){
            this.setState({
                id: this.props.editTask.id,
                name : this.props.editTask.name,
                status : this.props.editTask.status
            })
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.editTask){
            this.setState({
                id: nextProps.editTask.id,
                name : nextProps.editTask.name,
                status : nextProps.editTask.status
            })
        }else if(nextProps && nextProps.editTask === null){
           this.setState({
               id: '',
               name : '',
               status : false
            })
        }
    }
    onHanddleClose = () => {
        this.props.onCloseForm();
    }
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === 'status'){
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name] : value
        });
    }
    onSubmit = (event) =>{
        event.preventDefault();
        this.props.onAddTask(this.state)
        this.onClear();
        this.props.onCloseForm();
    }
    onClear = (event) =>{
       if(this.state.id){
           this.onHanddleClose();
       }else{
        this.setState({
            name : '',
            status : false
        });
           this.onHanddleClose();
        
    }
        
    }
  render() {
    var {id} = this.state;
    if(!this.props.isDisplayForm) return null ;
    return (
      <div className="panel panel-warning">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                        {id === '' ? 'Thêm Công Việc' : 'Chỉnh sửa'}
                           
                          <span className="fas fa-window-close pull-right"
                                onClick = {this.onHanddleClose}></span>
                        </h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit = {this.onSubmit}>
                            <div className="form-group">
                                <label>Tên :</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}/>
                            </div>
                            <label>Trạng Thái :</label>
                            <select 
                                className="form-control" 
                                required="required"
                                name="status"
                                value={this.state.status} 
                                onChange={this.onChange}>
                                <option value={true}>Đã thực hiện</option>
                                <option value={false}>Chưa thực hiện</option>
                            </select>
                            <br/>
                            <div className="text-center">
                                <button type="submit" className="btn btn-warning">
                                  <i className="fas fa-plus-circle mr-5"></i>Lưu 
                                </button>
                                &nbsp;
                                <button 
                                    type = "button"
                                    className="btn btn-danger"
                                    onClick = {this.onClear}>
                                  <i className="fas fa-times mr-5"></i> Hủy Bỏ
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
    );
  }
}

const mapStateToProps = state => {
   return {
        isDisplayForm : state.isDisplayForm,
        editTask : state.editTask
     };
};
const mapDispatchToProps = (dispatch, props) =>{
    return {
        onAddTask : (task) =>{
            dispatch(actions.addTask(task));
        },
        onCloseForm : () => {
            dispatch(actions.closeForm())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (TaskForm);

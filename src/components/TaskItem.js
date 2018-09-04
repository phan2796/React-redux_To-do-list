import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions/index'
class TaskItem extends Component {
    onChangeStatus = () =>{
       this.props.onUpdateStatus(this.props.content.id);
    }
    onDeleteHandle = () =>{
        this.props.onDeleteTask(this.props.content.id);
        this.props.onCloseForm();
    }
    onEditHandle = () =>{
        //this.props.onEditHandle(this.props.content.id);
        this.props.onOpenForm();
        this.props.onEditTask(this.props.content);
    }
  render() {
    var {content, index} = this.props;
    return (
            <tr>
                <td>{index}</td>
                <td>{content.name}</td>
                <td className="text-center">
                    <span 
                        className={content.status ? 'label label-success' : 'label label-danger'}
                        onClick={this.onChangeStatus}>
                        {content.status ? 'Đã thực hiện' : 'Chưa thực hiện'}
                    </span>
                </td>
                <td className="text-center">
                    <button 
                    type="button" 
                    className="btn btn-warning"
                    onClick={this.onEditHandle}>
                        <span className="fas fa-edit mr-5"></span>Sửa
                    </button>
                    &nbsp;
                    <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick={this.onDeleteHandle}>
                        <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                </td>
            </tr>
    );
  }
}
const mapStateToProps = state => {
    return {
    }
};
const mapDispatchToProps = (dispatch, props) =>{
    return {
        onUpdateStatus : (id) =>{
            dispatch(actions.updateStatus(id));
        },
        onDeleteTask : (id) =>{
            dispatch(actions.deleteTask(id));         
        },
        onCloseForm : () => {
            dispatch(actions.closeForm())
        },
        onOpenForm : () => {
            dispatch(actions.openForm())
        },
        onEditTask : (task) => {
            dispatch(actions.editTask(task))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (TaskItem);

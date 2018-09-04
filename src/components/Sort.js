import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions/index';
class Sort extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
        sort :{
            by: '',
            value: 0
        }
      };
    }
    onClick = (name, value) =>{
        console.log(name);
        console.log(value);

        this.setState({
         sort :{
            by: name,
            value:value
            }
        });
        var sort = {
            by : name,
            value : value
        }
        this.props.onSortTask(sort);
    }
  render() {
    var {sort} = this.state;
    return (
           <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    Sắp Xếp <span className="fas fa-sort-down ml-5"></span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li 
                    onClick = { () => this.onClick('name' , 1)}>
                        <a role="button">
                            <span className="fas fa-sort-alpha-down ">
                            &nbsp; Tên A-Z
                            </span>
                            <i className={sort.by === "name" && sort.value === 1 
                                ? "fas fa-check ml-15" : ""}></i>
                        </a>
                    </li>
                    <li
                    onClick = { () => this.onClick('name' , -1)}>
                        <a role="button">
                            <span className="fas fa-sort-alpha-up">
                            &nbsp; Tên Z-A
                            </span>
                            <i className={sort.by === "name" && sort.value === -1 
                            ? "fas fa-check ml-15" : ""}></i>
                        </a>
                                
                    </li>
                    <li role="separator" className="divider"></li>
                    <li
                        onClick = { () => this.onClick('status' , 1)}>
                        <a role="button">Đã hoàn thành 
                            <i className={sort.by === "status" && sort.value === 1 
                            ? "fas fa-check ml-15" : ""}></i>
                        </a>
                        
                    </li>
                    <li
                        onClick = { () => this.onClick('status' , -1)}>
                        <a role="button">Chưa hoàn thành
                                <i className={sort.by === "status" && sort.value === -1 
                                ? "fas fa-check ml-15" : ""}></i>
                        </a>
                        
                    </li>
                </ul>
            </div>
    );
  }
}
const mapStateToProps = state => {
   return {
  };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
    onSortTask: (sort) => {
        dispatch(actions.sortTask(sort))
    }
};
}
export default connect(mapStateToProps, mapDispatchToProps) (Sort);


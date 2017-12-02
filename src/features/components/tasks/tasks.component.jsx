import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styles from './tasks.component.scss';

export default class TasksComponent extends Component {
  render() {
    const task = this.props.task || {};
    
    return (
      <div className={ styles.tasks}>
        <div className="row">
          <div className="col-md-12 row bg-info">
            <div className="card">
                <div className="card-block-rounded">
                  <h4 className="card-title">{task.description}</h4>
                  <h4 className="card-subtitle mb-2 ">status: {task.status}</h4>
                  <h4 className="card-subtitle mb-2">due date: {task.due_date}</h4>
                  <p className="card-text">asign to: {task.assigned_to}</p>
                  <a href="#" className="btn btn-primary">update this task</a>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

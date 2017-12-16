import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./tasks.component.scss";

export default class TasksComponent extends Component {
  render() {
    const task = this.props.task || {};

    return (
      <div className={`${styles.tasks}`}>
        <div class="panel panel-info">
          <div class="panel-heading">
            <h3 class="panel-title ">{task.description}</h3>
          </div>
          <div class="panel-body">
            <div className="card-block-rounded">
              <div className="form-group">
                <label className="text-lowercase">
                  current status: {task.status}
                </label>
                <select
                  className="form-control custom-select mb-2 mr-sm-2 mb-sm-0"
                  ref="type"
                  name="type"
                >
                  <option value="worker">to do</option>
                  <option value="manager">in progress</option>
                  <option value="ceo">done</option>
                </select>
              </div>

              <h4 className="card-subtitle mb-2">due date: {task.due_date}</h4>

              <button className="btn btn-danger">update this task</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

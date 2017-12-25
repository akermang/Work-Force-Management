import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./can-board.component.scss";
import ColumnComponent from "./column/column.component.jsx";
import TasksComponent from "../tasks/tasks.component.jsx";

export default class CanBoardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedTask: null };
  }
  render() {
    const toDo = this.getTasksByStatus("to do");
    const inProgress = this.getTasksByStatus("in progress");
    const done = this.getTasksByStatus("done");

    return (
      <div className={styles.canBoard + " row"}>
        {this.state.selectedTask ? (
          <TasksComponent
            task={this.state.selectedTask}
            onCancelTaskSelection={() => this.cancelTaskSelection()}
          />
        ) : null}
        <div className="col-lg-4">
          <div
            className={`${styles.toDo} ${
              styles.col
            } panel panel-danger container-fluid`}
          >
            <div className="panel-heading">
              <h3 className="panel-title">To do - Tasks </h3>
            </div>
            <ColumnComponent
              tasks={toDo}
              onTaskSelection={task => this.modifyTask(task)}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div
            className={`${styles.inProgress} ${
              styles.col
            } panel panel-primary container-fluid`}
          >
            <div className="panel-heading">
              <h3 className="panel-title">In progress - Tasks</h3>
            </div>
            <div className="">
              <ColumnComponent
                tasks={inProgress}
                onTaskSelection={task => this.modifyTask(task)}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div
            className={`${styles.done} ${
              styles.col
            } panel panel-success container-fluid`}
          >
            <div className="panel-heading">
              <h3 className="panel-title">Done - Tasks</h3>
            </div>
            <ColumnComponent
              tasks={done}
              onTaskSelection={task => this.modifyTask(task)}
            />
          </div>
        </div>
      </div>
    );
  }

  getTasksByStatus(status) {
    const tasks = this.props.tasks || [];
    return tasks.filter(task => {
      return task.status === status;
    });
  }

  modifyTask(task) {
    this.setState({ selectedTask: task });
  }

  cancelTaskSelection() {
    this.setState({ selectedTask: null });
  }
}

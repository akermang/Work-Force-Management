import React, { Component } from "react";
import styles from "./column.component.scss";

export default class ColumnComponent extends Component {

  render() {
    const tasks = this.props.tasks || [];
    return (
      <div>
        {tasks.map(task => {
          return (
            <div key={task.id}>
              <div className={`${styles.task} btn`} onClick={() => this.props.onTaskSelection(task)}>
                {task.description}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  

  // TODO: *** ---- ***
  //       - create click event listener for every task
  //       - click on task should open it for editing
  //       - create endpoint for task/{taskId}/edit in api.js and endpoints.json
  //       - create action in task.action
  //       - update state by dispatching action to task.reducer
}

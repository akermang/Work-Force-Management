import React, { Component } from "react";

export default class ColumnComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedTask: null };
  }
  modifyTask(task) {
    console.log(task);
    this.setState({ selectedTask: task });
  }

  render() {
    const tasks = this.props.tasks || [];
    return (
      <div>
        {tasks.map(task => {
          return (
            <div key={task.id}>
              <div className="btn" onClick={() => this.modifyTask(task)}>
                {task.description}
              </div>
            </div>
          );
        })}
        {
            this.state.selectedTask ? 
            <div>hello</div>
            : null
        }
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

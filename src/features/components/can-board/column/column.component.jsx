import React, { Component } from 'react'

export default class ColumnComponent extends Component {
  render() {
      const tasks = this.props.tasks || [];
    return (
      <div>
        {
            tasks.map(task => {
                return (
                    <task key={task.id}>
                        <div>{task.description}</div>
                    </task>                    
                )
            })
        }
      </div>
    )
  }

  // TODO: *** ---- ***
  //       - create click event listener for every task
  //       - click on task should open it for editing
  //       - create endpoint for task/{taskId}/edit in api.js and endpoints.json
  //       - create action in task.action
  //       - update state by dispatching action to task.reducer
}

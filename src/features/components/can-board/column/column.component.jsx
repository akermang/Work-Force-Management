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
}

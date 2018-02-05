import React, { Component } from "react";
import styles from "./column.component.scss";

export default class ColumnComponent extends Component {

  render() {    
    const tasks = this.props.tasks || [];
    return (
      <div className="list-group">
        {tasks.map(task => {
          return (
            
              <button key={task.id} className={`${styles.task} list-group-item`} onClick={() => this.props.onTaskSelection(task)}>
               <span className="text-primary"> {task.description} </span>
              </button>
          );
        })}
      </div>
    );
  }
}



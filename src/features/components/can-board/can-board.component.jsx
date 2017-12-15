import React from "react";
import { connect } from "react-redux";
import styles from "./can-board.component.scss";
import ColumnComponent from "./column/column.component.jsx";

const CanBoardComponent = props => ({
  render() {
    const toDo = this.getTasksByStatus("to do");
    const inProgress = this.getTasksByStatus("in progress");
    const done = this.getTasksByStatus("done");

    return (
      <div className={styles.canBoard + " row"}>
        <div className={`${styles.toDo} ${styles.col} col-lg-4 bg-danger`}>
          <h2>to do</h2>
          <ColumnComponent tasks={toDo} onTaskSelection={ task => console.log(task)}/>
        </div>
        <div className={`${styles.inProgress} ${styles.col} col-lg-4 bg-primary`}>
          <h3>in progress</h3>
          <ColumnComponent tasks={inProgress} onTaskSelection={ task => console.log(task)}/>
        </div>
        <div className={`${styles.done} ${styles.col} col-lg-4 bg-success`}>
          <h3>done</h3>
          <ColumnComponent tasks={done} onTaskSelection={ task => console.log(task) }/>
        </div>

        {/* editing component here */}

      </div>
    );
  },

  getTasksByStatus(status) {
    const tasks = this.props.tasks || [];
    return tasks.filter(task => {
      return task.status === status;
    });
  }
});

export default connect(null)(CanBoardComponent);

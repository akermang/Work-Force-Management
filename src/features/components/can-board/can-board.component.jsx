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
        <div className={`${styles.toDo + " col-lg-4 bg-danger"} ${styles.col}`}>
          <label>to do</label>
          <ColumnComponent tasks={toDo} />
        </div>
        <div className={`${styles.inProgress + " col-lg-4 bg-primary"} ${styles.col}`}>
          <label>in progress</label>
          <ColumnComponent tasks={inProgress} />
        </div>
        <div className={`${styles.done + " col-lg-4 bg-success"} ${styles.col}`}>
          <label>done</label>
          <ColumnComponent tasks={done} />
        </div>
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

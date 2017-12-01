import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ApiService } from "../../../common/services/api.service";
import {
  ADD_USER_START,
  ADD_USER_FAIL,
  ADD_USER_SUCCSES
} from "../../../common/state/user/user.actions";
import { FETCH } from "../../../common/actions";
import styles from './add-user-form.component.scss';

export class AddUserForm extends Component {
  render() {
    return (
      <div>
        <h2 className={styles.title}>Add user</h2>
        <form
          encType="multipart/form-data"
          onSubmit={e => this.fetchAddUser(e)}
        >
          <div className="form-group">
            <label className="label form-contro" htmlFor="firstName">
              {" "}
              First name:{" "}
            </label>
            <input
              className="form-control"
              placeholder="First name"
              type="text"
              ref="firstName"
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="lastName">
              {" "}
              Last name:{" "}
            </label>
            <input
              className="form-control"
              placeholder="Last name"
              type="text"
              ref="lastName"
            />
          </div>
          <div className="form-group">
            <label className="label mr-sm-2">
              Type
            </label>
            <select
              className="form-control custom-select mb-2 mr-sm-2 mb-sm-0"
              ref="type"
            >
              <option value="worker">worker</option>
              <option value="maneger">maneger</option>
              <option value="ceo">ceo</option>
            </select>
          </div>
          <div className="form-group">
            <label className="label">
              {" "}
              username:{" "}
            </label>
            <input
              className="form-control"
              type="text"
              ref="username"
            />
          </div>
          <div className="form-group">
            <label className="label">
              {" "}
              Avatar:{" "}
            </label>
            <input
              className="form-control"
              type="file"
              ref="avatar"
            />
          </div>
          <div>
            <input
              className={" form-control btn btn-lg btn-primary btn-block"}
              type="submit"
              value="Add user"
            />
          </div>
        </form>
      </div>
    );
  }
  componentDidMount() {
    this.refs.firstName.focus();
  }

  fetchAddUser(e) {
    e.preventDefault();
    const o = new ApiService().getOptions("addUser");
    const { url, params } = o;
    const firstName = this.refs.firstName.value;
    const lastName = this.refs.lastName.value;
    const username = this.refs.username.value;
    const type = this.refs.type.value;
    const avatar = this.refs.avatar.files;
    var formData = new FormData(document.forms[0]);

    const data = { firstName, lastName, type, username };
    params.body = JSON.stringify(data);
    const payload = {
      url,
      params: params,
      startActionType: ADD_USER_START,
      successActionType: ADD_USER_SUCCSES,
      failActionType: ADD_USER_FAIL
    };
    this.props.dispatch({ type: FETCH, payload: payload });
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(AddUserForm);

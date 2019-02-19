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
import styles from "./add-user-form.component.scss";

export class AddUserForm extends Component {
  render() {
    return (
      <div className={styles.add_user_form}>
        <h3 className={styles.title}>Add user</h3>
        <form
          encType="multipart/form-data"
          onSubmit={e => this.fetchAddUser(e) }
        >
          <div className="form-group">
            <label className="form-contro text-lowercase" htmlFor="firstName">
              first name
            </label>
            <input
              className="form-control"
              placeholder="First name"
              type="text"
              ref="firstName"
              name="firstName"
            />
          </div>
          <div className="form-group">
            <label className="text-lowercase" htmlFor="lastName">
              last name
            </label>
            <input
              className="form-control"
              placeholder="Last name"
              type="text"
              ref="lastName"
              name="lastName"
            />
          </div>
          <div className="form-group">
            <label className="text-lowercase mr-sm-2">type</label>
            <select
              className="form-control custom-select mb-2 mr-sm-2 mb-sm-0"
              ref="type"
              name="type"
            >
              <option value="worker">worker</option>
              <option value="manager">manager</option>
              <option value="ceo">ceo</option>
            </select>
          </div>
          <div className="form-group">
            <label className="text-lowercase">username</label>
            <input name="username" className="form-control" type="text" ref="username" />
          </div>
          <div className="form-group">
            <label className="text-lowercase">image</label>
            <input name="avatar" className="form-control" type="file" ref="avatar" />
          </div>
          <div>
            <input
              className={"btn btn-lg btn-primary btn-block"}
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
    
    var fd = new FormData(document.forms[0]);    
    params.body = fd //JSON.stringify(data); 

    const payload = {
      url,
      params,
      startActionType: ADD_USER_START,
      successActionType: ADD_USER_SUCCSES,
      failActionType: ADD_USER_FAIL
    };
    this.props.dispatch({ type: FETCH, payload: payload });
    this.props.history.push("/");
  }

}

export default AddUserForm;

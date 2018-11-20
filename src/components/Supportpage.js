import React, { Component } from "react";
import { connect } from "react-redux";
import { enterSupport, leaveSupport, setRef } from "../actions/support";


class Supportpage extends Component {
  state = {
    mainSubject: "",
    fullName: "",
    email: "",
    subject: "",
    message: ""
  };
  componentDidMount() {
    this.props.dispatch(enterSupport());

  }

  componentWillUnmount() {
    this.props.dispatch(leaveSupport());
  }

  //====================================================
  handleMainSubjectChange = (e) => {
    const mainSubject = e.target.value;
    this.setState(() => ({mainSubject}))
  };
  handleFullNameChange = (e) => {
    const fullName = e.target.value;
    this.setState(() => ({fullName}))
  };
  handleEmailChange = (e) => {
    const email = e.target.value;
    this.setState(() => ({email}))
  };
  handleSubjectChange = (e) => {
    const subject = e.target.value;
    this.setState(() => ({subject}))
  };
  handleMessageChange = (e) => {
    const message = e.target.value;
    this.setState(() => ({message}))
  };
  //====================================================
  handleFormSubmit = (e) => {
    e.preventDefault();
    const {mainSubject, fullName, email, subject, message} = this.state;
    this.setState(() => ({
      mainSubject: "", fullName: "", email: "", subject: "", message: ""
    }));
    console.log(mainSubject, fullName, email, subject, message)
  };
  //====================================================
  handleSupportAddRequest = () => {
    this.props.dispatch(setRef(this.props.location.pathname));
    this.props.history.push("/dashboard");
  };
  handleSupportListRequest = () => {
    this.props.history.push("/dashboard");
  };
  //====================================================


  render() {
    return (
      <div>
        {
          this.props.auth &&
        <div>
          <button onClick={this.handleSupportAddRequest}>add</button>
          <button onClick={this.handleSupportListRequest}>list</button>
        </div>
        }
        <select
          name="headerSubject"
          defaultValue="What would you like to talk about?"
          onChange={this.handleMainSubjectChange}
        >
          <option disabled>What would you like to talk about?</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <form onSubmit={this.handleFormSubmit}>
          <input
            value={this.state.fullname}
            onChange={this.handleFullNameChange}
            type="text"
            placeholder="Full name"
          />
          <input
            value={this.state.email}
            onChange={this.handleEmailChange}
            type="text"
            placeholder="Email"
          />
          <input
            value={this.state.subject}
            onChange={this.handleSubjectChange}
            type="text"
            placeholder="Subject"
          />
          <textarea
          value={this.state.message}
          onChange={this.handleMessageChange}
          placeholder="Let us know how can we help"
          />
          <button>Submit</button>
        </form>

      </div>
    );
  }
}
const mapStatToProps = (state) => {
  return {
    auth: state.auth
  }
};
export default connect(mapStatToProps)(Supportpage);
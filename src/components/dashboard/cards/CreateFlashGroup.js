import React, { Component } from "react";

class CreateFlashGroup extends Component {
  state = {
    title: "test title",
    edit: false
  };
  handleCancel = () => {
    this.props.cancel();
  };

  handleTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };

  startTitleEdit = () => {
    this.setState(() => ({ edit: true }));
  };
  endTitleEdit = () => {
    this.setState(() => ({ edit: false }));
  };

  render() {
    return (
      <div>
        <button onClick={this.handleCancel}>Cancel</button>
        {
          this.state.edit ?
            <input
              autoFocus={true}
              style={{display: "block"}}
              type="text"
              value={this.state.title}
              onChange={this.handleTitleChange}
              onBlur={this.endTitleEdit}
            /> :
            <div>
              <h2>{this.state.title}</h2>
              <button onClick={this.startTitleEdit}>Edit</button>
            </div>
        }

      </div>
    );
  }
}

export default CreateFlashGroup;
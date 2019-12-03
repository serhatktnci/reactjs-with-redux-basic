import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as itemsActions from "../../redux/actions/ItemActions";
import { connect } from "react-redux";
import alertify from "alertifyjs"
import { Link } from "react-router-dom";
class AddItem extends Component {
  state = { id: 1, name: "", link: "" };
  hasError = false;
  onChangeHandler = event => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });


  };

  onSubmitHandler = e => {
    e.preventDefault();
    if (this.state.link === '') {
      return alertify.warning("Geçersiz url");

    }
    if (this.state.name === '') {
      return alertify.warning("Geçersiz isim");
    }
    if (this.state.link !== '') {
      var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
      var regex = new RegExp(expression);

      if (!this.state.link.match(regex)) {
        return alertify.warning("Geçersiz url");
      }
    }

    this.setState({ id: this.state.id + 1 }, () => {
      this.props.actions.addItem({
        name: this.state.name,
        link: this.state.link,
        upVote: 0,
        downVote: 0,
        id: this.state.id
      });

      alertify.success(this.state.name + " added");

    });




  };

  render() {
    return (
      <div>
        <div>                 <Link to="/">Return Back</Link>        </div>
        <form onSubmit={this.onSubmitHandler}>
          <h3>User Name:</h3>
          <input name="name" onChange={this.onChangeHandler} type="text"></input>

          <h3>Link URL:</h3>
          <input name="link" onChange={this.onChangeHandler} type="text"></input>

          <input type="submit" value="ADD"></input>
        </form>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    items: state.itemsReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      addItem: bindActionCreators(itemsActions.addItem, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);

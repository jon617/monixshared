import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { TextField, RaisedButton } from 'material-ui';
import { connect } from 'react-redux';
import * as actions from '../actions';
// import { GroupClass } from '../../../api';
import './ClassPicker.scss';

// inputRef
// value
// setValue (id, name)
// dropdownOpen (boolean)
// setDropdownOpen (function)
// setDropdownClose (function)

class ClassPicker extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      openDropdown: "",
    }
  }
  changeField = ({ target }) => {

  }
  onFocus = () => {
    this.props.setDropdownOpen();
  }
  goToClasses = () => {
    this.props.setDropdownClose();
    this.props.setScheduleWeekAddEvent();
    this.props.history.push("/app/classes");
  }
  clickSelection = ( id, name ) => {
    this.props.setValue( id, name );
    this.props.setDropdownClose();
  }

  render() {
    // console.log( this.props.meteor );
    return (
      <div className="ClassPicker">
        <div className="ClassPickerDropdownContainer">
          { this.props.dropdownOpen
            &&
            <div className="ClassPickerDropdown">
              { this.props.meteor.groupClasses.length == 0
                &&
                <div className="NoClassesText">
                  No group classes
                  <br /><br />
                  <RaisedButton
                    label="setup now"
                    // labelColor="#ffffff"
                    labelStyle={{ color: "#ffffff", fontSize: 14, top: -1 }}
                    backgroundColor="#4285f4"
                    style={{ height: 30 }}
                    onClick={ this.goToClasses }
                  />
                </div>
              }
              { this.props.meteor.groupClasses.map( (a) => {
                return (
                  <div
                    key={ a._id }
                    className="ClassPickerDropdownItem"
                    id={ "classPickerItem-" + a._id }
                    onClick={ () => this.clickSelection( a._id, a.name ) }
                  >
                    { a.name }
                  </div>
                )
              } ) }
            </div>
          }
        </div>
        <TextField
          ref={ (el) => this.props.inputRef = el }
          id="classPicker"
          value={ this.props.value }
          onChange={ this.changeField }
          onFocus={ this.onFocus }
          onBlur={ this.shouldCloseDropdown }
          fullWidth
          hintText="Choose a class"
          style={{
            border: "1px solid #111111",
            borderRadius: 8,
          }}
          inputStyle={{
            color: "#111111",
            marginLeft: 10,
          }}
          hintStyle={{
            paddingLeft: 10,
            color: "#dddddd",
          }}
        />
      </div>
    )
  }
}

const mapMeteorToProps = (props) => {
  return {
    meteor: {
      groupClasses: GroupClass.find({
      }).fetch()  ||  [ ],
    },
  };
};

export default withRouter(
  connect( null, actions )(
    withTracker( mapMeteorToProps )(
      ClassPicker
    )
  )
);

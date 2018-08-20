import React, { Component } from 'react';
import ReactSwitch from 'react-switch';
import './PermissionsEdit.scss';

// incoming variables:
// fieldRef
// setValue - function to set the value
// name - string to write
// val (true/false)

class PermissionsEdit extends Component {
  constructor( props ) {
    super( props );
  }
  handleChange = (val) => {
    this.props.setValue( val );
  }
  handleClick = () => {
    this.props.setValue( ! this.props.val );
  }
  render() {
    return (
      <div className="PermissionsEdit">

        <div className="PermissionsEditTable">
          <div className="PermissionsEditTableBody">
            <div className="PermissionsEditTableRow">
              <div className="PermissionsEditText"
                onClick={ this.handleClick }
              >
                { this.props.name }
              </div>
              <div className="PermissionsEditToggle">
                <label htmlFor="normal-switch">
                  <ReactSwitch
                    checked={ this.props.val }
                    className="react-switch"
                    id="normal-switch"
                    onColor="#4285f4"
                    onChange={ this.handleChange }
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}
export default PermissionsEdit;

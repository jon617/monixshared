import React, { Component } from 'react';
import NameCase from 'namecase';
import {
  TextField,
} from 'material-ui';
import { USstateEntry } from '../../lib/functions';
import './CityStateZip.scss';

// incoming variables:
// fieldRef
// cityVal
// setCity
// stateVal
// setState
// zipVal
// setZip

class CityStateZip extends Component {
  // constructor( props ) {
  //   super(props);
  //   this.state = {
  //   };
  // }
  onChangeCity = ({ target }) => {
    if ( typeof target !== "object" ) {
      return ;
    }
    let city = target.value;
    city = city.substring( 0, 25 );
    this.props.setCityError("");
    this.props.setCity( city );
  }
  onBlurCity = () => {
    let city = this.props.cityVal;
    city = NameCase( city );
    city = city.replace(
      new RegExp(" on ", "ig"),
      " on "
    );
    this.props.setCity( city );
  }
  onChangeState = ({ target }) => {
    if ( typeof target !== "object" ) {
      return ;
    }
    let state = target.value;
    state = state.replace(
      new RegExp("[^a-zA-Z\\s]", "g"),
      ""
    );
    state = state.replace(
      new RegExp("\\s{2,}"),
      ""
    );
    state = state.substring( 0, 13 );

    // make sure the first typed character is a capital letter
    if ( (this.props.stateVal.length == 0) && (state.length == 1) ) {
      state = state.toUpperCase();
    }

    // check state match, fill in rest if match found with state library
    const stateMatch = USstateEntry( state );
    if ( stateMatch.abbr ) {
      state = stateMatch.abbr;
    }
    this.props.setStateError("");
    this.props.setState( state );
  }
  onBlurState = () => {
    let state = this.props.stateVal;

  }

  onChangeZip = ({ target }) => {
    let zip = target.value;
    zip = zip.replace(
      new RegExp("[^\\d]", "g"),
      ""
    );
    zip = zip.substring( 0, 5 );
    this.props.setZipError("");
    this.props.setZip( zip );
  }

  render() {
    return (
      <div className="CityStateZip">
        <div className="CityStateZipTable">
          <div className="CityStateZipTableBody">
            <div className="CityStateZipTableRow">

              <div className="City">

                <TextField
                  // ref={ (el) => { this.phone = el; } }
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="on"
                  spellCheck="false"
                  floatingLabelText="City"
                  floatingLabelFixed={ false }
                  hintText=""
                  onChange={ this.onChangeCity }
                  value={ this.props.cityVal }
                  onBlur={ this.onBlurCity }
                  errorText={ this.props.cityErrorVal }
                  fullWidth
                  style={{
                    fontSize: 30,
                    height: 90,
                    border: "0px solid #aaaaaa",
                  }}
                  floatingLabelFocusStyle={{
                    color: "#aaaaaa",
                  }}
                  inputStyle={{
                    marginLeft: 10,
                    color: "#000000",
                  }}
                  errorStyle={{
                    fontSize: 18,
                    fontWeight: 400,
                    marginTop: 10,
                  }}
                  hintStyle={{
                    marginBottom: 8,
                    marginLeft: 10,
                    color: "#dddddd",
                  }}
                  floatingLabelStyle={{
                    marginLeft: 10,
                    top: 31,
                    color: "#cccccc",
                    fontSize: 24,
                  }}
                  // onKeyPress={ this.goEnterKey }
                />


              </div>

              <div className="State">

                <TextField
                  // ref={ (el) => { this.phone = el; } }
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="on"
                  spellCheck="false"
                  floatingLabelText="State"
                  floatingLabelFixed={ false }
                  hintText=""
                  onChange={ this.onChangeState }
                  value={ this.props.stateVal }
                  onBlur={ this.onBlurState }
                  errorText={ this.props.stateErrorVal }
                  fullWidth
                  style={{
                    fontSize: 30,
                    height: 90,
                    border: "0px solid #aaaaaa",
                  }}
                  floatingLabelFocusStyle={{
                    color: "#aaaaaa",
                  }}
                  inputStyle={{
                    marginLeft: 10,
                    color: "#000000",
                  }}
                  errorStyle={{
                    fontSize: 18,
                    fontWeight: 400,
                    marginTop: 10,
                  }}
                  hintStyle={{
                    marginBottom: 8,
                    marginLeft: 10,
                    color: "#dddddd",
                  }}
                  floatingLabelStyle={{
                    marginLeft: 10,
                    top: 31,
                    color: "#cccccc",
                    fontSize: 24,
                  }}
                  // onKeyPress={ this.goEnterKey }
                />
              </div>


              <div className="Zip">

                <TextField
                  // ref={ (el) => { this.phone = el; } }
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  floatingLabelText="Zip"
                  floatingLabelFixed={ false }
                  hintText=""
                  onChange={ this.onChangeZip }
                  value={ this.props.zipVal }
                  onBlur={ this.onBlurZip }
                  errorText={ this.props.zipErrorVal }
                  fullWidth
                  style={{
                    fontSize: 30,
                    height: 90,
                    border: "0px solid #aaaaaa",
                  }}
                  floatingLabelFocusStyle={{
                    color: "#aaaaaa",
                  }}
                  inputStyle={{
                    marginLeft: 10,
                    color: "#000000",
                  }}
                  errorStyle={{
                    fontSize: 18,
                    fontWeight: 400,
                    marginTop: 10,
                  }}
                  hintStyle={{
                    marginBottom: 8,
                    marginLeft: 10,
                    color: "#dddddd",
                  }}
                  floatingLabelStyle={{
                    marginLeft: 10,
                    top: 31,
                    color: "#cccccc",
                    fontSize: 24,
                  }}
                  // onKeyPress={ this.goEnterKey }
                />


              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CityStateZip;

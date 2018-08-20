// this is /commonlist, called by the react router in App.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';  // import all redux actions, so we can change values of any redux global variables if we want to
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MaterialMonixUITheme from '../MaterialMonixUITheme';
import {
  BirthdayInput,
  CalendarMonth,
  CityStateZip,
  ClassPicker,
  CreditCard,
  DurationInput,
  MultilineInput,
  NameInput,
  PhoneInput,
  PriceInput,
  RegularInput,
  SearchInput,
  StreetAddress,
} from '../Common';
import './CommonList.scss';

class CommonList extends Component {
  constructor( props ) {
    super( props );
    this.defaultState = {
      // initial state of the page
      birthday: "",
      birthdayError: "",

      city: "",
      cityError: "",

      state: "",
      stateError: "",

      zip: "",
      zipError: "",

      cc: "",
      ccError: "",

      exp: "",
      expError: "",

      cvv: "",
      cvvError: "",

      name: "",
      nameError: "",

      price: "",
      priceError: "",

      regularValue: "",
      regularError: "",

      search: "",
      searchError: "",
    }
    this.state = this.defaultState;
  }

  setRegularInputValue = (val) => {
    console.log("In the regular input, you typed: \"" + val + "\"");
    this.setState({ regularValue: val, regularError: "" });
  }
  setRegularInputError = (val) => {
    // set error for regular input
    this.setState({ regularError: val });
  }

  outputCurrentState = () => {
    let s = JSON.stringify( this.state );  // converts the "this.state" object into a string
    let re = new RegExp("([\\{,])", "g");  // look for any of the 3 following characters: { } ,
    s = s.replace( re, "$1\n");  // replace those characters with itself followed by a newline
    re = new RegExp("(\\})");
    s = s.replace( re, "\n$1");
    re = new RegExp("(?<!\\\\)\"", "g");  // look for quotes not preceeded by a backslash
    s = s.replace( re, "" );  // get rid of quotes not preceeded by a backslash
    const returnArray = s.split("\n");  // create an array, split by newline
    return returnArray || [];  // return the resulting array, or an empty array if there was no resulting array
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={ MaterialMonixUITheme }>
        <div className="CommonList">
          <div className="Title">
            <span>
              Examples of common input fields
            </span>
          </div>

          {/* BIRTHDAY */}
          <div className="InputFieldTitle">
            Birthday
          </div>
          <div className="InputField"
            style={{ width: 300 }}
          >
            <BirthdayInput
              fieldRef={ (el) => this.birthdayInput = el }
              value={ this.state.birthday }
              error={ this.state.birthdayError }
              setValue={ (val) => this.setState({ birthday: val }) }
              setError={ () => null }
            />
          </div>

          {/* CITY STATE ZIP */}
          <div className="InputFieldTitle">
            City state zip
          </div>
          <div className="InputField">
            <CityStateZip
              fieldRef={ (el) => this.cityStateZipInput = el }

              cityVal={ this.state.city }
              cityError=""
              setCity={ (val) => this.setState({ city: val }) }
              setCityError={ () => null }

              stateVal={ this.state.state }
              stateError=""
              setState={ (val) => this.setState({ state: val }) }
              setStateError={ () => null }

              zipVal={ this.state.zip }
              zipError=""
              setZip={ (val) => this.setState({ zip: val }) }
              setZipError={ () => null }
            />
          </div>

          {/* CREDIT CARD */}
          <div className="InputFieldTitle">
            Credit card
          </div>
          <div className="InputField"
            // style={{ width: 300 }}
          >
            <CreditCard
              // fieldRef={ (el) => this.creditCardInput = el }
              CCval={ this.state.cc }
              setCC={ (val) => this.setState({ cc: val }) }
              setCCerror={ () => null }

              expVal={ this.state.exp }
              setExp={ (val) => this.setState({ exp: val }) }
              setExpError={ () => null }

              cvvVal={ this.state.cvv }
              setCVV={ (val) => this.setState({ cvv: val }) }
              setCVVerror={ () => null }
            />
          </div>

          {/* NameInput */}
          <div className="InputFieldTitle">
            Name
          </div>
          <div className="InputField"
            style={{ width: 300 }}
          >
            <NameInput
              fieldRef={ (el) => this.nameInput = el }
              nameValue={ this.state.name }
              nameError={ this.state.nameError }
              setNameValue={ (val) => this.setState({ name: val }) }
              setNameErrorValue={ () => null }
            />
          </div>

          {/* PRICE */}
          <div className="InputFieldTitle">
            Name
          </div>
          <div className="InputField"
            style={{ width: 100 }}
          >
            <PriceInput
              fieldRef={ (el) => this.priceInput = el }
              value={ this.state.price }
              error={ this.state.priceError }
              setValue={ (val) => this.setState({ price: val }) }
              setError={ () => null }
            />
          </div>

          {/* REGULAR TEXT INPUT */}
          <div className="InputFieldTitle">
            Regular input box
          </div>
          <div className="InputField"
            style={{ width: 300 }}
          >
            <RegularInput
              fieldRef={ (el) => this.regularInput = el }
              label="Regular input box"
              hintText="This text appears before typing"
              value={ this.state.regularValue }
              setValue={ this.setRegularInputValue }
              error={ this.state.regularError }
              setError={ this.setRegularInputError }
              nameCase={ false }
              autoCorrect={ true }
            />
          </div>

          {/* SEARCH */}
          <div className="InputFieldTitle">
            Search
          </div>
          <div className="InputField"
            style={{ width: 300 }}
          >
            <SearchInput
              fieldRef={ (el) => this.searchInput = el }
              label="Search"
              hintText=""
              value={ this.state.search }
              setSearchValue={ (val) => this.setState({ search: val }) }
              error={ this.state.searchError }
              setSearchError={ () => null }
              nameCase={ false }
              autoCorrect={ false }
            />
          </div>

          <div className="ShowStateTitle">
            Current state of this page:
          </div>

          <div className="ShowState">
            { this.outputCurrentState().map( ( a, i ) => {
              return (
                <div key={ "line-" + i } className="ShowStateLine">
                  { a }
                </div>
              )
            } ) }
          </div>

        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = (state) => {
  // mapStateToProps always returns an object
  // only return global variables that we care about for this page
  return {
    screen: state.screen,
  };
};

export default connect( mapStateToProps, actions )(
  CommonList
);

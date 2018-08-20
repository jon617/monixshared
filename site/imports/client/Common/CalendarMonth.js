import React, { Component } from 'react';
import moment from 'moment';
import * as Animated from 'animated/lib/targets/react-dom';
import Easing from 'animated/lib/Easing';
import Icon from 'react-icons-kit';
import { ic_chevron_left, ic_chevron_right } from 'react-icons-kit/md';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './CalendarMonth.scss';

class CalendarMonth extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      viewMonthAndYear: moment(
        props.scheduleDaySelected, "YYYY-MM-DD"
      ).format("YYYY-MM"), // the month/year currently in view
    };
    if ( ! props.appControl ) {
      this.animationVal = new Animated.Value( 0 );
    } else {
      this.animationVal = new Animated.Value( 1 );
    }
    this.animationDuration = 500;
  }
  animationShrink = () => {
    this.animationVal.setValue( 1 );
    Animated.timing(
      this.animationVal,
      {
        toValue: 0,
        duration: this.animationDuration,
        easing: Easing.out( Easing.poly(4) ),
      }
    ).start();
  }
  animationExpand = () => {
    this.animationVal.setValue( 0 );
    Animated.timing(
      this.animationVal,
      {
        toValue: 1,
        duration: this.animationDuration,
        easing: Easing.out( Easing.poly(4) ),
      }
    ).start();
  }
  componentWillReceiveProps( nextProps ) {
    if ( nextProps.appControl != this.props.appControl ) {
      // appControl value changed, change the opacity in a few moments
      if ( nextProps.appControl == false ) {
        this.setState({
          changeOpacityTo: false,
        });
        this.animationShrink();
      } else {
        setTimeout( () => {
          this.setState({
            changeOpacityTo: true,
          })
        }, 200 );
        this.animationExpand();
      }
    }
  }
  setScheduleDaySelected = ( d ) => {
    // use the action, change the schedule day to the specific day they clicked on the calendar
    this.props.setScheduleDaySelected( d );
  }
  setScheduleMonthForward = () => {
    // change the schedule day to the next month after the currently-selected day
    this.props.setScheduleDayMonthFwd();
  }
  setScheduleMonthBack = () => {
    // change the schedule day to the previous month before the currently selected day
    this.props.setScheduleDayMonthBack();
  }
  setViewMonthForward = () => {
    this.setState({
      viewMonthAndYear: moment(
        this.state.viewMonthAndYear,
        "YYYY-MM"
      ).add( 1, "month" ).format( "YYYY-MM" )
    });
  }
  setViewMonthBackward = () => {
    this.setState({
      viewMonthAndYear: moment(
        this.state.viewMonthAndYear,
        "YYYY-MM"
      ).add( -1, "month" ).format( "YYYY-MM" )
    });
  }
  render() {
    // console.log( this.props );
    // NOTE this.state.viewMonthAndYear format is "YYYY-MM"
    const monthName = moment(
      this.state.viewMonthAndYear,
      "YYYY-MM"
    ).format("MMMM");
    const year = parseInt( moment(
      this.state.viewMonthAndYear,
      "YYYY-MM"
    ).format("YYYY") );
    const month = parseInt( moment(
      this.state.viewMonthAndYear,
      "YYYY-MM"
    ).format("M") );

    const animationMaxHeight = this.animationVal.interpolate({
      inputRange: [ 0, 1 ],
      outputRange: [ 0, 250 ],
    });
    const animationOpacity = this.animationVal.interpolate({
      inputRange: [ 0, 1 ],
      outputRange: [ 0, 1 ],
    });
    return (
      <Animated.div className="CalendarMonth"
        // style={
        //   this.state.changeOpacityTo
        //   && { opacity: 1 }
        //   || { opacity: 0 }
        // }
        style={{
          maxHeight: animationMaxHeight,
          opacity: animationOpacity,
        }}
      >

        <div className="CalendarMonthTopTable">
          <div className="CalendarMonthTopBody">
            <div className="CalendarMonthTableRow">

            </div>
          </div>
        </div>

        <table className="ScheduleMonthTop"><tbody><tr>
          <td className="ScheduleMonthName">
            { monthName }&nbsp; { year }
          </td>
          <td className="ScheduleMonthArrow">
            <span className="ScheduleMonthArrowCircleContainer"
              onClick={ this.setViewMonthBackward }
            >
              <Icon icon={ ic_chevron_left } size={20} />
            </span>
          </td>
          <td className="ScheduleMonthArrow">
            <span className="ScheduleMonthArrowCircleContainer"
              onClick={ this.setViewMonthForward }
            >
              <Icon icon={ ic_chevron_right } size={20} />
            </span>
          </td>
        </tr></tbody></table>

        <div className="ScheduleCalendarMonthTable">
          <div className="ScheduleCalendarMonthTableBody">
            { [ 1, 2, 3, 4, 5, 6 ].map( (week, index) => {
              return (
                <ScheduleCalendarMonthWeek
                  key={ "" + year + "." + month + "." + week }
                  year={ year }
                  month={ month }
                  week={ week }
                  today={ this.props.today }
                  scheduleDaySelected = { this.props.scheduleDaySelected }
                  setScheduleDaySelected = { this.setScheduleDaySelected }
                />
              );
            } ) }
          </div>
        </div>

      </Animated.div>
    );
  }
}

class ScheduleCalendarMonthWeek extends Component {
  // this is each individual week, make sure to send in the year and week
  clickDay = ( d ) => {
    this.props.setScheduleDaySelected( d );
  }
  render() {
    // grab the days for this week
    const startOfWeek = moment({
      year: this.props.year,
      month: this.props.month - 1
    }).add(
      this.props.week - 1,
      "weeks"
    ).startOf("week");
    // now we have a moment date object of the start of this month likely near the end of the previous month
    const days = [];
    let i;
    for ( i = 0; i < 7; i++ ) {
      const thisDay = moment(
        startOfWeek
      ).add( i, "days" );
      const thisDayString = thisDay.format("YYYY-MM-DD");
      days.push({
        year: thisDay.year(),
        month: thisDay.month() + 1,
        day: thisDay.date(),
        thisDayString: thisDayString,
        isCurrentMonth: (thisDay.month() + 1) == this.props.month,
        isToday: thisDayString == this.props.today,
        isSelected: thisDayString == this.props.scheduleDaySelected,
      });
    }
    return (
      <div className="ScheduleCalendarMonthTableRow">
        { days.map( (d, i) => {
          // d is the days object element
          return (
            <div className="ScheduleCalendarMonthTableCell"
              key={ "" + d.year + "." + d.month + "." + d.day }
              style={
                d.isCurrentMonth
                ? (
                  d.isSelected
                  ? (
                    d.isToday
                    ? { backgroundColor: "#4285f4", color: "#ffffff", fontWeight: 500 }
                    : { backgroundColor: "#888888", color: "#ffffff", fontWeight: 500 }
                  )
                  : (
                    d.isToday
                    ? { color: "#4285f4", fontWeight: 700, fontSize: 16 }
                    : { }
                  )
                )
                : (
                  d.isToday
                  ? { color: "#4285f4", fontWeight: 700, fontSize: 16 }
                  : { color: "#888888" }
                )
              }
              onClick={ () => this.clickDay( d.thisDayString ) }
            >
              { d.day }
            </div>
          );
        } ) }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appControl: state.appControl,
    scheduleDaySelected: state.scheduleDaySelected,
    today: state.today,
  };
};

export default connect( mapStateToProps, actions )( CalendarMonth );

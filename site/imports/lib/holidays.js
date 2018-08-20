import Holidays from 'date-holidays';
import moment from 'moment';

var holidays = new Holidays();

export holidayList = ( country ) => {
  holidays.init( country );
  var hList = holidays.getHolidays
}

export default holidays;

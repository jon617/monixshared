// looks at partial string as entered
// returns whether it matches a

import { USstates } from '../';

const USstateEntry = ( val ) => {
  const ret = { value: val, abbr: "", name: "" }
  if ( typeof val !== "string" ) { return ret };

  let abbr;
  let re;
  for ( abbr in USstates ) {
    // match by the match field
    re = new RegExp("^" + USstates[ abbr ].match , "i" );
    if ( val.match( re ) ) {
      ret.abbr = abbr;
      ret.name = USstates[ abbr ].name;
      break ;
    }

    if ( USstates[ abbr ].matchAbbr === true ) {
      // match by state abbreviation
      re = new RegExp("^" + abbr , "i");
      if ( val.match( re ) ) {
        ret.abbr = abbr;
        ret.name = USstates[ abbr ].name;
        break ;
      }
    }
  }
  return ret;
}
export default USstateEntry;

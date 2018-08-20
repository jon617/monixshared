// takes in a password, returns a score and reason
//    -2 = empty
//    -1 = too short
//     0 = too guessable
//     1 = weak
//     2 = average
//     3 = good
//     4 = strong
//  null = invalid (not a string provided)
import zxcvbn from 'zxcvbn';

const passwordStrength = function(a) {
  if ( typeof a !== "string" ) {
    return { score: null, reason: null };
  }
  if ( a.length > 255 ) {
    return { score: null, reason: null };
  }
  const ret = {};
  ret.score = -1;
  ret.reason = "";
  ret.z = zxcvbn( a );
  if ( a.length == 0 ) {
    ret.reason = "empty"
    ret.score = -2;
    return ret;
  } else if ( a.length < 5 ) {
    ret.reason = "too short";
    ret.score = -1;
    return ret;
  }

  ret.score = ret.z.score;
  return ret;
}

export default passwordStrength;

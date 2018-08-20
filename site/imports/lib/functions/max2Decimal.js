export default ( val ) => {
  const s = val.toString();
  if (
    (new RegExp("\\.").test( s )) &&
    (parseInt(s) != val)
  ) {
    // contains a dot and anything other than .00
    return Number( s ).toFixed( 2 );
  } else {
    return parseInt( s );
  }
}

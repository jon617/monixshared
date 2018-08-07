import _colorManipulator from 'material-ui/utils/colorManipulator';
import _spacing from 'material-ui/styles/spacing';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const _spacing2 = _interopRequireDefault(_spacing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

export default getMuiTheme({
  spacing: _spacing2.default,
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  palette: {
    primary1Color: "#ffffff",
    primary2Color: "#ffffff",
    primary3Color: "#ffffff",
    accent1Color:  "#34a853",
    accent2Color:  "#34a853",
    accent3Color:  "#34a853",
    textColor:     "#ffffff",
    secondaryTextColor: (0, _colorManipulator.fade)("#ffffff", 0.7),
    alternateTextColor: "#303030",
    canvasColor: "#f0f0f0",  // this is the background color
    borderColor: (0, _colorManipulator.fade)("#ffffff", 0.9),
    disabledColor: (0, _colorManipulator.fade)("#4285f4", 0.5),
    pickerHeaderColor: (0, _colorManipulator.fade)("#ffffff", 0.12),
    clockCircleColor: (0, _colorManipulator.fade)("#ffffff", 0.12),
    errorColor: "#ea4335",
  },
  textField: {
    errorColor: "#ea4335",
    // focusColor: "#fbbc05",
    focusColor: "#ffffff",
    hintColor: "#666666",
  },
  flatButton: {
    textColor: "#34a853",
    fontSize: 20,
    border: "1px solid red",
    fontWeight: 300,
    primaryTextColor: "#4285f4",
    disabledColor: "#4285f4",
    // disabledColor: (0, _colorManipulator.fade)("#4285f4", 0.5),
  },
  raisedButton: {
    // color: "rgba( 66, 133, 244, 1.0 )",
    color: "#dddddd",
    textColor: "#000000",
    fontSize: 16,
    fontWeight: 400,
    primaryColor: "#4285f4",
    primaryTextColor: "#ffffff",
  },
});

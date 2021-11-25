import getRouteDataByCity from "./getRouteData.js";
import buttonKeyboard from "./buttonKeyboard.js";

export default function init() {
  getRouteDataByCity();
  buttonKeyboard();
}
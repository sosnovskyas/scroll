import * as React from "react";
import { render } from "react-dom";
import { GalleryContainer } from "./containers/gallery/gallery-container";
import { store } from "./modules/redux/redux-module";
import { Provider } from "react-redux";

export const root = document.querySelector("#scroll");

render(
  <Provider store={store}>
    <GalleryContainer />
  </Provider>,
  root
);

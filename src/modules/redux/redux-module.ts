import { createStore, applyMiddleware, Reducer } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { combineReducers } from "redux";
import { galleryReducer } from "../gallery/gallery-reducer";
import { IGalleryState } from "../gallery/gallery-types";

export interface IApplicationState {
  gallery: IGalleryState;
}

export const reducers = combineReducers({
  gallery: galleryReducer
});

export const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({
  // or window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  features: {
    pause: true, // start/pause recording of dispatched actions
    lock: true, // lock/unlock dispatching actions and side effects
    persist: true, // persist states on page reloading
    export: true, // export history of actions in a file
    import: "custom", // import history of actions from a file
    jump: true, // jump back and forth (time travelling)
    skip: true, // skip (cancel) actions
    reorder: true, // drag and drop actions in the history list
    dispatch: true, // dispatch custom actions or action creators
    test: true // generate tests for the selected actions
  }
  // other options like actionSanitizer, stateSanitizer
});
const configureStore = () => {
  return createStore(
    reducers,
    composeWithDevTools(
      applyMiddleware(sagaMiddleware)
      // other store enhancers if any
    )
  );
};

export const store = configureStore();

// sagaMiddleware.run(firebaseSaga);

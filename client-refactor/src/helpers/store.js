import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga";

const initialState = {};
const middleware = [sagaMiddleware];

const sagaMiddleware = createSagaMiddleware();
sagaMiddleware.run(rootSaga);

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;

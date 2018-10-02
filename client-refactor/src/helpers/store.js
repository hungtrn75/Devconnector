import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/index";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/rootSaga";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, thunk))
);
sagaMiddleware.run(rootSaga);

export default store;

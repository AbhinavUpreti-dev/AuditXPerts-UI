import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootReducers } from "./reducers.ts";
import sagas from "./sagas.ts";

export const initializeStore = () => {
  /* eslint-disable no-underscore-dangle */
  const windowIfDefined = typeof window === "undefined" ? null : (window as any);

  // pick debug or dummy enhancer
  const composeEnhancers =
    windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const sagaMiddleware = createSagaMiddleware();

  const middleware = composeEnhancers(
    applyMiddleware(sagaMiddleware)
  );

  // Create store first
  const store = createStore(rootReducers, middleware);

  // Then run sagas after store creation
  sagas.forEach((saga: any) => sagaMiddleware.run(saga));

  return store;
};
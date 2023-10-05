// for running redux we should have
// action
const incrementAction = () => {
  return { type: "INCREMENT" };
};

const decrementAction = () => {
  return { type: "DECREMENT" };
};

// reducer
const initialState = { value: 0 };
const counterReducer = (state = initialState, action) => {
  if (action.type === "INCREMENT") {
    return (state = { ...state, value: state.value + 1 });
  } else if (action.type === "DECREMENT") {
    return (state = { ...state, value: state.value - 1 });
  } else {
    return state;
  }
};

// store
const createStore = () => {
  // store should have four parts
  // state
  let state;
  let listeners = [];

  // getState
  const getState = () => state;

  // listener
  const subscribe = (listener) => {
    listeners.push(listener);

    return listeners.filter((l) => l !== listener);
  };

  // dispatch
  const dispatch = (action) => {
    state = counterReducer(state, action);
    listeners.forEach((listener) => listener());
  };

  return { getState, subscribe, dispatch };
};

const store = createStore();
store.subscribe(() => {
  console.log("The state is:" + store.getState().value);
});

const unsubscribe = store.subscribe(() => {
  console.log("The state is:" + store.getState().value);
});

store.dispatch(incrementAction());
store.dispatch(incrementAction());
store.dispatch(incrementAction());
store.dispatch(incrementAction());
store.dispatch(decrementAction());

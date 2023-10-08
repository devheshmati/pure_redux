// for running redux we should have
// action
// counter actions
const incrementAction = () => {
  return { type: "INCREMENT" };
};

const decrementAction = () => {
  return { type: "DECREMENT" };
};

// goal actions
const addGoalAction = (goalId, goalStr) => {
  return {
    type: "ADD_GOAL",
    payload: { id: goalId, goal: goalStr, complete: false },
  };
};

const removeGoalAction = (goalId) => {
  return { type: "REMOVE_GOAL", payload: { id: goalId } };
};

const toggleGoalAction = (goalId) => {
  return { type: "TOGGLE_GOAL", payload: { id: goalId } };
};

// reducers
// counter reducer
const counterInitialState = 0;
const counterReducer = (state = counterInitialState, action) => {
  if (action.type === "INCREMENT") {
    return (state += 1);
  } else if (action.type === "DECREMENT") {
    return (state -= 1);
  } else {
    return state;
  }
};

// goal reducer
const goalInitialState = [];
const goalReducer = (state = goalInitialState, action) => {
  switch (action.type) {
    case "ADD_GOAL":
      return state.concat([action.payload]);
    case "REMOVE_GOAL":
      return state.filter((goal) => goal.id !== action.payload.id);
    case "TOGGLE_GOAL":
      return state.map((goal) =>
        goal.id === action.payload.id
          ? { ...goal, complete: !goal.complete }
          : goal,
      );
    default:
      return state;
  }
};

// reducers combiner
const app = (state = {}, action) => {
  return {
    counter: counterReducer(state.counter, action),
    goals: goalReducer(state.goals, action),
  };
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
    state = app(state, action);
    listeners.forEach((listener) => listener());
  };

  return { getState, subscribe, dispatch };
};

const store = createStore(app);

store.subscribe(() => console.log(store.getState()));

// dispatch counter
store.dispatch(incrementAction());
store.dispatch(incrementAction());
store.dispatch(incrementAction());
store.dispatch(decrementAction());

// dispatch goal
store.dispatch(addGoalAction(0, "goal 1"));
store.dispatch(addGoalAction(1, "goal 2"));
store.dispatch(addGoalAction(2, "goal 3"));
store.dispatch(toggleGoalAction(2));
store.dispatch(addGoalAction(3, "goal 3"));
store.dispatch(removeGoalAction(1));

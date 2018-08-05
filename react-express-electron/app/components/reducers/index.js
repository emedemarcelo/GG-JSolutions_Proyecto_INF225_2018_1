export default (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      action.data.timestamp = action.timestamp;
      return state.concat(action.data)
    default:
      return state
  }
}

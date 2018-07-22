import { combineReducers } from 'redux';
import { USER_ACTIONS } from '../actions/userActions';

const userName = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.username || state;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
};

const account_type = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:            
      return action.user.account_type || state;
    case USER_ACTIONS.UNSET_ACCOUNT_TYPE:
      return null;
    default:
      return state;
  }
}

const account_id = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:            
      return action.user.id || state;
    case USER_ACTIONS.UNSET_ACCOUNT_TYPE:
      return null;
    default:
      return state;
  }
}

const isLoading = (state = false, action) => {
  switch (action.type) {
    case USER_ACTIONS.REQUEST_START:
      return true;
    case USER_ACTIONS.REQUEST_DONE:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  userName,
  isLoading,
  account_type,
  account_id,
});

type actionType = 'SHOW_OVERLAY' | 'SHOW_EXPENSE_FORM_MODAL';

export interface Action {
  type: actionType;
  payload: any;
}

export interface ActionCreators {
  showOverlay: (payload: boolean) => Action;
  showExpenseFormModal: (payload: boolean) => Action;
}

export interface State {
  showOverlay: boolean;
  showExpenseFormModal: boolean;
}

export const SHOW_OVERLAY = 'SHOW_OVERLAY';
export const SHOW_EXPENSE_FORM_MODAL = 'SHOW_EXPENSE_FORM_MODAL';

export const initialState = {
  showOverlay: false,
  showExpenseFormModal: false,
};

export const actionCreators: ActionCreators = {
  showOverlay: (payload) => ({ type: SHOW_OVERLAY, payload }),
  showExpenseFormModal: (payload) => ({
    type: SHOW_EXPENSE_FORM_MODAL,
    payload,
  }),
};

export function appReducer(state = initialState, action: Action) {
  switch (action.type) {
    case SHOW_OVERLAY:
      return { ...state, showOverlay: action.payload };
    case SHOW_EXPENSE_FORM_MODAL:
      return { ...state, showExpenseFormModal: action.payload };
    default:
      return state;
  }
}

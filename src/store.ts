import { Expense } from '@/graphql/generated/graphql';

type actionType = 'SHOW_OVERLAY' | 'SHOW_EXPENSE_FORM_MODAL';

type ExpenseToEditPayload = Expense | {} | null;

export interface Action {
  type: actionType;
  payload: any;
}

export interface ActionCreators {
  showOverlay: (payload: boolean) => Action;
  expenseToEdit: (payload?: ExpenseToEditPayload) => Action;
}

export interface State {
  showOverlay: boolean;
  expenseToEdit: ExpenseToEditPayload;
}

export const SHOW_OVERLAY = 'SHOW_OVERLAY';
export const SHOW_EXPENSE_FORM_MODAL = 'SHOW_EXPENSE_FORM_MODAL';

export const initialState = {
  showOverlay: false,
  expenseToEdit: false,
};

export const actionCreators: ActionCreators = {
  showOverlay: (payload) => ({ type: SHOW_OVERLAY, payload }),
  expenseToEdit: (payload) => ({
    type: SHOW_EXPENSE_FORM_MODAL,
    payload,
  }),
};

export function appReducer(state = initialState, action: Action) {
  switch (action.type) {
    case SHOW_OVERLAY:
      return { ...state, showOverlay: action.payload };
    case SHOW_EXPENSE_FORM_MODAL:
      return { ...state, expenseToEdit: action.payload };
    default:
      return state;
  }
}

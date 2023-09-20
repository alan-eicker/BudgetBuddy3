import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Expense = {
  __typename?: 'Expense';
  _id?: Maybe<Scalars['ID']['output']>;
  balance: Scalars['Float']['output'];
  dueDate: Scalars['String']['output'];
  isPaid: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
};

export type ExpenseGroup = {
  __typename?: 'ExpenseGroup';
  _id?: Maybe<Scalars['ID']['output']>;
  endDate: Scalars['String']['output'];
  expenses: Array<Expense>;
  startDate: Scalars['String']['output'];
  totalBudget: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addExpenseGroup: ExpenseGroup;
  updateExpense: Expense;
};


export type MutationAddExpenseGroupArgs = {
  input: NewExpenseGroupInput;
};


export type MutationUpdateExpenseArgs = {
  input: UpdateExpenseInput;
};

export type NewExpenseGroupInput = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  expenses?: InputMaybe<Array<InputMaybe<NewExpenseInput>>>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  totalBudget?: InputMaybe<Scalars['Float']['input']>;
};

export type NewExpenseInput = {
  balance?: InputMaybe<Scalars['Float']['input']>;
  dueDate?: InputMaybe<Scalars['String']['input']>;
  isPaid?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  authenticateUser: StatusResponse;
  deleteExpenseGroup: StatusResponse;
  getAllExpenseGroups: Array<Maybe<ExpenseGroup>>;
  getExpense: Expense;
  getExpenseGroupById: ExpenseGroup;
  logoutUser: Scalars['Boolean']['output'];
};


export type QueryAuthenticateUserArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type QueryDeleteExpenseGroupArgs = {
  _id: Scalars['String']['input'];
};


export type QueryGetExpenseArgs = {
  _id: Scalars['String']['input'];
};


export type QueryGetExpenseGroupByIdArgs = {
  _id: Scalars['String']['input'];
};

export type StatusResponse = {
  __typename?: 'StatusResponse';
  code: Scalars['Int']['output'];
  message?: Maybe<Scalars['String']['output']>;
};

export type UpdateExpenseInput = {
  _id: Scalars['ID']['input'];
  balance: Scalars['Float']['input'];
  dueDate: Scalars['String']['input'];
  expenseGroupId: Scalars['ID']['input'];
  isOverdue?: InputMaybe<Scalars['Boolean']['input']>;
  isPaid: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
};

export type AddExpenseGroupMutationVariables = Exact<{
  input: NewExpenseGroupInput;
}>;


export type AddExpenseGroupMutation = { __typename?: 'Mutation', expenseGroup: { __typename?: 'ExpenseGroup', startDate: string, endDate: string, totalBudget: number, expenses: Array<{ __typename?: 'Expense', name: string, balance: number, dueDate: string, isPaid: boolean, note?: string | null }> } };

export type UpdateExpenseMutationVariables = Exact<{
  input: UpdateExpenseInput;
}>;


export type UpdateExpenseMutation = { __typename?: 'Mutation', expense: { __typename?: 'Expense', name: string, balance: number, dueDate: string, isPaid: boolean, note?: string | null } };

export type GetAllExpenseGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllExpenseGroupsQuery = { __typename?: 'Query', expenseGroups: Array<{ __typename?: 'ExpenseGroup', _id?: string | null, startDate: string, endDate: string, totalBudget: number, expenses: Array<{ __typename?: 'Expense', _id?: string | null, name: string, balance: number, dueDate: string, isPaid: boolean, note?: string | null }> } | null> };

export type GetExpenseGroupByIdQueryVariables = Exact<{
  _id: Scalars['String']['input'];
}>;


export type GetExpenseGroupByIdQuery = { __typename?: 'Query', expenseGroup: { __typename?: 'ExpenseGroup', _id?: string | null, startDate: string, endDate: string, totalBudget: number, expenses: Array<{ __typename?: 'Expense', _id?: string | null, name: string, balance: number, dueDate: string, isPaid: boolean, note?: string | null }> } };

export type DeleteExpenseGroupQueryVariables = Exact<{
  _id: Scalars['String']['input'];
}>;


export type DeleteExpenseGroupQuery = { __typename?: 'Query', status: { __typename?: 'StatusResponse', code: number, message?: string | null } };

export type AuthenticateUserQueryVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type AuthenticateUserQuery = { __typename?: 'Query', status: { __typename?: 'StatusResponse', code: number, message?: string | null } };

export type LogoutUserQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserQuery = { __typename?: 'Query', isLoggedOut: boolean };


export const AddExpenseGroupDocument = gql`
    mutation addExpenseGroup($input: NewExpenseGroupInput!) {
  expenseGroup: addExpenseGroup(input: $input) {
    startDate
    endDate
    totalBudget
    expenses {
      name
      balance
      dueDate
      isPaid
      note
    }
  }
}
    `;
export const UpdateExpenseDocument = gql`
    mutation updateExpense($input: UpdateExpenseInput!) {
  expense: updateExpense(input: $input) {
    name
    balance
    dueDate
    isPaid
    note
  }
}
    `;
export const GetAllExpenseGroupsDocument = gql`
    query getAllExpenseGroups {
  expenseGroups: getAllExpenseGroups {
    _id
    startDate
    endDate
    totalBudget
    expenses {
      _id
      name
      balance
      dueDate
      isPaid
      note
    }
  }
}
    `;
export const GetExpenseGroupByIdDocument = gql`
    query getExpenseGroupById($_id: String!) {
  expenseGroup: getExpenseGroupById(_id: $_id) {
    _id
    startDate
    endDate
    totalBudget
    expenses {
      _id
      name
      balance
      dueDate
      isPaid
      note
    }
  }
}
    `;
export const DeleteExpenseGroupDocument = gql`
    query deleteExpenseGroup($_id: String!) {
  status: deleteExpenseGroup(_id: $_id) {
    code
    message
  }
}
    `;
export const AuthenticateUserDocument = gql`
    query authenticateUser($username: String!, $password: String!) {
  status: authenticateUser(username: $username, password: $password) {
    code
    message
  }
}
    `;
export const LogoutUserDocument = gql`
    query logoutUser {
  isLoggedOut: logoutUser
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    addExpenseGroup(variables: AddExpenseGroupMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AddExpenseGroupMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddExpenseGroupMutation>(AddExpenseGroupDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addExpenseGroup', 'mutation');
    },
    updateExpense(variables: UpdateExpenseMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateExpenseMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateExpenseMutation>(UpdateExpenseDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateExpense', 'mutation');
    },
    getAllExpenseGroups(variables?: GetAllExpenseGroupsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAllExpenseGroupsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllExpenseGroupsQuery>(GetAllExpenseGroupsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllExpenseGroups', 'query');
    },
    getExpenseGroupById(variables: GetExpenseGroupByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetExpenseGroupByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetExpenseGroupByIdQuery>(GetExpenseGroupByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getExpenseGroupById', 'query');
    },
    deleteExpenseGroup(variables: DeleteExpenseGroupQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteExpenseGroupQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteExpenseGroupQuery>(DeleteExpenseGroupDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteExpenseGroup', 'query');
    },
    authenticateUser(variables: AuthenticateUserQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AuthenticateUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AuthenticateUserQuery>(AuthenticateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'authenticateUser', 'query');
    },
    logoutUser(variables?: LogoutUserQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LogoutUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LogoutUserQuery>(LogoutUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'logoutUser', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
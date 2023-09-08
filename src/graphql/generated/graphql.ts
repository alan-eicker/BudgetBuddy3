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
  _id: Scalars['ID']['output'];
  balance: Scalars['Float']['output'];
  dueDate: Scalars['String']['output'];
  isPaid: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
};

export type ExpenseGroup = {
  __typename?: 'ExpenseGroup';
  _id: Scalars['ID']['output'];
  endDate: Scalars['String']['output'];
  expenses?: Maybe<Array<Expense>>;
  startDate: Scalars['String']['output'];
  totalBudget: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addExpense: Expense;
};


export type MutationAddExpenseArgs = {
  balance: Scalars['Float']['input'];
  dueDate: Scalars['String']['input'];
  isPaid: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  authenticateUser: StatusResponse;
  deleteExpenseGroup: StatusResponse;
  getAllExpenseGroups: Array<Maybe<ExpenseGroup>>;
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


export type QueryGetExpenseGroupByIdArgs = {
  _id: Scalars['String']['input'];
};

export type StatusResponse = {
  __typename?: 'StatusResponse';
  code: Scalars['Int']['output'];
  message?: Maybe<Scalars['String']['output']>;
};

export type AddExpenseMutationVariables = Exact<{
  name: Scalars['String']['input'];
  balance: Scalars['Float']['input'];
  dueDate: Scalars['String']['input'];
  isPaid: Scalars['Boolean']['input'];
}>;


export type AddExpenseMutation = { __typename?: 'Mutation', addExpense: { __typename?: 'Expense', _id: string, name: string, balance: number, dueDate: string, isPaid: boolean } };

export type GetAllExpenseGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllExpenseGroupsQuery = { __typename?: 'Query', expenseGroups: Array<{ __typename?: 'ExpenseGroup', _id: string, startDate: string, endDate: string, totalBudget: number, expenses?: Array<{ __typename?: 'Expense', _id: string, name: string, balance: number, dueDate: string, isPaid: boolean, note?: string | null }> | null } | null> };

export type GetExpenseGroupByIdQueryVariables = Exact<{
  _id: Scalars['String']['input'];
}>;


export type GetExpenseGroupByIdQuery = { __typename?: 'Query', expenseGroup: { __typename?: 'ExpenseGroup', _id: string, startDate: string, endDate: string, totalBudget: number, expenses?: Array<{ __typename?: 'Expense', _id: string, name: string, balance: number, dueDate: string, isPaid: boolean, note?: string | null }> | null } };

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


export const AddExpenseDocument = gql`
    mutation addExpense($name: String!, $balance: Float!, $dueDate: String!, $isPaid: Boolean!) {
  addExpense(name: $name, balance: $balance, dueDate: $dueDate, isPaid: $isPaid) {
    _id
    name
    balance
    dueDate
    isPaid
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
    addExpense(variables: AddExpenseMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AddExpenseMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddExpenseMutation>(AddExpenseDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addExpense', 'mutation');
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
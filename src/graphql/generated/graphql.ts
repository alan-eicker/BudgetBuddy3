// @ts-nocheck
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
  Void: { input: void; output: void; }
};

export type Expense = {
  __typename?: 'Expense';
  _id?: Maybe<Scalars['ID']['output']>;
  balance: Scalars['Float']['output'];
  dueDate?: Maybe<Scalars['String']['output']>;
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
  addExpense?: Maybe<Scalars['Void']['output']>;
  addExpenseGroup?: Maybe<Scalars['Void']['output']>;
  deleteExpense?: Maybe<Scalars['Void']['output']>;
  deleteExpenseGroup?: Maybe<Scalars['Void']['output']>;
  updateExpense?: Maybe<Scalars['Void']['output']>;
  updateExpenseGroup?: Maybe<Scalars['Void']['output']>;
  updateExpensePaidStatus?: Maybe<Scalars['Void']['output']>;
};


export type MutationAddExpenseArgs = {
  balance: Scalars['Float']['input'];
  dueDate?: InputMaybe<Scalars['String']['input']>;
  expenseGroupId: Scalars['ID']['input'];
  isPaid: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAddExpenseGroupArgs = {
  endDate: Scalars['String']['input'];
  expenses: Array<NewExpenseInput>;
  startDate: Scalars['String']['input'];
  totalBudget: Scalars['Float']['input'];
};


export type MutationDeleteExpenseArgs = {
  expenseGroupId: Scalars['String']['input'];
  expenseId: Scalars['String']['input'];
};


export type MutationDeleteExpenseGroupArgs = {
  expenseGroupId: Scalars['String']['input'];
};


export type MutationUpdateExpenseArgs = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  balance: Scalars['Float']['input'];
  dueDate?: InputMaybe<Scalars['String']['input']>;
  expenseGroupId: Scalars['ID']['input'];
  isOverdue?: InputMaybe<Scalars['Boolean']['input']>;
  isPaid: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateExpenseGroupArgs = {
  endDate: Scalars['String']['input'];
  expenseGroupId?: InputMaybe<Scalars['ID']['input']>;
  startDate: Scalars['String']['input'];
  totalBudget: Scalars['Float']['input'];
};


export type MutationUpdateExpensePaidStatusArgs = {
  expenseGroupId: Scalars['String']['input'];
  expenseId: Scalars['String']['input'];
  isPaid: Scalars['Boolean']['input'];
};

export type NewExpenseInput = {
  balance?: InputMaybe<Scalars['Float']['input']>;
  dueDate?: InputMaybe<Scalars['String']['input']>;
  expenseGroupId?: InputMaybe<Scalars['ID']['input']>;
  isPaid?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  authenticateUser: StatusResponse;
  getAllExpenseGroups: Array<Maybe<ExpenseGroup>>;
  getExpense: Expense;
  getExpenseGroupById: ExpenseGroup;
  logoutUser: Scalars['Boolean']['output'];
};


export type QueryAuthenticateUserArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
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

export type AddExpenseGroupMutationVariables = Exact<{
  startDate: Scalars['String']['input'];
  endDate: Scalars['String']['input'];
  totalBudget: Scalars['Float']['input'];
  expenses: Array<NewExpenseInput> | NewExpenseInput;
}>;


export type AddExpenseGroupMutation = { __typename?: 'Mutation', expenseGroup?: void | null };

export type DeleteExpenseGroupMutationVariables = Exact<{
  expenseGroupId: Scalars['String']['input'];
}>;


export type DeleteExpenseGroupMutation = { __typename?: 'Mutation', deleteExpenseGroup?: void | null };

export type DeleteExpenseMutationVariables = Exact<{
  expenseGroupId: Scalars['String']['input'];
  expenseId: Scalars['String']['input'];
}>;


export type DeleteExpenseMutation = { __typename?: 'Mutation', deleteExpense?: void | null };

export type UpdateExpenseMutationVariables = Exact<{
  _id?: InputMaybe<Scalars['ID']['input']>;
  expenseGroupId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  balance: Scalars['Float']['input'];
  dueDate?: InputMaybe<Scalars['String']['input']>;
  isPaid: Scalars['Boolean']['input'];
  isOverdue?: InputMaybe<Scalars['Boolean']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateExpenseMutation = { __typename?: 'Mutation', updateExpense?: void | null };

export type UpdateExpensePaidStatusMutationVariables = Exact<{
  isPaid: Scalars['Boolean']['input'];
  expenseGroupId: Scalars['String']['input'];
  expenseId: Scalars['String']['input'];
}>;


export type UpdateExpensePaidStatusMutation = { __typename?: 'Mutation', updateExpensePaidStatus?: void | null };

export type AddExpenseMutationVariables = Exact<{
  expenseGroupId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  balance: Scalars['Float']['input'];
  dueDate?: InputMaybe<Scalars['String']['input']>;
  isPaid: Scalars['Boolean']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddExpenseMutation = { __typename?: 'Mutation', expense?: void | null };

export type UpdateExpenseGroupMutationVariables = Exact<{
  expenseGroupId: Scalars['ID']['input'];
  startDate: Scalars['String']['input'];
  endDate: Scalars['String']['input'];
  totalBudget: Scalars['Float']['input'];
}>;


export type UpdateExpenseGroupMutation = { __typename?: 'Mutation', updateExpenseGroup?: void | null };

export type GetAllExpenseGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllExpenseGroupsQuery = { __typename?: 'Query', expenseGroups: Array<{ __typename?: 'ExpenseGroup', _id?: string | null, startDate: string, endDate: string, totalBudget: number, expenses: Array<{ __typename?: 'Expense', _id?: string | null, name: string, balance: number, dueDate?: string | null, isPaid: boolean, note?: string | null }> } | null> };

export type GetExpenseGroupByIdQueryVariables = Exact<{
  _id: Scalars['String']['input'];
}>;


export type GetExpenseGroupByIdQuery = { __typename?: 'Query', expenseGroup: { __typename?: 'ExpenseGroup', _id?: string | null, startDate: string, endDate: string, totalBudget: number, expenses: Array<{ __typename?: 'Expense', _id?: string | null, name: string, balance: number, dueDate?: string | null, isPaid: boolean, note?: string | null }> } };

export type AuthenticateUserQueryVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type AuthenticateUserQuery = { __typename?: 'Query', status: { __typename?: 'StatusResponse', code: number, message?: string | null } };

export type LogoutUserQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserQuery = { __typename?: 'Query', isLoggedOut: boolean };


export const AddExpenseGroupDocument = gql`
    mutation addExpenseGroup($startDate: String!, $endDate: String!, $totalBudget: Float!, $expenses: [NewExpenseInput!]!) {
  expenseGroup: addExpenseGroup(
    startDate: $startDate
    endDate: $endDate
    totalBudget: $totalBudget
    expenses: $expenses
  )
}
    `;
export const DeleteExpenseGroupDocument = gql`
    mutation deleteExpenseGroup($expenseGroupId: String!) {
  deleteExpenseGroup(expenseGroupId: $expenseGroupId)
}
    `;
export const DeleteExpenseDocument = gql`
    mutation deleteExpense($expenseGroupId: String!, $expenseId: String!) {
  deleteExpense(expenseGroupId: $expenseGroupId, expenseId: $expenseId)
}
    `;
export const UpdateExpenseDocument = gql`
    mutation updateExpense($_id: ID, $expenseGroupId: ID!, $name: String!, $balance: Float!, $dueDate: String, $isPaid: Boolean!, $isOverdue: Boolean, $note: String) {
  updateExpense(
    _id: $_id
    expenseGroupId: $expenseGroupId
    name: $name
    balance: $balance
    dueDate: $dueDate
    isPaid: $isPaid
    isOverdue: $isOverdue
    note: $note
  )
}
    `;
export const UpdateExpensePaidStatusDocument = gql`
    mutation updateExpensePaidStatus($isPaid: Boolean!, $expenseGroupId: String!, $expenseId: String!) {
  updateExpensePaidStatus(
    isPaid: $isPaid
    expenseGroupId: $expenseGroupId
    expenseId: $expenseId
  )
}
    `;
export const AddExpenseDocument = gql`
    mutation addExpense($expenseGroupId: ID!, $name: String!, $balance: Float!, $dueDate: String, $isPaid: Boolean!, $note: String) {
  expense: addExpense(
    expenseGroupId: $expenseGroupId
    name: $name
    balance: $balance
    dueDate: $dueDate
    isPaid: $isPaid
    note: $note
  )
}
    `;
export const UpdateExpenseGroupDocument = gql`
    mutation updateExpenseGroup($expenseGroupId: ID!, $startDate: String!, $endDate: String!, $totalBudget: Float!) {
  updateExpenseGroup(
    expenseGroupId: $expenseGroupId
    startDate: $startDate
    endDate: $endDate
    totalBudget: $totalBudget
  )
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
    deleteExpenseGroup(variables: DeleteExpenseGroupMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteExpenseGroupMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteExpenseGroupMutation>(DeleteExpenseGroupDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteExpenseGroup', 'mutation');
    },
    deleteExpense(variables: DeleteExpenseMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteExpenseMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteExpenseMutation>(DeleteExpenseDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteExpense', 'mutation');
    },
    updateExpense(variables: UpdateExpenseMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateExpenseMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateExpenseMutation>(UpdateExpenseDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateExpense', 'mutation');
    },
    updateExpensePaidStatus(variables: UpdateExpensePaidStatusMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateExpensePaidStatusMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateExpensePaidStatusMutation>(UpdateExpensePaidStatusDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateExpensePaidStatus', 'mutation');
    },
    addExpense(variables: AddExpenseMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AddExpenseMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddExpenseMutation>(AddExpenseDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addExpense', 'mutation');
    },
    updateExpenseGroup(variables: UpdateExpenseGroupMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateExpenseGroupMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateExpenseGroupMutation>(UpdateExpenseGroupDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateExpenseGroup', 'mutation');
    },
    getAllExpenseGroups(variables?: GetAllExpenseGroupsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAllExpenseGroupsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllExpenseGroupsQuery>(GetAllExpenseGroupsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllExpenseGroups', 'query');
    },
    getExpenseGroupById(variables: GetExpenseGroupByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetExpenseGroupByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetExpenseGroupByIdQuery>(GetExpenseGroupByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getExpenseGroupById', 'query');
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
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

export type ExpenseGroupInfo = {
  __typename?: 'ExpenseGroupInfo';
  endDate: Scalars['String']['output'];
  expenseGroupId: Scalars['ID']['output'];
  startDate: Scalars['String']['output'];
  totalBudget: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addExpense: Expense;
  addExpenseGroup: ExpenseGroup;
  deleteExpenseGroup: StatusResponse;
  updateExpense: Expense;
  updateExpenseGroup?: Maybe<ExpenseGroupInfo>;
  updateExpensePaidStatus: PaidStatus;
};


export type MutationAddExpenseArgs = {
  balance: Scalars['Float']['input'];
  dueDate: Scalars['String']['input'];
  expenseGroupId: Scalars['ID']['input'];
  isPaid: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAddExpenseGroupArgs = {
  input: NewExpenseGroupInput;
};


export type MutationDeleteExpenseGroupArgs = {
  expenseGroupId: Scalars['String']['input'];
};


export type MutationUpdateExpenseArgs = {
  input: UpdateExpenseInput;
};


export type MutationUpdateExpenseGroupArgs = {
  endDate: Scalars['String']['input'];
  expenseGroupId: Scalars['ID']['input'];
  startDate: Scalars['String']['input'];
  totalBudget: Scalars['Float']['input'];
};


export type MutationUpdateExpensePaidStatusArgs = {
  expenseGroupId: Scalars['String']['input'];
  expenseId: Scalars['String']['input'];
  isPaid: Scalars['Boolean']['input'];
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
  expenseGroupId?: InputMaybe<Scalars['ID']['input']>;
  isPaid?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
};

export type PaidStatus = {
  __typename?: 'PaidStatus';
  isPaid: Scalars['Boolean']['output'];
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

export type UpdateExpenseInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  balance: Scalars['Float']['input'];
  dueDate?: InputMaybe<Scalars['String']['input']>;
  expenseGroupId: Scalars['ID']['input'];
  isOverdue?: InputMaybe<Scalars['Boolean']['input']>;
  isPaid: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
};

export type AddExpenseGroupMutationVariables = Exact<{
  input: NewExpenseGroupInput;
}>;


export type AddExpenseGroupMutation = { __typename?: 'Mutation', expenseGroup: { __typename?: 'ExpenseGroup', startDate: string, endDate: string, totalBudget: number, expenses: Array<{ __typename?: 'Expense', name: string, balance: number, dueDate?: string | null, isPaid: boolean, note?: string | null }> } };

export type DeleteExpenseGroupMutationVariables = Exact<{
  expenseGroupId: Scalars['String']['input'];
}>;


export type DeleteExpenseGroupMutation = { __typename?: 'Mutation', status: { __typename?: 'StatusResponse', code: number, message?: string | null } };

export type UpdateExpenseMutationVariables = Exact<{
  input: UpdateExpenseInput;
}>;


export type UpdateExpenseMutation = { __typename?: 'Mutation', expense: { __typename?: 'Expense', name: string, balance: number, dueDate?: string | null, isPaid: boolean, note?: string | null } };

export type UpdateExpensePaidStatusMutationVariables = Exact<{
  isPaid: Scalars['Boolean']['input'];
  expenseGroupId: Scalars['String']['input'];
  expenseId: Scalars['String']['input'];
}>;


export type UpdateExpensePaidStatusMutation = { __typename?: 'Mutation', expense: { __typename?: 'PaidStatus', isPaid: boolean } };

export type AddExpenseMutationVariables = Exact<{
  expenseGroupId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  balance: Scalars['Float']['input'];
  dueDate: Scalars['String']['input'];
  isPaid: Scalars['Boolean']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddExpenseMutation = { __typename?: 'Mutation', expense: { __typename?: 'Expense', _id?: string | null, name: string, balance: number, dueDate?: string | null, isPaid: boolean, note?: string | null } };

export type UpdateExpenseGroupMutationVariables = Exact<{
  expenseGroupId: Scalars['ID']['input'];
  startDate: Scalars['String']['input'];
  endDate: Scalars['String']['input'];
  totalBudget: Scalars['Float']['input'];
}>;


export type UpdateExpenseGroupMutation = { __typename?: 'Mutation', expenseGroup?: { __typename?: 'ExpenseGroupInfo', expenseGroupId: string, startDate: string, endDate: string, totalBudget: number } | null };

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
export const DeleteExpenseGroupDocument = gql`
    mutation deleteExpenseGroup($expenseGroupId: String!) {
  status: deleteExpenseGroup(expenseGroupId: $expenseGroupId) {
    code
    message
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
export const UpdateExpensePaidStatusDocument = gql`
    mutation updateExpensePaidStatus($isPaid: Boolean!, $expenseGroupId: String!, $expenseId: String!) {
  expense: updateExpensePaidStatus(
    isPaid: $isPaid
    expenseGroupId: $expenseGroupId
    expenseId: $expenseId
  ) {
    isPaid
  }
}
    `;
export const AddExpenseDocument = gql`
    mutation addExpense($expenseGroupId: ID!, $name: String!, $balance: Float!, $dueDate: String!, $isPaid: Boolean!, $note: String) {
  expense: addExpense(
    expenseGroupId: $expenseGroupId
    name: $name
    balance: $balance
    dueDate: $dueDate
    isPaid: $isPaid
    note: $note
  ) {
    _id
    name
    balance
    dueDate
    isPaid
    note
  }
}
    `;
export const UpdateExpenseGroupDocument = gql`
    mutation updateExpenseGroup($expenseGroupId: ID!, $startDate: String!, $endDate: String!, $totalBudget: Float!) {
  expenseGroup: updateExpenseGroup(
    expenseGroupId: $expenseGroupId
    startDate: $startDate
    endDate: $endDate
    totalBudget: $totalBudget
  ) {
    expenseGroupId
    startDate
    endDate
    totalBudget
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
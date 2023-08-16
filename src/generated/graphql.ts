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
  balance: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  isPaid: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addExpense: Expense;
};


export type MutationAddExpenseArgs = {
  balance: Scalars['Float']['input'];
  isPaid: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  expenses: Array<Maybe<Expense>>;
};

export type GetExpensesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetExpensesQuery = { __typename?: 'Query', expenses: Array<{ __typename?: 'Expense', id: string, name: string, balance: number, isPaid: boolean } | null> };

export type AddExpenseMutationVariables = Exact<{
  name: Scalars['String']['input'];
  balance: Scalars['Float']['input'];
  isPaid: Scalars['Boolean']['input'];
}>;


export type AddExpenseMutation = { __typename?: 'Mutation', addExpense: { __typename?: 'Expense', id: string, name: string, balance: number, isPaid: boolean } };


export const GetExpensesDocument = gql`
    query getExpenses {
  expenses {
    id
    name
    balance
    isPaid
  }
}
    `;
export const AddExpenseDocument = gql`
    mutation addExpense($name: String!, $balance: Float!, $isPaid: Boolean!) {
  addExpense(name: $name, balance: $balance, isPaid: $isPaid) {
    id
    name
    balance
    isPaid
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getExpenses(variables?: GetExpensesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetExpensesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetExpensesQuery>(GetExpensesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getExpenses', 'query');
    },
    addExpense(variables: AddExpenseMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AddExpenseMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddExpenseMutation>(AddExpenseDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addExpense', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
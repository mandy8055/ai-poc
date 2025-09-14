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

export type AvailabilityStatus =
  | 'GREEN'
  | 'RED'
  | 'YELLOW';

export type Brand =
  | 'APPLIANCE_PLUS'
  | 'COOKMASTER'
  | 'HOMEMATE'
  | 'HOMEPRO'
  | 'KITCHENTECH';

export type Color =
  | 'BLACK'
  | 'SILVER'
  | 'WHITE';

export type Money = {
  amount: Scalars['Float']['output'];
  currency: Scalars['String']['output'];
};

export type Price = {
  /** The price that should be displayed for a product */
  displayPrice?: Maybe<Money>;
};

export type Product = {
  availability?: Maybe<ShopAvailability>;
  brand?: Maybe<Brand>;
  color?: Maybe<Color>;
  /** header represents the product name which is useful for product name */
  header?: Maybe<Array<ProductHeader>>;
  id: Scalars['String']['output'];
  /** Essential for recommendations */
  price?: Maybe<Price>;
  productFamily: ProductFamily;
  reviewStatistics?: Maybe<ProductReviewStatistics>;
};

export type ProductFamily = {
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type ProductHeader = {
  block: Scalars['String']['output'];
  level?: Maybe<Scalars['Int']['output']>;
  value: Scalars['String']['output'];
};

export type ProductReviewStatistics = {
  averageRating?: Maybe<Scalars['Float']['output']>;
  ratingCount: Scalars['Int']['output'];
};

export type ShopAvailability = {
  /** indicator about the availability status */
  status?: Maybe<AvailabilityStatus>;
};

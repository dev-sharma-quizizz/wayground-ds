// Object to Dot Notation
type KeyType = string | number;

type BreakDownObject<O, R = void> = {
  [K in keyof O as string]: K extends KeyType
  ? R extends KeyType
  ? `${R}.${K}` | ObjectDotNotation<O[K], `${R}.${K}`>
  : K | ObjectDotNotation<O[K], K>
  : never;
};

export type ObjectDotNotation<O, R = void> = O extends KeyType
  ? R extends KeyType
  ? R
  : never
  : BreakDownObject<O, R>[keyof BreakDownObject<O, R>];

// Union to Tuple
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

type LastOf<T> = UnionToIntersection<T extends any ? (x: T) => void : never> extends (x: infer L) => void ? L : never;

type Push<T extends any[], V> = [...T, V];

export type UnionToTuple<T, Last = LastOf<T>> = [T] extends [never]
  ? []
  : Push<UnionToTuple<Exclude<T, Last>>, Last>;

// type Reducer<T> = (state: T, action: AnyAction) => T
type Reducer<T, A> = (state: T, action: A) => T

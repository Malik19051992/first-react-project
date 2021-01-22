export enum CategoryActionType {
  SET_CATEGORIES = 'SET_CATEGORIES'
}

export const setCategories = (categories) => ({
  type: CategoryActionType.SET_CATEGORIES,
  payload: { categories }
})
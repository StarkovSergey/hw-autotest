const initState = {
  themeId: 1,
}

export type ThemeReducerState = {
  themeId: number
}

export const themeReducer = (state: ThemeReducerState = initState, action: ActionsType): ThemeReducerState => { // fix any
  switch (action.type) {
    case 'SET_THEME_ID':
      return {
        ...state,
        themeId: action.id
      }
    default:
      return state
  }
}

export const changeThemeId = (id: number) => ({
  type: 'SET_THEME_ID' as const,
  id,
}) // fix any

type ActionsType = ReturnType<typeof changeThemeId>

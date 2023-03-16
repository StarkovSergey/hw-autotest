import { UserType } from '../HW8'

type ActionType = | { type: 'sort'; payload: 'up' | 'down' } | { type: 'check'; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => { // need to fix any
  switch (action.type) {
    case 'sort': { // by name
      return [...state].sort((prev, next) => {
        return action.payload === 'up'
          ? prev.name.localeCompare(next.name)
          : next.name.localeCompare(prev.name)
      })
    }
    case 'check': {

      return state.filter((item) => item.age > 18)
    }
    default:
      return state
  }
}

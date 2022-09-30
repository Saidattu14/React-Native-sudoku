export const initialState = { token : "", gametype : "", restart : false,cancel : 'none', 
touchpad : true,
}

type AppState = typeof initialState
type Action =
  | { type: 'Settoken', token : String }
  | { type: 'Setgametype', gametype : String }
  | { type: 'Setrestartgametype', restart : boolean }
  | { type: 'Setcancel', cancel : String }
  | { type: 'Settouchpad', touchpad : boolean }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'Settoken':
      return {
        ...state,
        token : action.token
      }
    case 'Setgametype':
      return {
        ...state,
        gametype : action.gametype
      }
    case 'Setrestartgametype':
        return {
          ...state,
          restart : action.restart,
        }
    case 'Settouchpad':
      return {
        ...state,
        touchpad : action.touchpad,
      }
    case 'Setcancel':
        return {
          ...state,
          cancel : action.cancel,
        }
    default:
      throw new Error()
  }
}

export default reducer;
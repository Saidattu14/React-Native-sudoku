export const initialState = {
    user: null,
    show_nav_bar : {
      display : 'none',
      position : 'relative'
    },
    current_value : null
    // token: "BQAwhS4pNU6sK0JW1VLYtNW9yVnjd7-bkMI6fwPzMwQ7sIzByxVnbZKTFJuqJUDkSKBk531pBKiNwwy3Z2IFljPhIrNqHS9lZR8Sv3R-GsVNDLTPTXnyhM1eo9PU76xf8AOsy09cEgTHRv9nXkC_2n8RSkCxOmHMOmRIMLFJpb6hczLQ"
};

const reducer = (state, action) => {
    switch(action.type) {
        case "SET_USER":
            return {
              ...state,
              user: action.user,
            };
            case "SET_Side_Nav_bar":
            return {
              ...state,
              show_nav_bar : action.show_nav_bar,
            };
            case "SET_Value":
              return {
                ...state,
                current_value : action.current_value,
              };

        
    }
}

export default reducer;
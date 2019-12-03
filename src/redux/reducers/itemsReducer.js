import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";


export default function changeItemsReducer(state = initialState.items, action) {
    switch (action.type) {
        case actionTypes.ITEM_LIST_SUCCESS:
            return action.payload
        case actionTypes.ADD_TO_ITEM:
            return [...state, { ...action.payload }]
        case actionTypes.UP_TO_ITEM:
            var votedItem = state.find(c => c.id === action.payload.id);
            if (votedItem) {
                var newState = state.map(item => {
                    if (item.id === action.payload.id) {
                        votedItem.upVote += 1;
                        votedItem.lastVoteUpdated = new Date();
                        return votedItem;
                    }
                })
                return newState;
            } else {
                return state
            }
        case actionTypes.DOWN_TO_ITEM:
            var votedItem = state.find(c => c.id === action.payload.id);
            if (votedItem) {
                var newState = state.map(item => {
                    if (item.id === action.payload.id) {
                        votedItem.upVote -= 1;
                        votedItem.lastVoteUpdated = new Date();
                        return votedItem;
                    }
                    return item;
                })
                return newState;
            } else {
                return state
            }

        case actionTypes.DELETE_ITEM:
        console.log(action);
            const newState2 = state.filter(item => item.id !== action.payload)
        return newState2;

        default:
            return state
    }

}

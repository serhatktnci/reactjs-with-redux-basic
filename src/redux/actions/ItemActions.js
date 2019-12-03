import * as actionTypes from "./actionTypes"

/*export function getItemsSuccess(result,sort){
    return {type:actionTypes.ITEM_LIST_SUCCESS,payload:result}
}

export function getItems(){
    return function(dispatch){
        let url ="http://localhost:3000/items";
        return fetch(url)
        .then(response=> response.json())
        .then(result => dispatch(getItemsSuccess(result)));
    }
}
*/

export function deleteItem(id){
    return {type:actionTypes.DELETE_ITEM,payload:id}

}


export function changeSort(key, type, result) {
    var newItems = {}

    if (type === 'desc') {
        newItems = result.sort((a, b) => (a[key] < b[key]) ? 1 : -1)

        newItems = newItems.sort((a, b) => {
            if (a.upVote == b.upVote) {
                return (a.lastVoteUpdated < b.lastVoteUpdated) ? 1 : -1;
            }
        })
    } else if (type === 'asc') {
        newItems = result.sort((a, b) => (a[key] > b[key]) ? 1 : -1)

        newItems = newItems.sort((a, b) => {
            if (a.upVote == b.upVote) {
                return (a.lastVoteUpdated < b.lastVoteUpdated) ? 1 : -1;
            }
        })
    }
    return function (dispatch) {
        return dispatch(changeSortSuccess(newItems))

    };

}

export function changeSortSuccess(result) {

    return { type: actionTypes.ITEM_LIST_SUCCESS, payload: result }
}

export function addItem(item) {
    return { type: actionTypes.ADD_TO_ITEM, payload: item }
}

export function upItem(item) {
    return { type: actionTypes.UP_TO_ITEM, payload: item }
}

export function downItem(item) {
    return { type: actionTypes.DOWN_TO_ITEM, payload: item }
}


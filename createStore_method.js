import { createStore } from "redux";

const ADD_TODO = 'add_todo';
const DEL_TODO = 'delete_todo';
const EDIT_TODO = 'edit_todo';


// first we make a reducer function
function todoReducer(state, action) {

    if(action.type == ADD_TODO) {
        const todo = action.payload.todoText;

        return [
            ...state,
            {text: todo, isFinished: false, id: (state.length == 0)? 1 : state[state.length -1 ].id + 1 }
        ]
    }
    else if( action.type == DEL_TODO ) {
        const todoid = action.payload.todoId;

        return state.filter( t => t.id != todoid);
    }
    else if( action.type == EDIT_TODO ){
        const todo = action.payload.todo;
        const newText = action.payload.newText;

        return state.map( t => {
            if(t.id == todo.id){
                t.text = newText;
            }
            return t;
        })
    }
    else {
        return state;
    }
}



const {dispatch, subscribe, getState, replaceReducer } = createStore(todoReducer, []);



//! subscribe() -> this method take a callback func. and this function is executed whenever the state is changes(jab bhi state( [] ) me koi chnage hoga(ig: addtodo, deletetodo, edittood.....) tab subscribe ka callback func. chalega)
subscribe(()=>  console.log('subscribe after state change: ',getState()))


//! getState()-> this method gives us current state 
// console.log('1st state: ',getState());    

//! dispatch() -> this method is same as the reducer dispatch method (we define our action object inside this method)
dispatch({ type: ADD_TODO, payload: {todoText: 'todo 1'}})      
// console.log('state after adding a todo: ',getState());

dispatch({ type: ADD_TODO, payload: {todoText: 'todo 2'}})
// console.log('state after adding another new todo: ',getState());

dispatch({ type: ADD_TODO, payload: {todoText: 'todo 3'}})

dispatch({ type: DEL_TODO, payload: {todoId: 2}})


// dispatch({ type: EDIT_TODO, payload: {todo , newText: "adit todo text "}})




//! replaceReducer()-> this is used to replace our reducer method with another reducer method




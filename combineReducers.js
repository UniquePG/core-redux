import { createStore, bindActionCreators, combineReducers } from "redux";

const ADD_TODO = 'add_todo';
const DEL_TODO = 'delete_todo';
const EDIT_TODO = 'edit_todo';
const ADD_USER = 'add_user';


// first we make a reducer function
function todoReducer(state = [], action) {

    if(action.type == ADD_TODO) {
        const todo = action.payload.todoText;

        return [
            ...state,
            {text: todo, isFinished: false, id: (state.length == 0)? 1 : state[state.length -1].id + 1 }
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


// Make antoher reducer
function userReducer(state = [], action){

    if(action.type == ADD_USER){

        const name = action.payload.userName;

        return [
            ...state,
            {name: name, id: (state.length == 0) ? 1 : state[state.length -1 ].id + 1  }
        ]
    }
    else{
        return state;
    }
}


const addTodo = (text)=> ( { type: ADD_TODO, payload: { todoText: text }} )
const deleteTodo = (id) => ({ type: DEL_TODO, payload: { todoId: id }} )
const adduser = (name) => ( {type: ADD_USER, payload: {userName: name}})



//* Now if we want to manage two reducers in single way then we can use combineReducer() API
//! yha par jo key name(todo, user) denge bhe hamre state ka naam ho jayegaa (so take key name carefully)
const multipleReducer = combineReducers({todo: todoReducer, user: userReducer}); 


const {dispatch, subscribe, getState, replaceReducer } = createStore( multipleReducer );
subscribe(()=>  console.log('subscribe after state change: ',getState()))



const actions = bindActionCreators({addTodo, deleteTodo, adduser}, dispatch);


// const { addTodo, deleteTodo } = bindActionCreators({addTodo, deleteTodo}, dispatch);   
// addTodo('todo after destructuring our return object...')  //todo and call like this



// Now we can use this action to perform our action creators

actions.adduser("raghav goel")

actions.addTodo('todo 1 after bind action creators')
actions.addTodo('todo 2 after bind action creators')
actions.addTodo('todo 3 after bind action creators')

actions.deleteTodo(2)


actions.adduser("praveen raj")


// dispatch(addTodo('todo 1'))      

// dispatch(addTodo('todo 2')) 

// dispatch(addTodo('todo 3'))  


// dispatch(deleteTodo(1))
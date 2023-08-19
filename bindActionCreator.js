import { createStore, bindActionCreators } from "redux";

const ADD_TODO = 'add_todo';
const DEL_TODO = 'delete_todo';
const EDIT_TODO = 'edit_todo';


// first we make a reducer function
function todoReducer(state, action) {

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


//! action creators -> we convert our action object into action function that is called the action creator
//! action object{} ---> action function()
const addTodo = (text)=> ( { type: ADD_TODO, payload: { todoText: text }} )
const deleteTodo = (id) => ({ type: DEL_TODO, payload: { todoId: id }} )


const {dispatch, subscribe, getState, replaceReducer } = createStore(todoReducer, []);
subscribe(()=>  console.log('subscribe after state change: ',getState()))

//! bindActionCreator()-> it takes two parametes:-  
    //* 1st-> object of our action creators (addtodo, deletetodo....)
    //* 2st-> method in which we want to bind our action creators[dispatch] (jis method me hum apne action creators ko bind karke use krna chahte hai [ig: dispatch]
//! bindActionCreator()-> and it also returns our action creators object(after binding with func(dispatch))  
const actions = bindActionCreators({addTodo, deleteTodo}, dispatch);


//todo We can also use this syntax ( destructuring our return object )
// const { addTodo, deleteTodo } = bindActionCreators({addTodo, deleteTodo}, dispatch);   
// addTodo('todo after destructuring our return object...')  //todo and call like this



// Now we can use this action to perform our action creators
actions.addTodo('todo 1 after bind action creators')
actions.addTodo('todo 2 after bind action creators')
actions.addTodo('todo 3 after bind action creators')

actions.deleteTodo(2)


//* here we call dispatch method multiple times so whenever we want to call our action creator we have to give access of our dispatch method to every place ->
//! To solve this proble we use bindAactionCreator()
// dispatch(addTodo('todo 1'))      

// dispatch(addTodo('todo 2')) 

// dispatch(addTodo('todo 3'))  


// dispatch(deleteTodo(1))
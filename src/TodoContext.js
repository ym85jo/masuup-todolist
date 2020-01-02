import React, {useReducer, createContext, useContext, useRef} from 'react';

const initialTodos = [
    {
        id : 1
        , text : 'create Project'
        , done : true
    }
    , {
        id : 2
        , text : 'create Project2'
        , done : true
    }
    , {
        id : 3
        , text : 'create Project3'
        , done : true
    }
    , {
        id : 4
        , text : 'create Project4'
        , done : false
    }

]

function todoReducer(state, action){

    console.log(state, action);

    switch (action.type) {
        case 'CREATE':
            return state.concat(action.todo);
        
        case 'TOGGLE':
            return state.map( todo =>
                todo.id === action.id ? {...todo, done : !todo.done} : todo
            );

        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id); 
    
        default:
            throw new Error(`Error ${action.type}`)
    }

}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }){
    
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(5);

    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    )
}

export function useTodoState(){
    const context = useContext(TodoStateContext);
    if(!context) {
        throw new Error('Error');
    }
    return context;
}

export function useTodoDispatch(){
    const context = useContext(TodoDispatchContext);
    if(!context) {
        throw new Error('Error');
    }
    return context;
}

export function useTodoNextId(){
    const context = useContext(TodoNextIdContext);
    if(!context) {
        throw new Error('Error');
    }
    return context;
}
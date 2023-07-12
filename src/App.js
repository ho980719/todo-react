import './App.css';
import {Todo} from "./component/Todo";
import {Reset} from "styled-reset";
import {Route, Routes} from "react-router-dom";
import {TodoCalendar} from "./component/TodoCalendar";
import {TodoView} from "./component/TodoView";
import {Login} from "./component/Login";

function App() {
    // @todo redux store 관리
    const login = 1;
    return (
        <>
            <Reset/>
            <div className="App">
                <div className='todo-note'>
                    <div className='todo-title'>
                        <h1>NOTE.</h1>
                    </div>
                    <div className='todo-container'>
                        <Routes>
                            <Route path='/' element={login ? <TodoCalendar/> : <Login/>}/>
                            <Route path='/todo/list/:date' element={<Todo/>}/>
                            <Route path='/todo/view' element={<TodoView/>}/>
                            <Route path='/calender' element={<TodoCalendar/>}/>
                            <Route path="/*" element={<div>404 Not Found!</div>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;

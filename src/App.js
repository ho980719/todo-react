import './App.css';
import {Todo} from "./component/Todo";
import {Reset} from "styled-reset";
import {Route, Routes} from "react-router-dom";
import {TodoCalendar} from "./component/TodoCalendar";
import {TodoView} from "./component/TodoView";

function App() {
  return (
    <>
        <Reset/>
        <div className="App">
            <Routes>
                <Route path='/' element={<Todo/>}/>
                <Route path='/todo/list' element={<Todo/>}/>
                <Route path='/todo/view' element={<TodoView/>}/>
                <Route path='/calender' element={<TodoCalendar/>}/>
                <Route path="/*" element={<div>Fail!</div>} />
            </Routes>
        </div>
    </>
  );
}

export default App;

import './App.css';
import {Todo} from "./component/Todo";
import {Reset} from "styled-reset";

function App() {
  return (
    <>
        <Reset/>
        <div className="App">
            <Todo/>
        </div>
    </>
  );
}

export default App;

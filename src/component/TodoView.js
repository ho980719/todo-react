import {useState} from "react";
import {TodoList} from "../data/TodoList";

export const TodoView = () => {

    return (
        <div className='todo-note'>
            <div className='todo-title'>
                <h1>VIEW.</h1>
            </div>
            <div className='todo-list-box'>
                <ul className='todo-list'>

                </ul>
            </div>
            <div className='todo-input-box'>
                <div className='todo-input-wrap'>
                    <button onClick={() => {

                    }} type='button' className='todo-add-btn '>추가하자</button>
                    {/*<input type='text' className='todo-input' placeholder='할거 입력해줘'/>*/}
                    <span className='material-symbols-outlined enter-circle'>arrow_forward</span>
                </div>
            </div>
        </div>
    )
}
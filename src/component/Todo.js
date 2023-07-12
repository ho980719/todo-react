import {useEffect, useState} from "react";
import {TodoList} from "../data/TodoList";
import {useNavigate, useParams} from "react-router-dom";
import {request} from "../lib/request";

export const Todo = () => {
    const navigate = useNavigate();
    // list 선언
    const [list, setList] = useState([]);
    const {date} = useParams();


    useEffect(() => {
        const getTodos = async () => {
            let response = await request.get(`/todos/1/${date}`)
                .then((response) => {
                    if (response.data.statusCode != 200)
                        throw new Error(response.data.payload.errorMessage);
                    else {
                        let temp = response.data.payload;
                        setList(temp);
                    }
                }).catch((e) => {
                    console.error(e)
                    alert(e.message)
                });
        }
        getTodos();
    }, [])


    // insert

    // delete
    const removeTodo = (id) => {
        setList(list.filter(item => item.id !== id));
    }

    const updateComplete = async (id) => {
        let completed;
        list.find((item) => {
            if(item.id === id) completed = item.completed;
        });

        let confirmMessage = completed ? '번복하는거야?' : '완료했어?';

        if (!window.confirm(confirmMessage))return false;

        let todo;
        // 1. API 전송
        let response = await request.put(`/todos/complete/${id}`)
            .then((response) => {
                if (response.data.statusCode != 200)
                    throw new Error(response.data.payload.errorMessage);
                else {
                    todo = response.data.payload;
                }
            }).catch((e) => {
                alert(e.message)
            });
        // 2. 정상처리시 state 변경
        setList(
            list.map(item =>
                item.id === id ? {...item, completed: todo.completed} : item
            )
        );
    }

    return (
        <>
            <div className='todo-list-box'>
                <ul className='todo-list'>
                    {
                        list.length > 0 ?
                            list.map((todo) => {
                                return (
                                    <li key={todo.id}>
                                        <div className='todo-text-wrap'>
                                            <input onChange={()=>updateComplete(todo.id)} checked={todo.completed && 'checked'} className="form-check-input mt-0 me-2" style={{border: '1px solid black'}} type="checkbox" value={todo.id}/>
                                            <p>{todo.title}</p>
                                        </div>
                                        <div>
                                            <span style={{cursor:"pointer", marginRight: 5}} className='material-symbols-outlined todo-action-btn'>edit</span>
                                            <span onClick={()=>{removeTodo(todo.id)}} style={{cursor:"pointer"}} className='material-symbols-outlined todo-action-btn'>delete</span>
                                        </div>
                                    </li>
                                )
                            })
                            : <div>아무것도 안하게?</div>
                    }
                </ul>
            </div>
            <div className='todo-input-box'>
                <div className='todo-input-wrap'>
                    <input type='text' className='todo-input' placeholder='할거 입력해줘'/>
                    <span className='material-symbols-outlined enter-circle'>arrow_forward</span>
                </div>
            </div>
        </>

    )
}
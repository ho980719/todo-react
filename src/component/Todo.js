import {useEffect, useState} from "react";
import {TodoList} from "../data/TodoList";
import {useNavigate} from "react-router-dom";
import {request} from "../lib/request";

export const Todo = () => {
    const navigate = useNavigate();
    // list 선언
    // const [list, setList] = useState(TodoList);
    const [list, setList] = useState([]);


    useEffect(() => {
        const getTodos = async () => {
            let response = await request.get('/todos/1/20230711')
                .then((response) => {return response.data})

            console.log(response)
        }
        getTodos();
    }, [])


    // insert

    // delete
    const removeTodo = (id) => {
        let copy = list.filter(value => value.id !== id)
        setList(copy);
    }

    return (
        <>
            <div className='todo-list-box'>
                <ul className='todo-list'>
                    {
                        list.length > 0 ?
                            list.map((todo, index) => {
                                return (
                                    <li key={todo.id}>
                                        <div className='todo-text-wrap'>
                                            <input onChange={()=>{}} checked={todo.completed && 'checked'} className="form-check-input mt-0 me-2" style={{border: '1px solid black'}} type="checkbox" value=""/>
                                            <p>{todo.title}</p>
                                        </div>
                                        <div>
                                            <span className='material-symbols-outlined'>edit</span>
                                            <span onClick={()=>{removeTodo(todo.id)}} className='material-symbols-outlined'>delete</span>
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
                    <button onClick={() => {
                        navigate('/todo/view')
                    }} type='button' className='todo-add-btn '>추가하자</button>
                    <span className='material-symbols-outlined enter-circle'>arrow_forward</span>
                </div>
            </div>

        </>

    )
}
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {request} from "../lib/request";
import  $ from 'jquery';

export const Todo = () => {
    const navigate = useNavigate();
    // list 선언
    const [list, setList] = useState([]);
    const {date} = useParams();


    useEffect(() => {
        const getTodos = async () => {
            await request.get(`/todos/1/${date}`)
                .then((response) => {
                    if (response.data.statusCode != 200)
                        throw new Error(response.data.payload.errorMessage);
                    else {
                        let temp = response.data.payload;
                        setList(temp);
                    }
                }).catch((e) => {
                    alert(e.message)
                });
        }
        getTodos();
    }, [])


    // 삭제처리
    const removeTodo = async (id) => {
        // 1. API 전송
        await request.put(`/todos/delete/${id}`)
            .then((response) => {
                if (response.data.statusCode != 200)
                    throw new Error(response.data.payload.errorMessage);
                // 2.정상처리시 state 변경
                setList(list.filter(item => item.id !== id));
            }).catch((e) => {
                alert(e.message)
                return false;
            });
    }

    // 완료처리
    const updateComplete = async (id) => {
        let completed;
        list.find((item) => {
            if (item.id === id) completed = item.completed;
        });

        let confirmMessage = completed ? '번복하는거야?' : '완료했어?';

        if (!window.confirm(confirmMessage)) return false;

        // edit 모드 일때, 화면 재 렌더링?
        setList([...list]);

        // 1. API 전송
        let response = await request.put(`/todos/complete/${id}`)
            .then((response) => {
                if (response.data.statusCode != 200)
                    throw new Error(response.data.payload.errorMessage);
                else {
                    // 2. 정상처리시 state 변경
                    setList(
                        list.map(item =>
                            item.id === id ? {...item, completed: response.data.payload.completed} : item
                        )
                    );
                }
            }).catch((e) => {
                alert(e.message)
                return false;
            });

    }

    const updateTodo = async (el) => {
        let id = el.dataset.id;
        let type = el.innerText;
        let p = el.parentElement.previousElementSibling.lastElementChild;
        if (type == 'edit') {
            // edit -> check
            el.innerText = 'check';
            // <p> -> <input>
            $(p).html('<input type="text" class="todo-title-input" value="'+p.innerText+'"/>')
        } else if (type == 'check') {
            let input = p.lastElementChild;
            let title = input.value;
            // call api
            await request.patch(`/todos/update`, {id: id, title: title})
                .then((response) => {
                    if (response.data.statusCode != 200)
                        throw new Error(response.data.payload.errorMessage);
                    // check -> edit
                    el.innerText = 'edit';
                    // <input> -> <p>
                    $(p).html(title);
                }).catch((e) => {
                    alert(e.message)
                    return false;
                });
        }
    }

    const addTodo = async () => {
        // validation
        if ($('#title').val() == '') {
            alert('할걸 입력해줘.');
            return false;
        }
        // call api
        await request.post(`/todos/create`, {})
            .then((response) => {
                if (response.data.statusCode != 200)
                    throw new Error(response.data.payload.errorMessage);
            }).catch((e) => {
                alert(e.message)
                return false;
            });
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
                                            <input onChange={() => updateComplete(todo.id)}
                                                   checked={todo.completed && 'checked'}
                                                   className="form-check-input mt-0 me-2"
                                                   type="checkbox" value={todo.id}/>
                                            <p className={todo.completed ? 'todo-complete' : null}>{todo.title}</p>
                                        </div>
                                        <div className='todo-action-btn-wrap'>
                                            <span onClick={(e) => {
                                                e.preventDefault();

                                                if (todo.completed) {
                                                    alert('완료한 데이터는 수정할수 없어..');
                                                    return false;
                                                }
                                                updateTodo(e.target);
                                            }}
                                                  data-id={todo.id}
                                                  className='material-symbols-outlined todo-action-btn hover-green'>edit</span>
                                            <span onClick={(e) => {
                                                removeTodo(todo.id);
                                            }}
                                                  className='material-symbols-outlined todo-action-btn hover-red'>delete</span>
                                        </div>
                                    </li>
                                )
                            })
                            : <div>아무것도 안하게?</div>
                    }
                    {/*<li key='5'>
                        <div className='todo-text-wrap'>
                            <input onChange={() => {
                            }}
                                   className="form-check-input mt-0 me-2"
                                   type="checkbox" value='5'/>
                            <p><input type='text' className='todo-title-input' defaultValue='업데이트 테스트임'/></p>
                        </div>
                        <div className='todo-action-btn-wrap'>
                            <span onClick={(e) => {
                                e.preventDefault();
                            }}
                                  className='material-symbols-outlined todo-action-btn hover-green'>edit</span>
                            <span onClick={(e) => {
                                e.preventDefault();
                            }}
                                  className='material-symbols-outlined todo-action-btn hover-red'>delete</span>
                        </div>
                    </li>*/}
                </ul>
            </div>
            <div className='todo-input-box'>
                <div className='todo-input-wrap'>
                    <input type='text' id='title' className='todo-input' placeholder='할거 입력해줘'/>
                    <span onClick={(e) => {
                        addTodo();
                    }} className='material-symbols-outlined enter-circle'>arrow_forward</span>
                </div>
            </div>
        </>

    )
}
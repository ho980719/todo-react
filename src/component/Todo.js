
export const Todo = () => {
    return (
        <div className='todo-note'>
            <div className='todo-title'>
                <h1>NOTE.</h1>
            </div>
            <div className='todo-list-box'>
                <ul className='todo-list'>
                    <li>
                        <div className='todo-text-wrap'>
                            <input className="form-check-input mt-0 me-2" style={{border: '1px solid black'}} type="checkbox" value=""/>
                            <p>안녕안녕 친구들</p>
                        </div>
                        <div>
                            <span className='material-symbols-outlined'>edit</span>
                            <span className='material-symbols-outlined'>delete</span>
                        </div>
                    </li>
                    <li>안녕안녕 친구들</li>
                    <li>안녕안녕 친구들</li>
                    <li>안녕안녕 친구들</li>
                </ul>
            </div>
            <div className='todo-input-box'>
                <div className='todo-input-wrap'>
                    <input type='text' className='todo-input' placeholder='할거 입력해줘'/>
                    <span className='material-symbols-outlined enter-circle'>arrow_forward</span>
                </div>
            </div>
        </div>
    )
}
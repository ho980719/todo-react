import {useState} from "react";
import Calendar from 'react-calendar';
import '../Calendar.css';
export const TodoCalendar = () => {
    const [value, onChange] = useState(new Date());

    return (
        <div className='todo-note'>
            <div className='todo-title'>
                <h1>CALENDER.</h1>
            </div>
            <div className='todo-list-box'>
                <Calendar onChange={onChange} value={value} />
            </div>
        </div>
    )
}
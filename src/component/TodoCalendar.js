import {useState} from "react";
import Calendar from 'react-calendar';
import '../Calendar.css';
import {defaultFormatDate} from "../lib/Util";
import {useNavigate} from "react-router-dom";
export const TodoCalendar = () => {
    const [date, setDate] = useState(new Date());
    const navigate = useNavigate();
    const onDateChange = (newDate) => {
        setDate(newDate);
        navigate(`/todo/list/${defaultFormatDate(newDate)}`)
    }

    return (
        <>
            <Calendar onChange={onDateChange} value={date} />
        </>
    )
}
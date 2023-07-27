import axios from "axios";
import {request} from "../lib/request";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginAction} from "../slice/memberSlice";

export const Login = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const login = async () => {
        let member = document.getElementById('form-member');
        // @todo validation

        await request.get('members/sign-in', {
            params: {
                loginId: member.login_id.value,
                password: member.password.value,
            }
        }).then((response) => {
            dispatch(loginAction());
            if (response.data.statusCode != 200)
                throw new Error(response.data.payload.errorMessage);
            // else navigate('/todo/list');
        }).catch((e) => {
            console.error(e)
            alert(e.message)
        });
    }

    return (
        <div className='login-container'>
            <form id='form-member'>
                <div>
                    <input type='text' name='login_id' placeholder='ID'/>
                </div>
                <div>
                    <input type='text' name='password' placeholder='PASSWORD'/>
                </div>
            </form>
            <div>
                <button>회원가입</button>
                <button>id/pw찾기</button>
            </div>
            <div>
                <button onClick={login}>로그인</button>
            </div>
        </div>
    )
}

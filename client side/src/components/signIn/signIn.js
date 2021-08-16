import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import './signIn.css';

import InputLabel from '../inputLabel/inputLabel'
import { validateID, Password } from '../validation/validation'

function SignIn(props) {
    const [state, setState] = useState({
        id: "",
        password: ""
    })

    const [errorMessage, setErrorMessage] = useState(false)
    function inputChange(content, event) {
        setState({ ...state, [content]: event.target.value })
    }
    const addUser = async (UserDetails) => {
        await fetch("http://localhost:3080/LapinDesignerData/signIn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "access-control-allow-origin": "*",
            },
            body: JSON.stringify({
                "ID": UserDetails.ID,
                "password": UserDetails.Password

            }),
        }).then(res => res.json().then(data => ({ status: res.status, body: data })))
            .then(response => {


                if (response.status === 409) {
                    setErrorMessage(true)
                }
                else {
                    let users = response.body.user
                    console.log(users)
                    let name = users.UserName
                    let token = response.body.token
                    setErrorMessage(false)
                    props.setCustomer({ name, token });
                    debugger
                    localStorage.setItem('customer', JSON.stringify({ name, token }))
                    debugger
                    props.history.push('/');
                }
            }).catch(error => console.log('error', error));

    }

    async function submit(event) {
        var UserDetails = {
            ID: state.id,
            Password: state.password
        }
        addUser(UserDetails);
        event.preventDefault();

    }
    return (
        <div className="animated fadeInDown">
            <div className="fade-in-down">
                <form className="sign-in">
                    <h3 className="sign-in-title">כניסה לאזור האישי</h3>
                    <InputLabel type="text" name="מספר זהות" id="id"
                        onChange={inputChange} validCheck={() => validateID(state.id)} />
                    <InputLabel type="password" name="סיסמא" id="password"
                        onChange={inputChange} validCheck={() => Password(state.Password)} />
                    <br />
                    <button className="submit" type="submit" onClick={submit} >לאזור האישי</button>
                    {errorMessage && <div>הסיסמא/ מספר הזהות שגויים</div>}
                </form>
            </div>
        </div>

    )
}

export default withRouter(SignIn);

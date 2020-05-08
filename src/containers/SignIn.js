import React        from "react";
import {connect}    from 'react-redux';
import {submitForm} from '../actions';
import './SignIn.css'

const mapStateToProps = (state) => ({
    error : state.signInHandler.error
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (event) => submitForm(event)(dispatch)
})

const SignIn = (props) => {
    return(
        <div>
            <div>
                <div>
                    <h1> Login </h1>
                </div>
                <form onSubmit={props.onSubmit}>
                    <div>
                        <label for="name"> Chat Name: </label>
                        <input type="text" name="name" id="userNameInput"/>
                    </div>
                    <button type="button" onClick={() => {
                        props.onSubmit(document.getElementById("userNameInput").value);
                    }}/>
                    <p>{ props.error }</p>
                </form>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
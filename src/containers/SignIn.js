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
        <div class="allscreen">
            <div class="login-elements">
                <div class="title">
                    <h1> Login </h1>
                </div>
                <form onSubmit={props.onSubmit}>
                    <div class="inputLogin">
                        <input type="text" placeholder="Enter chat name" name="name" id="userNameInput"/>
                    </div>
                    <div class="buttonLogin">
                        <button type="button" onClick={() => {
                        props.onSubmit(document.getElementById("userNameInput").value);
                        }}>
                            Sign In 
                        </button>
                    </div>
                    <div class="propLogin">
                        <p>{ props.error }</p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
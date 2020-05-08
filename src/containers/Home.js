import React     from "react";
import {connect} from 'react-redux';
import SignIn    from './SignIn'
import ChatRoom  from './ChatRoom'

const mapStateToProps = (state) => ({
    userName : state.signInHandler.userName,
    signedIn : state.signInHandler.signedIn
});

const mapDispatchToProps = (dispatch) => ({
    
})


const Home = ({signedIn, userName}) => {
    return(
        <div>
            {signedIn ? <ChatRoom userName={userName} /> : <SignIn />}
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
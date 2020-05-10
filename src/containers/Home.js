import React     from "react";
import {connect} from 'react-redux';
import SignIn    from './SignIn'
import ChatRoom  from './ChatRoom'

const mapStateToProps = (state) => ({
    userName : state.signInHandler.userName,
    signedIn : state.signInHandler.signedIn,
    keys     : state.signInHandler.keys
});

const mapDispatchToProps = (dispatch) => ({
    
})


const Home = ({signedIn, userName, keys}) => {
    return(
        <div>
            {signedIn ? <ChatRoom userName={userName} keys={keys}/> : <SignIn />}
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
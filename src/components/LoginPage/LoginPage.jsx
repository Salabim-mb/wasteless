import React from 'react'
import './LoginPage.css'

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            maskStyle: {
                left: 512,
                right: 0
            }
        }

        this.container = React.createRef()
        // this.signUpBtn = React.createRef()

        this.onSignIn = this.onSignIn.bind(this)
        this.onSignUp = this.onSignUp.bind(this)

    }
    componentDidMount() {
        // mask was in the left
        // clip-path: inset(0px 512px 0 0);

        // mask was in the right
        // clip-path: inset(0px 0 0 512px);



        // this.interval = setInterval(() => {
        //     let numLeft = this.state.maskStyle.left + 1
        //     let numRight = this.state.maskStyle.right -1

        //     this.setState({ maskStyle: { left: numLeft, right: numRight } })
        // }, 1000000000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);

    }

    onSignUp() {
        this.container.current.classList.add("right-panel-active");
    }
    onSignIn() {
        debugger
        this.container.current.classList.remove("right-panel-active");
    }


    render() {
        const clipValue = `inset(0 ${this.state.maskStyle.left}px 0 ${this.state.maskStyle.right}px)`


        return (
            <div className="container" id="container" ref={this.container}>
                <div className="form-container sign-up-container">
                    <form action="/" id="register_form_id">
                        <h1>Create Account</h1>

                        <input type="text" id="login_name_id" placeholder="Name" />
                        <input type="email" id="login_email_id" placeholder="Email" />
                        <input type="password" id="password_id" placeholder="Password" />
                        <button onClick={this.onSignUp}>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="/" id="login_form_id">
                        <h1>Sign in</h1>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <a href="/">Forgot your password?</a>
                        <button onClick={this.onSignIn}>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Hello, Friend!</h1>
                            <p>To start saving food please enter your personal data, to create free account!</p>
                            <button className="ghost" id="signIn" onClick={this.onSignIn}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Welcome Back!</h1>
                            <p>To keep changing world for a better place, please log in!</p>

                            <button className="ghost" id="signUp" onClick={this.onSignUp}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default LoginPage;
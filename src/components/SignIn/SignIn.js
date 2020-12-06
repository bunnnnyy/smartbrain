import React from 'react';



class SignIn extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            Signinemail : '',
            SigninPassword : ''
        }
    }

   

    onemailchange = (event) => {
        this.setState ({Signinemail : event.target.value})
    }

    onPasswordchange = (event) => {
        this.setState ({SigninPassword : event.target.value})
    }

    onSubmit=()=>{
        fetch(' https://radiant-depths-54780.herokuapp.com/signin/' , {
            method : 'post',
            headers : {'Content-type' : 'application/json'},
            body : JSON.stringify({
                email: this.state.Signinemail,
                password : this.state.SigninPassword
            }) 
        }).then(response => response.json()).then(user => {
            if(user.id){
                this.props.Loaduser(user) 
                this.props.onroutechange('home');
            }
        })
    }

    render(){
        const {onroutechange} = this.props;

        return (
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
        
                    <main className="pa4 black-80">
                        <div className="measure ">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6 " htmlFor="email-address">Email</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address"
                                    onChange={this.onemailchange}

                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password"
                                    onChange={this.onPasswordchange}
                                />
                            </div>
                            </fieldset>
                            <div className="">
                            <input 
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Sign in"
                                onClick={this.onSubmit} 

                                />
                            </div>
                            <div className="lh-copy mt3">
                            <p onClick={()=>onroutechange('register')} href="#0" className="f6 link dim black db pointer">Register</p>
                            </div>
                        </div>
                    </main>
                
                </article>
        )
    }
}


export default SignIn;




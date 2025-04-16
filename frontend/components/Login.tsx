import React, { useState } from 'react';
import '../css/AuthStyles.css'; // Import the custom CSS

function Login() {
    const [message, setMessage] = useState('');
    const [loginName, setLoginName] = useState('');
    const [loginPassword, setPassword] = useState('');

    async function doLogin(event: any): Promise<void> {
        // Prevent default form submission if event exists
        if (event) event.preventDefault();
        
        var obj = { login: loginName, password: loginPassword };
        var js = JSON.stringify(obj);
        
        try {
            const response = await fetch('https://cop4331-lp-group20.darkmooncs.xyz:/api/login', {
                method: 'POST', 
                body: js, 
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            var res = JSON.parse(await response.text());
            
            if (res.id <= 0) {
                setMessage('User/Password combination incorrect');
            } else {
                var user = { 
                    firstName: res.firstName, 
                    lastName: res.lastName, 
                    phone: res.phone,
		    id: res.id 
                }
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
                window.location.href = '/issue';
            }
        } catch (error: any) {
            alert(error.toString());
            return;
        }
    };

    return (
        <main className="login-page">
            <div className="auth-container">
                <form onSubmit={doLogin}>
                    <div className="mb-3">
                        <input 
                            id="loginName" 
                            autoComplete="off" 
                            autoFocus 
                            className="form-control mx-auto w-auto" 
                            name="email"
                            placeholder="Email" 
                            type="text"
                            value={loginName}
                            onChange={(e) => setLoginName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                            id="loginPassword" 
                            className="form-control mx-auto w-auto" 
                            name="password"
                            placeholder="Password" 
                            type="password"
                            value={loginPassword}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    	</div>
	                    <button 
	                        id="loginButton" 
	                        className="buttons btn btn-primary" 
	                        type="button" 
	                        onClick={doLogin}
	                    >
                        Log In
                    </button>
                    <span id="loginResult">{message}</span>
                </form>
            </div>
        </main>
    );
}

export default Login;

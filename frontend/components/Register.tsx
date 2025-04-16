import React, { useState } from 'react';
import '../css/AuthStyles.css'; // Import the shared auth styles

function Register() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [message, setMessage] = useState('');

    async function doRegistration(event: any): Promise<void> {
        // Prevent default form submission if event exists
        if (event) event.preventDefault();
        
        // Basic validation
        if (!email || !firstName || !lastName || !phone || !password || !confirmation) {
            setMessage('All fields are required');
            return;
        }
        
        if (password !== confirmation) {
            setMessage('Passwords do not match');
            return;
        }
        
        // Phone number validation (000-000-0000 format)
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
        if (!phoneRegex.test(phone)) {
            setMessage('Please enter phone in format 000-000-0000');
            return;
        }
        
        const obj = { 
            login: email, 
            firstName: firstName, 
            lastName: lastName, 
            phone: phone, 
            password: password 
        };
        const js = JSON.stringify(obj);
        
        try {
            const response = await fetch('https://cop4331-lp-group20.darkmooncs.xyz/api/register', {
                method: 'POST', 
                body: js, 
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const res = JSON.parse(await response.text());
            
            if (res.error) {
                setMessage(res.error);
            } else {
                setMessage('Registration successful! Please log in.');
                // Clear form fields
                setEmail('');
                setFirstName('');
                setLastName('');
                setPhone('');
                setPassword('');
                setConfirmation('');
                
                // Redirect to login after a short delay
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            }
        } catch (error: any) {
            alert(error.toString());
            return;
        }
    };

    return (
        <main className="container-fluid py-5 text-center">
            <div className="auth-container register-container">
                <form onSubmit={doRegistration}>
                    <div className="mb-3">
                        <input 
                            id="email" 
                            autoComplete="off" 
                            autoFocus 
                            className="form-control mx-auto w-auto" 
                            name="email"
                            placeholder="Email" 
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                            id="first" 
                            autoComplete="off" 
                            className="form-control mx-auto w-auto" 
                            name="first"
                            placeholder="First Name" 
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                            id="last" 
                            autoComplete="off" 
                            className="form-control mx-auto w-auto" 
                            name="last"
                            placeholder="Last Name" 
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                            id="phone" 
                            className="form-control mx-auto w-auto" 
                            name="phone"
                            placeholder="Number (000-000-0000)" 
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                            id="password" 
                            className="form-control mx-auto w-auto" 
                            name="password"
                            placeholder="Password" 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                            id="confirmation" 
                            className="form-control mx-auto w-auto" 
                            name="confirmation"
                            placeholder="Confirm Password" 
                            type="password"
                            value={confirmation}
                            onChange={(e) => setConfirmation(e.target.value)}
                        />
                    </div>
                    <button 
                        id="registerButton" 
                        className="btn btn-primary" 
                        type="button" 
                        onClick={doRegistration}
                    >
                        Register
                    </button>
                    <span id="registrationResult" className={message.includes('successful') ? 'text-success' : 'text-danger'}>
                        {message}
                    </span>
                </form>
            </div>
        </main>
    );
}

export default Register;

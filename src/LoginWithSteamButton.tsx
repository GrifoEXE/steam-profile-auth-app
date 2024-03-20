import React from 'react';
import './LoginWithSteamButton.css'

const LoginWithSteamButton: React.FC = () => {
    const handleLogin = () => {
        window.location.href = `https://steamcommunity.com/openid/login?openid.mode=checkid_setup&openid.return_to=${window.location.origin}/auth&openid.realm=${window.location.origin}&openid.ns=http://specs.openid.net/auth/2.0&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select`;
    };

    return (
        <div className="login-container">
            <h2>Entre na sua conta</h2>
            <button onClick={handleLogin}>
                Login with Steam
            </button>
        </div>

    );
};

export default LoginWithSteamButton;

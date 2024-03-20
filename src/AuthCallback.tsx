/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AuthCallback.css'

const AuthCallback: React.FC = () => {
    const [userData, setUserData] = useState<any>(null);
    const [userGames, setUserGames] = useState<any>(null);
    const [recentGames, setRecentGames] = useState<any>(null)

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const steamid = urlParams.get('openid.identity')?.split('/').pop();

        if (steamid) {
            //set User Data
            axios.get(`http://localhost:5000/api/user?steamid=${steamid}`)
                .then(response => {
                    if (response.data.response && response.data.response.players && response.data.response.players.length > 0) {
                        setUserData(response.data.response.players[0]);
                    } else {
                        console.error('Perfil não encontrado.');
                    }
                })
                .catch(error => {
                    console.error(error);
                });
            //set User Games
            axios.get(`http://localhost:5000/api/allGames?steamid=${steamid}`)
                .then(response => {
                    setUserGames(response.data.response)
                })
                .catch(error => {
                    console.error(error);
                });
            //set Recent Games
            axios.get(`http://localhost:5000/api/recentGames?steamid=${steamid}`)
                .then(response => {
                    setRecentGames(response.data.response)
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, []);

    if (!userData || !userGames) {
        return <div>Autenticando Login via Steam...</div>;
    }

    return (
        <div className='App'>
            <div className="profile-card">
                <img src={userData.avatarfull} alt="Avatar" className="profile-picture" />
                <div className="user-info">
                    <h1>Perfil de {userData.personaname}</h1>
                    <p><b>Total de Jogos: </b>{userGames.game_count}</p>
                    <p><b>Steam ID: </b>{userData.steamid}</p>
                    <p><a href={userData.profileurl}>Exibir na Steam</a></p>
                </div>
            </div>
            <h2>Jogados Recentemente</h2>
            <div className='games-showcase'>
                <div className='game-card'>
                    <img className='game-header' src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${recentGames.games[0].appid}/header.jpg`} />
                    <p>
                        <h3>{recentGames.games[0].name}</h3>
                        <a>{(recentGames.games[0].playtime_forever / 60).toFixed(1)} Horas </a>
                    </p>
                </div>
                <div className='game-card'>
                    <img className='game-header' src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${recentGames.games[1].appid}/header.jpg`} />
                    <p>
                        <h3>{recentGames.games[1].name}</h3>
                        <a>{(recentGames.games[1].playtime_forever / 60).toFixed(1)} Horas </a>
                    </p>
                </div>
                <div className='game-card'>
                    <img className='game-header' src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${recentGames.games[2].appid}/header.jpg`} />
                    <p>
                        <h3>{recentGames.games[2].name}</h3>
                        <a>{(recentGames.games[2].playtime_forever / 60).toFixed(1)} Horas </a>
                    </p>
                </div>
                <div className='game-card'>
                    <img className='game-header' src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${recentGames.games[3].appid}/header.jpg`} />
                    <p>
                        <h3>{recentGames.games[3].name}</h3>
                        <a>{(recentGames.games[3].playtime_forever / 60).toFixed(1)} Horas </a>
                    </p>
                </div>
                <div className='game-card'>
                    <img className='game-header' src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${recentGames.games[4].appid}/header.jpg`} />
                    <p>
                        <h3>{recentGames.games[4].name}</h3>
                        <a>{(recentGames.games[4].playtime_forever / 60).toFixed(1)} Horas </a>
                    </p>
                </div>

            </div>

        </div>

    );
};

export default AuthCallback;

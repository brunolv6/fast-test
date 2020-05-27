import React, { useEffect, useState } from 'react';

import api from './services/api'

import './App.css';

import Header from './components/Header'

export default function App () {

    const [friends, setFriends] = useState([]);

    useEffect(() => {
        api.get('/friends').then(results => 
            setFriends(results.data)
        )
    }, [])

    // sem async e await ele ja vai rodando tudo e não espera retorno da API
    async function handleAddFriend(){
        const result = await api.post('/friends', {
            name: `Nome do IA`,
            nivel: "5"
        })
        
        const friend = result.data;

        console.log(result);
        setFriends([...friends, friend]);
    }

    return(
        <>
            <Header title="Alguma propriedade">
                {friends.map(friend => <li key={friend.id}>{friend.name} tem nível {friend.nivel}</li>)}
            </Header>
            <button type="type" onClick={handleAddFriend}>Adicionar Amigo</button>
        </>
    )
}
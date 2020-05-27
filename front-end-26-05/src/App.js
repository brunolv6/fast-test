import React, { useState, useEffect } from 'react';

import './App.css'

import api from './services/api'

import Header from './components/Header'

function App () {

    const [ users, setUsers ] = useState([])

    useEffect(() => {
        api.get('/teste').then(response => {
            setUsers(response.data)
        })
    }, [])

    async function handleAddUser () {
        const response = await api.post('/teste', {
            title: `Novo AI ${Date.now()}`,
            idade: '22'
        });

        const user = response.data;

        setUsers([...users, user]);
    }

    return(
        <>
        <Header number="1">
            <ul>
                {users.map(user => <li key={user.id}>{user.title} tem {user.idade}anos</li>)}
            </ul>
        </Header>
        <button type='type' onClick={handleAddUser}>Adicione novo usuário</button>
        <h1>Hello React App test</h1>
        <Header number="2">
            <ul>
                <li>Rosa</li>
                <li>Roxo</li>
            </ul>
        </Header>
        </>
    )
}

export default App;
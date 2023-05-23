import React, { useContext } from 'react';
import {UserContext, UserContextProps} from '../../context/UserContext';

export function Check() {
    const { user, logout } = useContext(UserContext) as UserContextProps;

    // Sprawdzanie czy użytkownik jest zalogowany
    if (!user) {
        return <div>Nie jesteś zalogowany.</div>;
    }

    // Sprawdzanie roli użytkownika
    if (user.role === 'doctor') {
        return (
            <div>
                Jesteś zalogowany jako lekarz.
                <br />
                Nazwa użytkownika: {user.login}
                Rola: {user.role}
                <br />
                <button onClick={logout}>Wyloguj</button>
            </div>
        );
    } else {
        return (
            <div>
                Jesteś zalogowany jako użytkownik.
                <br />
                Nazwa użytkownika: {user.login}
                Rola: {user.role}
                <br />
                <button onClick={logout}>Wyloguj</button>
            </div>
        );
    }
}

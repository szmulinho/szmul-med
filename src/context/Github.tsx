import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {User} from "../data/users";
import { GithubUser } from '../data/github';
import { Doctor } from '../data/doctors';


export interface GitHubUserContextProps {
    user: GithubUser | null;
    doctor: GithubUser | null;
    githubUser: GithubUser | null;
    setGithubUser: React.Dispatch<React.SetStateAction<GithubUser | null>>;
    login: (githubUserData: GithubUser) => void;
    handleCallback: (code: string) => void;
    handleLogout: () => void;
}

export const GitHubUserContext = createContext<GitHubUserContextProps | null>(null);

export function GithubUserContextProvider({ children }: { children: ReactNode }) {
    const navigate = useNavigate();
    const [githubUser, setGithubUser] = useState<GithubUser | null>(() => {
        const storedGithubUser = localStorage.getItem('githubUser');
        return storedGithubUser ? JSON.parse(storedGithubUser) : null;
    });
    const [doctor, setDoctor] = useState<GithubUser | null>(() => {
        const storedGithubUser = localStorage.getItem('doctor');
        return storedGithubUser ? JSON.parse(storedGithubUser) : null;
    });
    const [user, setUser] = useState<GithubUser | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

    const fetchData = async (code: string) => {
        try {
            const response = await axios.get(`https://szmul-med-github-login.onrender.com/callback?code=${code}`);
            if (response.status === 200) {
                const githubUserData: GithubUser = response.data;
                localStorage.setItem('githubUser', JSON.stringify(githubUserData));
                setGithubUser(githubUserData);
                setLoggedIn(true);
            } else {
                console.error('Invalid response status:', response.status);
                console.error('Response data:', response.data);
            }
        } catch (error) {
            console.error('Error occurred while fetching data:', error);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            fetchData(code);
        } else {
            console.error('Code not found in URL parameters.');
        }
    }, []); // Empty dependency array ensures this effect runs once, similar to componentDidMount

    const login = (githubUserData: GithubUser) => {
        setGithubUser(githubUserData);
        setLoggedIn(true);
        localStorage.setItem('githubUser', JSON.stringify(githubUserData));
    };

    const handleLogout = () => {
        setGithubUser(null);
        localStorage.removeItem('githubUser');
        navigate('/login');
    };

    const handleCallback = async (code: string) => {
        fetchData(code);
        navigate('/githubprofile');
    };

    return (
        <GitHubUserContext.Provider value={{ user ,doctor, githubUser, setGithubUser, login, handleCallback, handleLogout }}>
            {children}
        </GitHubUserContext.Provider>
    );
};
import React, {ReactNode, useContext} from "react";
import {DoctorContext} from "../../context/DoctorContext";
import {useNavigate} from "react-router-dom";
import {GitHubUserContext} from "../../context/Github";

interface SecureRouteProps {
    children: ReactNode;
}

export function SecureRoute({ children }: SecureRouteProps) {
    const doctorContext = useContext(DoctorContext);
    const navigate = useNavigate();
    const githubUserContext = useContext(GitHubUserContext);


    const isDoctor = doctorContext && doctorContext.doctor && doctorContext.doctor.role === 'doctor';
    const isGithubUser = githubUserContext && githubUserContext.githubUser && githubUserContext.githubUser.role === 'doctor';

    if (!isDoctor || !isGithubUser) {
        navigate('/login');
        return null;
    }

    return <>{children}</>;
}
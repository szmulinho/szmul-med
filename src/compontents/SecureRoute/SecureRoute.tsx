import React, { ReactNode, useContext } from "react";
import { DoctorContext, DoctorContextProps } from "../../context/DoctorContext";
import { useNavigate } from "react-router-dom";
import { GitHubUserContext, GitHubUserContextProps } from "../../context/Github";

interface SecureRouteProps {
    children: ReactNode;
}

export function SecureRoute({ children }: SecureRouteProps) {
    const { doctor } = useContext(DoctorContext) as DoctorContextProps;
    const { githubUser } = useContext(GitHubUserContext) as GitHubUserContextProps;
    const navigate = useNavigate();

    // Check if the user has the 'doctor' role in either context
    if (!(doctor && doctor.role === 'doctor') && !(githubUser && githubUser.role === 'doctor')) {
        // Redirect to the unauthorized route or show an unauthorized message
        navigate('/'); // Change '/unauthorized' to the desired unauthorized route
        // You can also render a message or component instead of redirecting
        return <div>You are not authorized to access this route.</div>;
    }

    // If the user has the expected roles, render the children
    return <>{children}</>;
}

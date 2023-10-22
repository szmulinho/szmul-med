import { GithubUserProfile } from "../../compontents/GithubUsers/GithubUserProfile";
import LoginGithub from "../../compontents/GithubUsers/LoginGithub";

export function GithubUserProf() {
    const token = localStorage.getItem(`token`);

    return (
        <div className="d-flex" >
            {token ? <GithubUserProfile />: <LoginGithub />}

        </div>
    )}
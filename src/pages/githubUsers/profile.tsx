import { GithubUserProfile } from "../../compontents/GithubUsers/GithubUserProfile";

export function GithubUserProf() {
    const token = localStorage.getItem(`token`);

    return (
        <div className="d-flex" >
          <GithubUserProfile />

        </div>
    )}
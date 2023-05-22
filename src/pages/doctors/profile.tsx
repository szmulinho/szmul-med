import { DocLog } from "../../compontents/Doctors/DocLog";
import { UserProfile } from "../../compontents/Doctors/UserProfile";
import {NavbarCl} from "../../compontents/Navbar/NavbarCl";

export function Profile() {
    const token = localStorage.getItem(`token`);

    return (
        <div>
            <NavbarCl />
            {token ? <UserProfile /> : <DocLog />}
        </div>
    )}
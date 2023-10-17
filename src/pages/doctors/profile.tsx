import { DoctorLogin } from "../../compontents/Doctors/DocLog";
import { DoctorProfile } from "../../compontents/Doctors/DoctorProfile";

export function Profile() {
    const token = localStorage.getItem(`token`);

    return (
        <div className="d-flex" >
            {token ? <DoctorProfile /> : <DoctorLogin />}

        </div>
    )}
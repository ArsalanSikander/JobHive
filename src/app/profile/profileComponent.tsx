'use client'
import { logout } from "../actions/auth";

interface ProfilePageProps {
    role: String | unknown
}

const ProfilePage: React.FC<ProfilePageProps> = ({ role }) => {

    if (role === "Jobseeker") {
        return (
            <>
                <p>Jobseeker's Dashboard</p>
                <form action={logout}>
                    <button type="submit">Logout</button>
                </form>
            </>
        )
    }

    return (
        <>
            <p>This is the dashboard for all users</p>
            <form action={logout}>
                <button type="submit">Logout</button>
            </form>
        </>
    )
}

export default ProfilePage;
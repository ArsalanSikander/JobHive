'use client'
import { logout } from "../actions/auth";

const ProfilePage = () => {

    return (
        <>
            <p>This is the dashboard for all users.</p>
            <form action={logout}>
                <button type="submit">Logout</button>
            </form>
        </>
    )
}

export default ProfilePage;
'use server'
import { redirect } from "next/navigation";
import { verifySession } from "../lib/dal";
import ProfilePage from "./profileComponent";

async function page() {
    const session = await verifySession();
    if (session) {
        if (session.role !== 'Jobseeker' && session.role !== 'Company/Recruiter') {
            // User is authenticated but does not have the right permissions
            redirect('/error');
        }
    }
    return(
        <>
            <ProfilePage role={session.role}/>
        </>
    )
}

export default page;
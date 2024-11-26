import { redirect } from "next/navigation";    
import { createClient } from "../login/serverLogin";
import { logout } from "../login/actions";

export default async function PrivatePage() {
    const supabase = createClient();

    const {data, error} = await supabase.auth.getUser();
    if(error || !data?.user){
        redirect('/login');
    }

    return (
        <div>
            <h1>Youre logged in as: {data.user.email}</h1>
            <form>
                <button formAction={logout}>Logout</button>
            </form>
        </div>
    )
}

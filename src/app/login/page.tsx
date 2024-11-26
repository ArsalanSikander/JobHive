import { login } from "./actions"
import { createClient } from "./serverLogin";
import { redirect } from "next/navigation";

export default async function Page() {

    const supabase = createClient();

    const {data, error} = await supabase.auth.getUser();
    if(data.user){
        redirect('/private');
    }

    return (
        <div>
            <p>This is the login page</p>
            <form>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" required />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password"  required/>
                <button formAction={login}>Login</button>
            </form>
        </div>
    )
}
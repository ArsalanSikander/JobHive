import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient(){
    const cookieStore = cookies();

    return createServerClient(
        process.env.NEXT_SUPABASE_URL!,
        process.env.NEXT_SUPABASE_KEY!,
        {
            cookies : {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try{
                        cookiesToSet.forEach( ({name, value, options}) => {
                            cookieStore.set(name,value,options);
                        })
                    }
                    catch{
                        // nothing here on documentation
                    }
                },
            },
        }
    )
}
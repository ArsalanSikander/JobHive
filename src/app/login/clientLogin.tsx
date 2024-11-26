import { createBrowserClient } from "@supabase/ssr";

export default function clientLogin() {
    return createBrowserClient(
        process.env.NEXT_SUPABASE_URL!,
        process.env.NEXT_SUPABASE_KEY!,
    )
}
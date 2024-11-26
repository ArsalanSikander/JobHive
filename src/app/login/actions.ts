'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "./serverLogin";

export async function login (formData: FormData){
    const supabase = createClient();

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const {error} = await supabase.auth.signInWithPassword(data);

    if(error){
        redirect('/error');
    }

    revalidatePath('/private', 'layout');
    redirect('/private');

}

export async function logout(formData: FormData){
    const supabase = createClient();
    const {error} = await supabase.auth.signOut();
    if(error){
        redirect('error');
    }
    redirect('/login')
}

export async function signUp (formData: FormData){
    const supabase = createClient();

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const {error} = await supabase.auth.signUp(data);

    if(error){
        redirect('/error');
    }

    revalidatePath('/', 'layout');
    redirect('/');

}
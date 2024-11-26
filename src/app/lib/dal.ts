import 'server-only'
import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { findUserForSession } from '../utils/db';

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie);

    if(!session?.userId){
        redirect('/nlogin');
    }

    return { isAuth: true, userId: session.userId, role: session.role}
})


export const getUser = cache(async () => {
    const session = await verifySession();
    if (!session) return null;

    try{
        // call a function where it returns the user?
        const data = await findUserForSession();
        const user = data[0];
        return user;
    }
    catch(error){
        console.log('Failed to fetch user.');
        return null;
    }
});


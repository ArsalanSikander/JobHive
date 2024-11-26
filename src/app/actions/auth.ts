'use server'
import { redirect } from "next/navigation";
import { FormState, SignupFormSchema, SigninFormSchema } from "../lib/definitions";
import { addUser, doesUserExist, getUserIdRole } from "../utils/db";
import { createSession, deleteSession } from "../lib/session";

export async function signup(state: FormState, formData: FormData) {

    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        role: formData.get('role'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }


    // 2. Prepare data for insertion into database
    const { name, role, email, password } = validatedFields.data
    // e.g. Hash the user's password before storing it
    const hashedPassword = password;

    // 3. Insert the user into the database or call an Auth Library's API

    const data = await addUser(name, role, email, hashedPassword);

    const user = data[0];
    console.log("This is the user who just got registered: " + user.id + " | " + user.role);

    // session management

    createSession(user.id, user.role);
    // 5. Redirect user
    redirect('/profile');

}

export async function signin(formData: FormData) {

    console.log("Entered Signin method");

    const validatedFields = SigninFormSchema.safeParse({
        email: formData.get('userEmail'),
        password: formData.get('userPassword'),
    });

    console.log("Got the fields??");

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        console.log("Some error is there!: " + validatedFields.error.flatten().fieldErrors);
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }
    else {
        console.log("Validated fields!!");
    }


    // if user exists, create their session
    const { email } = validatedFields.data;
    console.log("Giving a request to DB");
    const response = await doesUserExist(email); // contains userId and role

    if (response.length === 1) {
        console.log("The user clearly exists!");
        const userData = await getUserIdRole(email);
        console.log("Their id and role is: " + userData[0].id + ' and ' + userData[0].role);
        createSession(userData[0].id, userData[0].role);
        redirect('/profile');
    }
    else {
        console.log("This user does not currently have an account!");
    }

}

export async function logout() {
    const res = await deleteSession();
    return 'Logged out';
}
'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { signin, signup } from '@/app/actions/auth'
import styles from './page.module.css';

export default function SignupForm() {
  const [state, action] = useFormState(signup, undefined)

  return (
    <>
      <form action={action}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" placeholder="Name" />
        </div>
        {state?.errors?.name && <p>{state.errors.name}</p>}

        <div>
          <label htmlFor="role">Role</label><br />
          <div className={styles.choice}>
            <label htmlFor="">Company / Recruiter</label>
            <input type="radio" name='role' value="Company/Recruiter" />
          </div>
          <div className={styles.choice}>
            <label htmlFor="">Jobseeker</label>
            <input type="radio" name='role' value="Jobseeker" />
          </div>
          <div className={styles.choice}>
            <label htmlFor="">Freelancer</label>
            <input type="radio" name='role' value="Freelancer" />
          </div>
          <div className={styles.choice}>
            <label htmlFor="">Client</label>
            <input type="radio" name='role' value="Client" />
          </div>
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" placeholder="Email" />
        </div>
        {state?.errors?.email && <p>{state.errors.email}</p>}

        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
        </div>
        {state?.errors?.password && (
          <div>
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
        <SubmitButton />
      </form>
      <div>Separator</div>
      <form action={signin}>
        <div>
          <label htmlFor="userEmail">User Email: </label>
          <input type="email" name="userEmail" id="ue" />
          {state?.errors?.email && <p>{state.errors.email}</p>}
        </div>
        <div>
          <label htmlFor="userPassword">Password: </label>
          <input type="password" name="userPassword" id="up" />
          {state?.errors?.password && (
          <div>
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button disabled={pending} type="submit">
      Sign Up
    </button>
  )
}
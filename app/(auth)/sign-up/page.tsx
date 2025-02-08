import AuthForm from '@/components/AuthForm'
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { Section } from 'lucide-react'
import React from 'react'

const SignUp = async () => {
  const loggedInUser = await getLoggedInUser();

  console.log(loggedInUser)

  return (
    <section className='flex-center size-full max-sm:px-6'>
      <AuthForm  type='sign-up'/>
    </section>
  )
}

export default SignUp
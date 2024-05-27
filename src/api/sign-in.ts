import { api } from '@/lib/axios'

type SignInBody = {
  email: string
}

export async function signIn({ email }: SignInBody): Promise<void> {
  await api.post('/authenticate', { email })
}

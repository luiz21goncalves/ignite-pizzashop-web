import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInFormSchema = z.object({
  email: z.string().email(),
})

type SignInFormaData = z.infer<typeof signInFormSchema>

export function SignIn() {
  const [t] = useTranslation('translations', { keyPrefix: 'pages.sign-in' })
  const [searchParams] = useSearchParams()
  const { mutateAsync: authenticate } = useMutation({ mutationFn: signIn })
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInFormaData>({
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  async function handleSignIn({ email }: SignInFormaData) {
    await authenticate(
      { email },
      {
        onError: () => {
          toast.error(t('feedback.toast.error'))
        },
        onSuccess: () => {
          toast.success(t('feedback.toast.success'), {
            action: {
              label: 'Reenviar',
              onClick: () => handleSignIn({ email }),
            },
          })
        },
      },
    )
  }

  return (
    <>
      <Helmet title="Login" />

      <div className="p-8">
        <Button asChild className="absolute right-8 top-8" variant="ghost">
          <Link to="/sign-up">{t('sign-up-link')}</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {t('heading')}
            </h1>
            <p className="text-sm text-muted-foreground">{t('description')}</p>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('form.input')}</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {t('form.button')}
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

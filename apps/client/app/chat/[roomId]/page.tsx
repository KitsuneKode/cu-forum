import { headers } from 'next/headers'
import { auth } from '@cu-forum/auth/server'
import { Button } from '@cu-forum/ui/components/button'
import { Textarea } from '@cu-forum/ui/components/textarea'

export default async function ChatPage() {
  const handleSubmit = async () => {
    'use server'
    // const authC = await auth.api.verifyEmailOTP({
    //   body: {
    //     email: '22BAI71220@cuchd.in',
    //     otp: '211766',
    //   },
    //   headers: await headers(),
    // }).catch((e) => {
    //   console.error(e.message)
    // })
    // const authC1 = await auth.api.sendVerificationOTP({
    //   body: {
    //     email: '22BAI71220@cuchd.in',
    //     type: 'email-verification',
    //   },
    //   headers: await headers(),
    // })
    // console.log(authC)
    // console.log(authC1)
  }

  return (
    <form action={handleSubmit}>
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        chat page
        <Button>Send</Button>
        <div className="flex h-full w-full flex-col items-center justify-center">
          <Button type="submit">Verify</Button>
        </div>
        <Textarea />
      </div>
    </form>
  )
}

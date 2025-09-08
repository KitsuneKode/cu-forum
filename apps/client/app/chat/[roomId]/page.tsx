import { fetchMutation } from 'convex/nextjs'
import { api, getToken } from '@cu-forum/convex/index'
import { createAuth } from '@cu-forum/convex/lib/auth'
import { Button } from '@cu-forum/ui/components/button'
import { Textarea } from '@cu-forum/ui/components/textarea'

export default async function ChatPage() {
  const handleSubmit = async () => {
    'use server'
    const token = await getToken(createAuth)
    const image = '/avatars/image.png'
    const response = await fetchMutation(
      api.auth.myFunction,
      { image },
      {
        token,
      },
    ).catch((e) => {
      console.log(e)
    })
    console.log(response)
  }

  return (
    <form action={handleSubmit}>
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        chat page
        <Button>Send</Button>
        <div className="flex h-full w-full flex-col items-center justify-center">
          <Button type="submit">Change Image</Button>
        </div>
        <Textarea />
      </div>
    </form>
  )
}

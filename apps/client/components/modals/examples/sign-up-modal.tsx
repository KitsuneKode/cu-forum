'use client'

import SignUp from '@/components/signup'
import { cn } from '@cu-forum/ui/lib/utils'
import { Button } from '@cu-forum/ui/components/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@cu-forum/ui/components/dialog'

interface Props {
  children: React.ReactNode
}

const SignUpModal = ({ children }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-background w-sm max-w-sm border-0 p-0 shadow-none">
        <DialogTitle className="hidden"></DialogTitle>
        <SignUp />
      </DialogContent>
    </Dialog>
  )
}

export default SignUpModal

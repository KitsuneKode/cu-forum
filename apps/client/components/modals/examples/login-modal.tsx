'use client'

import Login from '@/components/login'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@cu-forum/ui/components/dialog'

const LoginModal = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-background w-sm max-w-sm border-0 p-0 shadow-none">
        <DialogTitle className="hidden"></DialogTitle>
        <Login />
      </DialogContent>
    </Dialog>
  )
}

export default LoginModal

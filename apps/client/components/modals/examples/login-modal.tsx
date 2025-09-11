'use client'

import Login from '@/components/login'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@cu-forum/ui/components/dialog'

import { useLoginModal } from '@/store/use-login-modal'
const LoginModal = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, close } = useLoginModal()

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      {children}
      <DialogContent className="bg-background w-sm max-w-sm border-0 p-0 shadow-none">
        <DialogTitle className="hidden"></DialogTitle>
        <Login modal />
      </DialogContent>
    </Dialog>
  )
}

export default LoginModal

'use client'

import SignUp from '@/components/signup'
import { useSignUpModal } from '@/store/use-sign-up-modal '
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@cu-forum/ui/components/dialog'

interface Props {
  children: React.ReactNode
}

const SignUpModal = ({ children }: Props) => {
  const { isOpen, close } = useSignUpModal()
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <>{children}</>
      <DialogContent className="bg-background w-sm max-w-sm border-0 p-0 shadow-none">
        <DialogTitle className="hidden"></DialogTitle>
        <SignUp modal />
      </DialogContent>
    </Dialog>
  )
}

export default SignUpModal

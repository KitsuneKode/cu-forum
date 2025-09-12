'use client'
import { useState } from 'react'
import Login from '@/components/login'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@cu-forum/ui/components/dialog'

export default function LoginModal() {
  const [open, setOpen] = useState(true)

  const router = useRouter()
  const onOpenChange = (open: boolean) => {
    setOpen(open)
    router.back()
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background w-sm max-w-sm border-0 p-0 shadow-none">
        <DialogTitle className="hidden"></DialogTitle>
        <Login modal />
      </DialogContent>
    </Dialog>
  )
}

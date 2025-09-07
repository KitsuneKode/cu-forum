import { Loader } from 'lucide-react'

const Loading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Loader size={24} className="h-5 w-5 animate-spin" />
    </div>
  )
}
export default Loading

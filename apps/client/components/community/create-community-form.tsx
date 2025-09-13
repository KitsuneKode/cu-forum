'use client'

import type React from 'react'

import { useTRPC } from '@/trpc/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useDebounce from '@/hooks/use-debounce'
import { authClient } from '@cu-forum/auth/client'
import { Input } from '@cu-forum/ui/components/input'
import { Label } from '@cu-forum/ui/components/label'
import { toast } from '@cu-forum/ui/components/sonner'
import { Button } from '@cu-forum/ui/components/button'
import { Textarea } from '@cu-forum/ui/components/textarea'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Separator } from '@cu-forum/ui/components/separator'
import { Check, Loader, Loader2, Skull, Users, X } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@cu-forum/ui/components/card'

export function CreateCommunityForm() {
  const [communityName, setCommunityName] = useState('')
  const [description, setDescription] = useState('')
  const { data: session, isPending: sessionPending } = authClient.useSession()

  const router = useRouter()

  const api = useTRPC()

  useEffect(() => {
    if (!session && !sessionPending) {
      toast.error('You must be logged in to create a community.')
      router.push('/login')
    }
  }, [router, session, sessionPending])

  const debouncedCommunityName = useDebounce(communityName, 300)

  const {
    data,
    isLoading,
    error: communityNameError,
  } = useQuery(
    api.community.isCommunityNameAvailable.queryOptions(
      {
        communityName: debouncedCommunityName.trim(),
      },
      {
        enabled: debouncedCommunityName.trim().length > 2,
      },
    ),
  )

  const communityNameAvailable = !data

  const { mutateAsync: createCommunity, isPending } = useMutation(
    api.community.createCommunity.mutationOptions(),
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!session) {
      toast.error('You must be logged in to create a community.')
      router.push('/login')
      return
    }

    if (!communityNameAvailable || communityNameError || isLoading) {
      toast.error('Community name is not available.')
      return
    }
    await createCommunity(
      {
        name: debouncedCommunityName.trim(),
        description: description.trim(),
      },
      {
        onError(error) {
          console.error(error)
          toast.error('Failed to create community. Please try again.')
        },

        onSuccess: (ctx) => {
          toast.success('Community created successfully.')
          router.push(`/cu/${ctx.name}`)
        },
      },
    )
  }

  const formatCommunityName = (name: string) => {
    // Remove any characters that aren't letters, numbers, or underscores
    let formatted = name.replace(/[^a-zA-Z0-9_.]/g, '')

    // Remove consecutive underscores
    formatted = formatted.replace(/_+/g, '_')

    // Remove leading underscores
    formatted = formatted.replace(/^_+/, '')

    // Remove trailing underscores
    // formatted = formatted.replace(/_+$/, '')

    // Ensure it doesn't exceed 21 characters
    formatted = formatted.slice(0, 21)

    return formatted
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-6 w-6" />
            <span>Create a Community</span>
          </CardTitle>
          <CardDescription>
            Build and grow a community about something you care about.
            Communities are spaces for people with shared interests to connect
            and discuss.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Community Name</Label>
              <div className="relative">
                <span className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-3">
                  cu/
                </span>
                <Separator
                  orientation="vertical"
                  className="absolute left-11 top-1/2 h-2 w-6 -translate-y-4"
                />
                <div className="flex items-center gap-2">
                  <Input
                    id="name"
                    placeholder="awesomecommunity"
                    value={communityName}
                    onChange={(e) =>
                      setCommunityName(formatCommunityName(e.target.value))
                    }
                    className="pl-13"
                    maxLength={21}
                    minLength={3}
                    required
                  />
                  <div className="flex items-center gap-4">
                    {isLoading && <Loader size={18} className="animate-spin" />}
                    {!isLoading &&
                      debouncedCommunityName.length > 2 &&
                      !communityNameError &&
                      communityNameAvailable && (
                        <Check className="text-green-500" size={18} />
                      )}
                    {debouncedCommunityName.length > 2 &&
                      !isLoading &&
                      !communityNameAvailable && (
                        <X className="text-red-500" size={18} />
                      )}
                    {debouncedCommunityName && communityNameError && (
                      <Skull className="text-red-500" size={18} />
                    )}
                  </div>
                </div>
              </div>
              <div className="overflow-hidden">
                <p className="text-muted-foreground break-words text-sm">
                  Community names including capitalization cannot be changed.
                </p>
                <p className="text-muted-foreground break-words text-sm">
                  <span className="font-lg text-primary font-semibold">
                    cu/{communityName || 'communityname'}
                  </span>
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Tell people what your community is about..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                maxLength={500}
                required
                className="resize-none"
              />
              <p className="text-muted-foreground min-h-[1.25rem] text-sm">
                <span className="font-mono">{description.length}/500</span>{' '}
                characters
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="mb-2 font-medium">Community Guidelines</h4>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>• Keep discussions respectful and on-topic</li>
                <li>• No spam, self-promotion, or duplicate posts</li>
                <li>• Follow platform-wide content policy</li>
                <li>• Moderators have final say on content decisions</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  isPending ||
                  !communityName ||
                  communityName.length < 3 ||
                  !description.trim()
                }
                className="flex-1"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Community'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

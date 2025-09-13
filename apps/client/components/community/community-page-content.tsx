'use client'

import Link from 'next/link'
import { useTRPC } from '@/trpc/client'
import { useState, useEffect } from 'react'
import { Loader2, Plus } from 'lucide-react'
import { Button } from '@cu-forum/ui/components/button'
import { usePathname, useRouter } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'
// import { Navbar } from '@cu-forum/ui/components/navbar'
// import { PostCard } from '@cu-forum/ui/components/post-card'
// import type { Community, Post, Vote } from '@cu-forum/common/types'
// import { fetchCommunity, fetchCommunityPosts } from '@cu-forum/lib/api'
import { Tabs, TabsList, TabsTrigger } from '@cu-forum/ui/components/tabs'

export default function CommunityPageContent() {
  //   useEffect(() => {
  //     if (!isAuthenticated) {
  //       router.push("/auth")
  //       return
  //     }

  //     const loadCommunityData = async () => {
  //       try {
  //         const [communityData, postsData] = await Promise.all([
  //           fetchCommunity(communityName),
  //           fetchCommunityPosts("1"), // Mock community ID
  //         ])

  //         if (!communityData) {
  //           router.push("/404")
  //           return
  //         }

  //         setCommunity(communityData)
  //         setPosts(postsData)
  //       } catch (error) {
  //         console.error("Failed to fetch community data:", error)
  //       } finally {
  //         setLoading(false)
  //       }
  //     }

  //     loadCommunityData()
  //   }, [communityName, isAuthenticated, router])

  //   const handleVoteUpdate = (postId: string, newVotes: Vote[]) => {
  //     setPosts((prevPosts) => prevPosts.map((post) => (post.id === postId ? { ...post, votes: newVotes } : post)))
  //   }

  //   const sortedPosts = [...posts].sort((a, b) => {
  //     switch (sortBy) {
  //       case "new":
  //         return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  //       case "top":
  //         const scoreA = a.votes.reduce((sum, vote) => sum + (vote.type === "UP" ? 1 : -1), 0)
  //         const scoreB = b.votes.reduce((sum, vote) => sum + (vote.type === "UP" ? 1 : -1), 0)
  //         return scoreB - scoreA
  //       case "hot":
  //       default:
  //         const now = Date.now()
  //         const hotScoreA = a.votes.length / Math.max(1, (now - new Date(a.createdAt).getTime()) / (1000 * 60 * 60))
  //         const hotScoreB = b.votes.length / Math.max(1, (now - new Date(b.createdAt).getTime()) / (1000 * 60 * 60))
  //         return hotScoreB - hotScoreA
  //     }
  //   })

  //   if (loading) {
  //     return (
  //       <div className="min-h-screen bg-background">
  //         <Navbar />
  //         <div className="flex items-center justify-center py-12">
  //           <Loader2 className="h-8 w-8 animate-spin" />
  //         </div>
  //       </div>
  //     )
  //   }

  //   if (!community) {
  //     return (
  //       <div className="min-h-screen bg-background">
  //         <Navbar />
  //         <div className="container mx-auto px-4 py-8 text-center">
  //           <h1 className="text-2xl font-bold mb-4">Community not found</h1>
  //           <p className="text-muted-foreground mb-6">The community you're looking for doesn't exist.</p>
  //           <Button asChild>
  //             <Link href="/feed">Back to Feed</Link>
  //           </Button>
  //         </div>
  //       </div>
  //     )
  //   }

  const pathName = usePathname()

  const api = useTRPC()
  const { data } = useSuspenseQuery(
    api.community.getCommunity.queryOptions({
      communityName: pathName.split('/').pop()!,
    }),
  )
  return (
    <div className="bg-background min-h-screen">
      {/* <Navbar /> */}
      {/* <CommunityHeader community={community} /> */}
      {JSON.stringify(data)}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Sort Tabs */}
            <Tabs
              value={'hot'}
              onValueChange={
                (value) => {}
                // setSortBy(value as 'hot' | 'new' | 'top')
              }
              className="mb-6"
            >
              <TabsList>
                <TabsTrigger value="hot">Hot</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
                <TabsTrigger value="top">Top</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Posts */}
            <div className="space-y-4">
              {/* {sortedPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onVoteUpdate={handleVoteUpdate}
                />
              ))}
              {sortedPosts.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    No posts in this community yet.
                  </p>
                  <Button asChild>
                    <Link
                      href={`/r/${community.name}/submit`}
                      className="flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Create the first post</span>
                    </Link>
                  </Button>
                </div>
              )} */}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* <CommunitySidebar community={community} /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

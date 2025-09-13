import { Loader } from 'lucide-react'
import React, { Suspense } from 'react'
import { HydrateClient } from '@/trpc/server'
import { prefetch, trpc } from '@/trpc/server'
import { ErrorBoundary } from 'react-error-boundary'
import { communityNameSchema } from '@cu-forum/common/types'
import CommunityPageContent from '@/components/community/community-page-content'
interface CommunityPageProps {
  params: Promise<{ community: string }>
}

const CommunityPage = async ({ params }: CommunityPageProps) => {
  const { community } = await params

  const parseCommunityName = communityNameSchema.safeParse(community)

  if (!parseCommunityName.success) {
    return <div>Community not found</div>
  }

  prefetch(
    trpc.community.getCommunity.queryOptions({
      communityName: parseCommunityName.data,
    }),
  )

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<Loader className="h-8 w-8 animate-spin" />}>
        <Suspense fallback={<Loader className="h-8 w-8 animate-spin" />}>
          <CommunityPageContent />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  )
}

export default CommunityPage

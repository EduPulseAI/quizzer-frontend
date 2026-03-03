import React from "react"
import { Thumbnail } from "@/components/thumbnail"
import { ThumbnailV2 } from "@/components/thumbnail-v2"
import { ThumbnailV3 } from "@/components/thumbnail-v3"
import { ThumbnailV4 } from "@/components/thumbnail-v4"

const VARIANTS: Record<string, React.ComponentType> = {
  "1": Thumbnail,
  "2": ThumbnailV2,
  "3": ThumbnailV3,
  "4": ThumbnailV4,
}

export default async function ThumbnailPage({
  searchParams,
}: {
  searchParams: Promise<{ v?: string }>
}) {
  const { v = "1" } = await searchParams
  const Component = VARIANTS[v] ?? Thumbnail

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <Component />
    </div>
  )
}

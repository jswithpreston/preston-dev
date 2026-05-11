import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import config from '@/payload.config'
import { ImportMap } from 'payload'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = async ({ params, searchParams }: Args) =>
  generatePageMetadata({ config, params, searchParams })

const Page = async ({ params, searchParams }: Args) => {
  const sanitizedConfig = await config
  return RootPage({
    config,
    params,
    searchParams,
    importMap: sanitizedConfig.admin.importMap as unknown as ImportMap
  })
}

export default Page

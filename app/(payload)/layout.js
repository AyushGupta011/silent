import '@payloadcms/next/css'
import configPromise from '@payload-config'
import { RootLayout } from '@payloadcms/next/layouts'
import { importMap } from './admin/importMap.js'
import { serverFunction } from './serverFunction.js'

export default function PayloadLayout({ children }) {
  return (
    <RootLayout config={configPromise} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}

'use server'

import { handleServerFunctions } from '@payloadcms/next/layouts'
import configPromise from '@payload-config'
import { importMap } from './admin/importMap.js'

export const serverFunction = async (args) => {
  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  })
}

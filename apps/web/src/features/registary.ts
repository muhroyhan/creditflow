// src/features/registry.ts
import { RiFileLine } from '@remixicon/react'
import { FC } from 'react'
import { CreditApplicationAddEditPage } from './credit_application/page/CreditApplicationAddEditPage'
import { CreditApplicationListingPage } from './credit_application/page/CreditApplicationListingPage'
import { CreditApplicationViewPage } from './credit_application/page/CreditApplicationViewPage'

// Define what a feature needs to render your generic pages
export interface FeatureConfig {
  name: string
  icon: any
  compnents: {
    Add?: FC
    Edit?: FC
    List?: FC
    View?: FC<{ id: string }>
  }
}

// Map the URL path (e.g., 'products') to its configuration
export const featureRegistry: Record<string, FeatureConfig> = {
  'credit-application': {
    name: 'Pengajuan Kredit',
    icon: RiFileLine,
    compnents: {
      Add: CreditApplicationAddEditPage,
      Edit: CreditApplicationAddEditPage,
      List: CreditApplicationListingPage,
      View: CreditApplicationViewPage,
    },
  },
}

export type FeatureKey = keyof typeof featureRegistry

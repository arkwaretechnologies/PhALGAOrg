import data from '@/data/past-presidents.json'

export type PastPresidentSocials = {
  twitter?: string
  facebook?: string
  instagram?: string
  linkedin?: string
}

export type PastPresident = {
  id: string
  name: string
  fiscalYear: string
  location: string
  image: string
  socials: PastPresidentSocials
  sortOrder: number
}

export function getPastPresidents(): PastPresident[] {
  return data as PastPresident[]
}

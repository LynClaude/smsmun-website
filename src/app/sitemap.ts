import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.smsmun.cn',
      lastModified: new Date(),
    },
  ]
}


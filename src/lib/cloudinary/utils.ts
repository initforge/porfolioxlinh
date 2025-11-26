import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dghawsj8e',
  api_key: process.env.CLOUDINARY_API_KEY || '872237255328765',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'AeKphmHpQi6c1sW2nIxOR_0mlz8',
})

export function getImageUrl(publicId: string, transformations?: Record<string, any>): string {
  return cloudinary.url(publicId, {
    secure: true,
    ...transformations,
  })
}


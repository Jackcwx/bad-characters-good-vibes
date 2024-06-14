export interface CloudinaryResult {
  event: string
  info: CloudinaryResultInfo
}

export interface CloudinaryResultInfo {
  public_id: string
  secure_url: string
}

export interface Uwconfig {
  cloudName: string
  uploadPreset: string
}

export interface ImageInfo {
  publicId: string
  secure_url: string
}

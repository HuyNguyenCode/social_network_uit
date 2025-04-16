import http from "@/utils/http"

interface ImageApiParam {
  file: File,
  upload_preset: string
}

const ImageApi = {
  postImage(body: ImageApiParam) {
    const formData = new FormData()
    formData.append('file', body.file)
    formData.append('upload_preset', body.upload_preset)
    return http.post('/v1_1/social_network_uit/image/upload', formData)
  },
}

export default ImageApi
import ImageKit from '@imagekit/nodejs'
import { config } from '../config/config.js'

const client = new ImageKit({
  publicKey: config.IMAGEKIT_PUBLIC_KEY,  
  privateKey: config.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
  urlEndpoint: config.IMAGEKIT_URL_ENDPOINT
});

export async function uploadFile({ buffer, fileName, folder = "/snitch" }) {
    const result = await client.files.upload({
        file: await ImageKit.toFile(buffer),
        fileName,
        folder
    })

    return {
        url: result.url
    }
    // console.log(result);
    
}


import { Client, Storage, ID } from "appwrite"
import config from "../config/config"

const URL = config.appwrite.appwriteUrl
const PROJECT_ID = config.appwrite.appwriteProjectId
const BUCKET_ID = config.appwrite.appwriteBucketId

export class BucketService {
    client = new Client()
    bucket

    constructor() {
        this.client.setEndpoint(URL).setProject(PROJECT_ID)
        this.bucket = new Storage(this.client)
    }

    async uploadFile(file) {
        try {
            console.log(BUCKET_ID,file)
            return await this.bucket.createFile(BUCKET_ID, ID.unique(), file)
        } catch (error) {
            console.log("Error in uploading user's bucket file:",error)
            return false
        }
    }

    async deleteFile(fileID){
        try {
            await this.bucket.deleteFile(BUCKET_ID,fileID)
            return true
        } catch (error) {
            console.log("Error in deleting user's bucket file:",error)
            return false
        }
    }

    getFilePreview(fileID){
        try {
            return this.bucket.getFilePreview(BUCKET_ID, fileID)
        } catch (error) {
            console.log("Error in getting user's bucket file preview:",error)
            return false
        }
    }
}

const bucketService = new BucketService()
export default bucketService
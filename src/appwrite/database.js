import { Client,Databases,Query } from "appwrite"
import config from "../config/config"

const URL = config.appwrite.appwriteUrl
const DATABASE_ID = config.appwrite.appwriteDatabaseId
const PROJECT_ID = config.appwrite.appwriteProjectId
const COLLECTION_ID = config.appwrite.appwriteCollectionId


export class DatabaseService{
    client = new Client()
    database

    constructor() {
        this.client.setEndpoint(URL).setProject(PROJECT_ID)
        this.database = new Databases(this.client)
    }

    async createPost({content,featuredImage,status,userId,title,slug}){
        try {
            console.log(content,featuredImage,status,userId,title,slug)
            return await this.database.createDocument(DATABASE_ID,COLLECTION_ID,slug,{content,featuredImage,status,userId,title})
        } catch (error) {
            console.log("Error in creating user's post:",error)
            throw error
        }
    }

    async deletePost(slug){
        try {
            await this.database.deleteDocument(DATABASE_ID,COLLECTION_ID,slug)
            return true
        } catch (error) {
            console.log("Error in deleting user's post:",error)
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.database.getDocument(DATABASE_ID,COLLECTION_ID,slug)
        } catch (error) {
            console.log("Error in getting user's post:",error)
            throw error
        }

    }

    async updatePost(slug,{content,featuredImage,status,userId,title}){
        try {
            return await this.database.updateDocument(DATABASE_ID,COLLECTION_ID,slug,{content,featuredImage,status,userId,title})
        } catch (error) {
            console.log("Error in updating user's post:",error)
            return false
        }
    }

    async getPosts(){
        try {
            return await this.database.listDocuments(DATABASE_ID,COLLECTION_ID,)
        } catch (error) {
            console.log("Error in getting active posts:",error)
            return false
        }
    }
}

const databaseService = new DatabaseService()
export default databaseService
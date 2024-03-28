import { Client, Account, ID } from "appwrite";
import config from "../config/config";

export class AuthenticationService{
    client = new Client()
    account

    constructor(){
        this.client.setEndpoint(config.appwrite.appwriteUrl).setProject(config.appwrite.appwriteProjectId) // Your API Endpoint.setProject('<PROJECT_ID>');
        this.account = new Account(this.client)
        console.log(this.client,this.account)
    }
    async registerUser({email,password,name}){  //destructuring the object passed
        try {
            const registerResponse = await this.account.create(ID.unique(),email,password,name)
            if(registerResponse){
                console.log("register response",registerResponse)
                return this.loginUser({email,password})
            }
            else{
                return registerResponse
            }
        } catch (error) {
            console.log("error in registering the user:",error)
        }
        return null
    }
    async loginUser({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            console.log("error in logging the user:",error)
        }
        return null
    }

    async logoutUser(){
        try {
            return await this.account.deleteSession('current')
        } catch (error) {
            console.log("error in logging out the user:",error)
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("error in getting the current user:",error)
        }    
        return null
    }
}

const authenticationService = new AuthenticationService()

export default authenticationService
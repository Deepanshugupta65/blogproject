import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);    
    }

    // account
    async createAccount({email,password,name}){
        try{
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            // if useraccount is exist then login 
            if(userAccount){
            //   call another method
            return this.login({email,password});
            }
            else{
                return userAccount;
            }
        }catch(error){
            throw error;
        }
    }
    // login
    async login({email,password}){
        try{
           return await this.account.createEmailSession(email,password);
        }
        catch(error){
            throw error;
        }
    }
    // login hain ya nahi , we are in home page
    async getCurrentUser(){
        try {
           return await this.account.get();
        } catch (error) {
            console.log("appwrite service",error)
        }
        return null;
    }
    // logout
    async logout(){
        try{
          return this.account.deleteSessions();
        }catch(error){
            console.log("error",error)
        }
    }
}

const authService = new AuthService();
export default authService;
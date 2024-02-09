import conf from "../conf/conf.js";
import { Client, ID , Databases, Storage,Query} from "appwrite";

export class Service{
   client = new Client();
   databases;
   bucket;
   constructor(){
    this.client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
   }
   async createPost({title,slug,content,featuredImage,status,userId}){
    try{
        return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId,
            }
        );
    }catch(error){
      console.log("appwrite service ",error)
    }
   }
   async updatePost(slug ,{title,content,featuredImage,status}){
    try {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
            }
        )
    } catch (error) {
      console.log("appwrite",error)  
    } 
   }

   async deletePost(slug){
    try {
        await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
        return true
    } catch (error) {
        console.log("errror",error);
        return false
    }
   }

   async getPost(slug){
    try {
        return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )

    } catch (error) {
        console.log('appwrite',error);
        return false;
    }
   }

//    for all doc 0r liist
    async getPosts(queries=[Query.equal("status","active")]){
          try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,

            )
          } catch (error) {
            console.log("appwrite",error)
            return false
          }
    }

    // file upload service / method
    async uploadFile(file,fileId=ID.unique()){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                fileId,
                file
            )
        } catch (error) {
            console.log("appwrite",error)
        }
    }
    // delete file
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("appwrite",error);
            return false
        }
    }

    // preive file
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    }
}


const service = new Service()

export default service
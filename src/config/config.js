const config = {
    appwrite:{
        appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL="https://cloud.appwrite.io/v1"),
        appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID="65f4111dc73c9cff7564"),
        appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID="65f4126f307c7e76b384"),
        appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID="65f4128bdc9e2ab88cb8"),
        appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID="65f417267ed65d8bd7c5"),
    }
}

export default config
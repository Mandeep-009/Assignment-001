import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';


export const uploadOnCloudinary = async (localfilepath) => {
    try {
        cloudinary.config({
            cloud_name: 'dpbmy09rz', 
            api_key: '973749879693444', 
            api_secret: 'HdfFBP9gO9O1tRhZNrwLZmtkUG4'
        })
        
        if(!localfilepath) return null;
        console.log(localfilepath,'line 13 cloudinary')
        const response = await cloudinary.uploader.upload(localfilepath)
        console.log(localfilepath)
        fs.unlinkSync(localfilepath)
        return response.url;
    } catch (error) {
        console.log(error)
        fs.unlinkSync(localfilepath)
        return 'error paaya gaya tha';
    }
}

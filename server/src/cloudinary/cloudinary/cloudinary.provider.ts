
import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CloudinaryProvider',
  useFactory: () => {   
    return cloudinary.config({ 
        cloud_name: 'dpjw4jihq', 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET
      });
  },
};


          

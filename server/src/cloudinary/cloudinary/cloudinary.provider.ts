
import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CloudinaryProvider',
  useFactory: () => {   
    return cloudinary.config({ 
        cloud_name: 'dpjw4jihq', 
        api_key: '557773761185323', 
        api_secret: 'fiz-nYpxaj3RYwuFVDF24kmVFpM' 
      });
  },
};


          

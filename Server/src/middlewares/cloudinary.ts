import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

// Configuration
cloudinary.config({ 
    cloud_name: 'dbqhtcgw3', 
    api_key: '117578775371622', 
    api_secret: 'S4xZKL4SRlCvjctSIG7asDWWNU4' 
  });

// Upload function for different file types
export const uploadFile = async (fileUrl: string, publicId: string, fileType: string): Promise<UploadApiResponse> => {
  try {
    let uploadOptions: any = { public_id: publicId };

    if (fileType === "image") {
      uploadOptions = { ...uploadOptions, resource_type: "image" };
    } else if (fileType === "video") {
      uploadOptions = { ...uploadOptions, resource_type: "video" };
    } else if (fileType === "file") {
      uploadOptions = { ...uploadOptions, resource_type: "raw" };
    }

    const result = await cloudinary.uploader.upload(fileUrl, uploadOptions);
    return result;
  } catch (err) {
    throw err;
  }
};


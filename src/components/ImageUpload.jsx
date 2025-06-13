
import { useState } from "react";
import axios from "axios";



export default function ImageUpload({ returnImage }) {

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);


    const handleImageUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const formData = new FormData()
        formData.append("file", file);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
        setLoading(true);
        try {
            const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, formData);
            setImageUrl(data.secure_url);
            returnImage(data.secure_url);
        } catch (error) {
            console.error("Cloudinary upload error:", error.message);
        }
        finally {
            setLoading(false);
        }
    }



    return (
        <div className="py-2 flex flex-col gap-5 w-full">
            <label className="text-lg font-semibold w-fit "><span className="bg-gray-500/10 w-20  border-gray-500 border-dashed border-2 p-3 rounded ">Upload Cover Image</span>
                <input type="file" onChange={handleImageUpload} className="hidden" />
            </label>
            <div>
                {loading && <p className="font-bold text-md text-blue-500">Uploading...</p>}
                {imageUrl && (
                    <div>
                        <h3 className="text-green-500 font-bold text-md mt-4">Image uploaded successfully!</h3>
                        <img src={imageUrl} alt="Preview" className="mt-1 max-w-sm rounded-md border border-gray-400" />
                    </div>
                )}
            </div>


        </div>
    )
}


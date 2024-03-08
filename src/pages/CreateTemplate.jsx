import React, { useState } from 'react'
import { FaTrash, FaUpload } from 'react-icons/fa6';
import { PuffLoader } from 'react-spinners';
import { toast } from 'react-toastify';

import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../config/firebase.config';
import { progress } from 'framer-motion';
import { initialTags } from '../utils/helpers';

const CreateTemplate = () => {
  const [formData, setFormData] = useState({
    title: "",
    imageURL: null
  });

  // handling the input field change
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevRec) => ({...prevRec, [name]: value }));
  }

  const [imageAsset, setImageAsset] = useState({
    isImageLoading : false,
    url : null,
    progress : 0
  });

  const [selectedTags, setSelectedTags] = useState([]);

  // handle the image file changes
  const handleFileSelect = async(e) => {
    setImageAsset((prevAsset) => ({...prevAsset, isImageLoading: true}));
    const file = e.target.files[0];

    if(file && isAllowed(file)){
      const storageRef = ref(storage, `Templates/${Date.now()}-${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setImageAsset((prevAsset) => ({
            ...prevAsset, 
            progress : (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          }))
        },
        (error) => {
          if(error.message.includes("storage/unauthorized")){
            toast.error(`Error : Authorization Revoked`)
          } else {
            toast.error(`Error: ${error.message}`)
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            setImageAsset((prevAsset) => ({
              ...prevAsset,
              url: downloadURL,
            }));
          });
          toast.success("Image uploaded!");
          setInterval(() => {
            setImageAsset((prevAsset) => ({
              ...prevAsset,
              isImageLoading: false,
            }));
            }, 2000);
          });
    } else {
      toast.info("Invalid File Format");
    }
  };

  const isAllowed = (file) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"]
    return allowedTypes.includes(file.type)
  }

  // to delete an image from the cloud
  const deleteAnImageObject = async () => {
    if (imageAsset.url) {
      const storageRef = ref(storage, imageAsset.url);
      deleteObject(storageRef)
        .then(() => {
          toast.success("Image removed!");
          setImageAsset((prevAsset) => ({
            ...prevAsset,
            progress: 0,
            url: null,
          }));
        })
        .catch((error) => {
          console.error("Error deleting image:", error);
          toast.error("Error deleting image. Please try again later.");
        });
    } else {
      toast.error("No image to delete.");
    }
  };

  const handleSelectedTags = (tag) => {
    // check if the tag is selected or not
    if (selectedTags.includes(tag)){
      // if selected then remove it
      setSelectedTags(selectedTags.filter(selected => selected != tag));
    }else{
      setSelectedTags([...selectedTags, tag]);
    }
  }


  return (
    <div className="w-full px-4 lg:px-10 2xl:px-32 py-4 grid grid-cols-1 lg:grid-cols-12">
      {/* left container */}
      <div className="col-span-12 lg:col-span-4 2xl:col-span-3 w-full flex-1 flex items-center justify-start flex-col gap-4 px-2">
        <div className="w-full">
          <p className="text-lg text-txtPrimary">Create a new Template</p>
        </div>

        {/* template ID section */}
        <div className="w-full flex items-center justify-end">
          <p className="text-base text-txtLight uppercase font-semibold">
            TEMP: {" "}
          </p>
          <p className="text-sm text-txtDark capitalize font-bold">
            TEMPLATE 1
          </p>
        </div>

        {/* template title section */}
        <input 
        className="w-full px-4 py-3 rounded-md bg-transparent border border-gray-300 text-txtPrimary focus:text-txtDark focus:shadow-md outline-nons"
        type="text" 
        name="title"
        placeholder="Template Title" 
        value={formData.title} 
        onChange={handleInputChange} 
        />

        {/* file uploader section */}
        <div className="w-full bg-gray-100 backdrop-blur-md h-[420px] lg:h-[620px] 2xl:h-[740px] rounded-md border-2 border-dotted border-gray-300 cursor-pointer flex items-center justify-center">
          {imageAsset.isImageLoading ? (
          <React.Fragment>
            <div className="flex flex-col items-center justify-center gap-4">
              <PuffLoader color="#498FCD" size ={40}/>
              <p>{imageAsset?.progress.toFixed(2)}%</p>
            </div>
          </React.Fragment>
          ) : (
          <React.Fragment>
            {!imageAsset?.url ? (
            <React.Fragment>
              <label className="w-full cursor-pointer h-full">
                <div className="flex flex-col items-center justify-center h-full w-full">
                  <div className="flex flex-col items-center justify-center cursor-pointer gap-4">
                      <FaUpload className="text-2xl" /> 
                      <p className="text-lg text-txtLight">Click to Upload</p>
                  </div>
                </div>

                <input
                  type="file"
                  className="w-0 h-0"
                  accept=".jpeg,.jpg,.png"
                  onChange={handleFileSelect}
                 />
              </label>
            </React.Fragment>
            ): (
              <React.Fragment>
                <div className="relative w-full h-full overflow-hidden rounded-md">
                  <img
                    src={imageAsset.url}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    alt="Image Loading"
                  />

                  {/* delete action */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-md flex items-center justify-center bg-red-500 cursor-pointer">
                    <FaTrash 
                    className="text-sm text-white"
                    onClick={deleteAnImageObject}
                     />
                  </div>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
          )}
        </div>

        {/* tags */}
        <div className="w-full flex items-center flex-wrap gap-2">
              {initialTags.map((tag, i) => (
                <div key={i} 
                className={`border border-gray-300 px-2 py-2 rounded-md cursor-pointer ${selectedTags.includes(tag)? "bg-blue-500 text-white" : ""}`}
                onClick={() => handleSelectedTags(tag)}
                >
                  <p>{tag}</p>
                </div>
              ))}
        </div>
        </div>

      {/* right container */}
      <div className="col-span-12 lg:col-span-8 2xl:col-span-9">Right Side</div>
    </div>
  )
}

export default CreateTemplate;
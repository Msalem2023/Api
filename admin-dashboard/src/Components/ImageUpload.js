import { useRef, useState } from "react"
import { TbPhotoPlus } from "react-icons/tb"

const ImageUpload = ({ onChange, value }) => {
  const [pickedImage, setPickedImage] = useState()
  const imageInput = useRef(null)
  const handlePickClick = () => {
    imageInput?.current?.click()
  }
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPickedImage(fileReader.result);
      };
      fileReader.onerror = () => {
        console.error('Error reading file');
      };
      fileReader.readAsDataURL(file);      
      onChange(file)
    } else {
      console.error('No file selected');
    }
  };


  return (
    <>
      <input type="file" className="hidden" ref={imageInput} name="Image" onChange={handleImageChange} />
      <div className="cursor-pointer border-2 border-dashed border-neutral-300 p-20 hover:opacity-70 flex justify-center items-center gap-4 text-neutral-600" onClick={handlePickClick}><TbPhotoPlus size={50} />
        <div className="font-semibold text-lg">click to upload</div>
        {pickedImage && (<div className="w-full inset-0 h-full absolute">
          <img alt="upload" className="w-full h-full" style={{ objectFit: "cover" }} src={pickedImage} />
        </div>)}
      </div>
    </>
  )
}

export default ImageUpload
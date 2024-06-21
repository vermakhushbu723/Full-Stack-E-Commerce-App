import React, { useState } from 'react';
import { CgClose } from "react-icons/cg";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const UploadCategory = ({ onClose, fetchData }) => {
  const [category, setCategory] = useState("");

  const handleOnChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(SummaryApi.uploadCategory.url, {
        method: SummaryApi.uploadCategory.method,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ categoryName: category }) // Adjust to match your backend's expected field name
      });

      const responseData = await response.json();
      console.log("response", responseData);

      if (responseData.success) {
        toast.success(responseData?.message);
        onClose();
        fetchData(); // Assuming this function updates data after a successful upload
      } else {
        toast.error(responseData?.message || "Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading category:", error);
      toast.error("Failed to upload category. Please try again.");
    }
  };

  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-md h-full max-h-[50%] overflow-hidden'>
        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg'>Upload Category</h2>
          <div className='w-fit ml-auto text-2xl hover:text-blue-950 cursor-pointer' onClick={onClose}>
            <CgClose />
          </div>
        </div>

        <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
          <label htmlFor='categoryName'>Category Name:</label>
          <input
            type='text'
            id='categoryName'
            placeholder='Enter category name'
            value={category}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />
          <button className='px-3 py-2 bg-blue-950 text-white mb-10 hover:bg-blue-700'>Upload Category</button>
        </form>
      </div>
    </div>
  );
};

export default UploadCategory;

// import React, { useState } from 'react';
// import { CgClose } from "react-icons/cg";
// import SummaryApi from '../common';
// import { toast } from 'react-toastify';

// const UploadCategory = ({ onClose, fetchData }) => {
//   const [category, setCategory] = useState("");

//   const handleOnChange = (e) => {
//     setCategory(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const response = await fetch(SummaryApi.uploadCategory.url, {
//       method: SummaryApi.uploadCategory.method,
//       credentials: 'include',
//       headers: {
//         "content-type": "application/json"
//       },
//       body: JSON.stringify({ category })
//     });

//     const responseData = await response.json();
//     console.log("response", responseData);

//     if (responseData.success) {
//       toast.success(responseData?.message);
//       onClose();
//       fetchData();
//     }

//     if (responseData.error) {
//       toast.error(responseData?.message);
//     }
//   };

//   return (
//     <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
//       <div className='bg-white p-4 rounded w-full max-w-md h-full max-h-[50%] overflow-hidden'>
//         <div className='flex justify-between items-center pb-3'>
//           <h2 className='font-bold text-lg'>Upload Category</h2>
//           <div className='w-fit ml-auto text-2xl hover:text-blue-950 cursor-pointer' onClick={onClose}>
//             <CgClose />
//           </div>
//         </div>

//         <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
//           <label htmlFor='categoryName'>Category Name:</label>
//           <input
//             type='text'
//             id='categoryName'
//             placeholder='Enter category name'
//             value={category}
//             onChange={handleOnChange}
//             className='p-2 bg-slate-100 border rounded'
//             required
//           />
//           <button className='px-3 py-2 bg-blue-950 text-white mb-10 hover:bg-blue-700'>Upload Category</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UploadCategory;
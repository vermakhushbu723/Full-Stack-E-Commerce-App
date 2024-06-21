import React from 'react';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';

const AdminCategoryCard = ({ data, fetchdata }) => {
  const handleDeleteCategory = async () => {
    // Add logic to delete the category
    const response = await fetch(SummaryApi.deleteCategory.url, {
      method: SummaryApi.deleteCategory.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ id: data._id })
    });
console.log("response", response);
    const responseData = await response.json();
    if (responseData.success) {
      fetchdata();
    }
  };

  return (
    <div className='p-4 bg-white border rounded shadow-sm flex justify-between items-center w-full max-w-xs'>
      <p className='font-bold'>{data.categoryName}</p>
      <button onClick={handleDeleteCategory} className='text-blue-950 hover:text-blue-800'>
        <MdDelete size={20} />
      </button>
    </div>
  );
};

export default AdminCategoryCard;
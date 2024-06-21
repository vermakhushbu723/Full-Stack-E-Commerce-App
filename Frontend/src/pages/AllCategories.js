import React, { useEffect, useState } from 'react';
import UploadCategory from '../components/UploadCategory';
import SummaryApi from '../common';
import AdminCategoryCard from '../components/AdminCategoryCard';

const AllCategories = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [allCategories, setAllCategories] = useState([]);

  const fetchAllCategories = async () => {
    const response = await fetch(SummaryApi.allCategories.url);
    const dataResponse = await response.json();

    console.log("category data", dataResponse);

    setAllCategories(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Categories</h2>
        <button className='border-2 border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white transition-all py-1 px-3 rounded-full' onClick={() => setOpenUploadCategory(true)}>Upload Category</button>
      </div>

      {/** All categories */}
      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {
          allCategories.map((category, index) => (
            <AdminCategoryCard data={category} key={index + "allCategories"} fetchdata={fetchAllCategories} />
          ))
        }
      </div>

      {/** Upload category component */}
      {
        openUploadCategory && (
          <UploadCategory onClose={() => setOpenUploadCategory(false)} fetchData={fetchAllCategories} />
        )
      }
    </div>
  );
};

export default AllCategories;
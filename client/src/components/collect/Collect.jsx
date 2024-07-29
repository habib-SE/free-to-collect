import React, { useEffect, useState } from 'react';
import ApiService from '../../api/ApiService';

const categories = [
  'Clothing',
  'Shoes',
  'Bags and Accessories',
  'Kitchenware',
  'Furniture',
  'Electronics',
  'Toys and Games',
  'Books',
  'Home Decor',
  'Sports Equipment',
  'Bedding and Linens',
  'Art and Craft Supplies',
  'School Supplies',
  'Pet Supplies',
  'Tools and Hardware',
  'Musical Instruments',
  'Baby Items',
  'Personal Care Products',
  'Food Items (non-perishable)',
  'Hygiene Products',
];

export const Collect = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ApiService.getAllDonations('donations');
        setDonations(data);
        setLoading(false);
        console.log("donations", data);
      } catch (err) {
        console.error("Error fetching donations:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleCategorySelect = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredDonations = selectedCategories.length > 0
    ? donations.filter((donation) => selectedCategories.includes(donation.category))
    : donations;

  const searchResults = searchQuery
    ? filteredDonations.filter((donation) =>
      Object.values(donation).some(
        (value) => typeof value === 'string' && value.toLowerCase().includes(searchQuery)
      )
    )
    : filteredDonations;

  if (loading) {
    return <p>Loading...</p>; // Add a loading state
  }

  if (donations.length === 0) {
    return <p>No donations available.</p>; // Handle empty state
  }

  return (
    <div className='bg-gray-50 dark:bg-gray-900 h-auto'>
      {/* Search bar */}
      <div className="  flex flex-col gap-4  justify-center items-center ">
        <p className='text-4xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white  '>Search</p>
        <input
          type="text"
          placeholder="Search by location, number, email, category, or description"
          className="p-2 mb-4 border border-gray-300  w-[50%] h-12 rounded-md"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      {/* Donation categories */}
      <div className="flex flex-col items-center justify-center">
        <p className='text-4xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white '>Select Category</p>
        <div className="flex flex-wrap gap-2 p-4">
          {categories.map((category) => (
            <div
              key={category}
              className={`cursor-pointer rounded border p-2 ${selectedCategories.includes(category)
                  ? 'bg-black text-white'
                  : 'bg-white text-black'
                }`}
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      {/* Display filtered donations in a grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-14 ">
        {searchResults.map((donation) => (
          <div
            key={donation.id}
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="object-cover w-full h-64 lg:h-64 md:w-60 rounded-t-lg md:h-auto md:rounded-none md:rounded-s-lg"
              src={donation?.portfolioImages[0]}
              alt=""
            />
            <div className="flex flex-col justify-between p-4 w-full  leading-normal">
              <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                <span className="text-gray-500 dark:text-white">Name:</span> {donation?.fullName}
              </h6>
              <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                <span className="text-gray-500 dark:text-white">Number:</span> {donation?.number}
              </h6>
              <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                <span className="text-gray-500 dark:text-white">Quantity:</span> {donation?.quantity}
              </h6>
              <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                <span className="text-gray-500 dark:text-white">Email:</span> {donation?.email}
              </h6>
              <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                <span className="text-gray-500 dark:text-white">Category:</span> {donation?.category}
              </h6>
              <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                <span className="text-gray-500 dark:text-white">Location:</span> {donation?.location}
              </h6>
              <p className="mb-3 text-gray-600 dark:text-gray-400 text-sm">
                <span className="text-gray-500 dark:text-white">Description:</span>{' '}
                {donation?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collect;
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import ApiService from '../../api/ApiService';
import { useNavigate } from 'react-router-dom';

const DonateNow = () => {
    const navigate = useNavigate()
    
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
  
  const formik = useFormik({
    initialValues: {
      email: '',
      fullName: '',
      number: '',
      quantity: '',
      category: '',
      location: '',
      description: '',
      files: []
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full Name Required'),
      email: Yup.string().email('Invalid Email Address').required('Email Address Required'),
      number: Yup.string().required('Number Required'),
      quantity: Yup.string().required('Quantity Required'),
      category: Yup.string().required('Category Required'),
      location: Yup.string().required('Location Required'),
      description: Yup.string().required('Description Required'),
      files: Yup.mixed().required('Files Required'),
    }),

    onSubmit: async (values) => {
      console.log(values)
      // Create a new FormData object
      const formData = new FormData();

      // Append each field along with its value
      formData.append('email', values.email);
      formData.append('fullName', values.fullName);
      formData.append('number', values.number);
      formData.append('quantity', values.quantity);
      formData.append('category', values.category);
      formData.append('location', values.location);
      formData.append('description', values.description);

      // Append file fields
      const selectedFiles = Array.from(values.files);
      selectedFiles.forEach((file, index) => {
        formData.append(`portfolioImages`, file);
      });

      try {
        const donationsPostRes = await ApiService.createDonationCard("donation", formData)
        navigate('/donate-now')
         window.location.reload()
      } catch (error) {
        console.log(error)
      }
      console.log('formData', formData);



      // Perform your desired action with the FormData, such as sending it to the server
    }
  })

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    formik.setFieldValue("files", selectedFiles);
  };

  return (
    <div className="bg-white dark:bg-gray-900 ">
      <form className="mx-auto flex px-11 w-[100%] md:w-[70%] flex-col md:flex-row" onSubmit={formik.handleSubmit}>
        <div className="md:w-[60%] w-[100%]">
          {/* name */}
          <div className="relative z-0 w-full mb-5 group">
            <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required
            />
            {formik.touched.fullName && formik.errors.fullName ? (
              <div className="text-red-500">{formik.errors.fullName}</div>
            ) : null}
          </div>
          {/* Email */}
          <div className="relative z-0 w-full mb-5 group">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>

          {/* Number */}
          <div className="relative z-0 w-full mb-5 group">
            <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your number
            </label>
            <input
              type="tel"
              name="number"
              id="number"
              value={formik.values.number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="04348324"
              required
            />
            {formik.touched.number && formik.errors.number ? (
              <div className="text-red-500">{formik.errors.number}</div>
            ) : null}
          </div>

          {/* Quantity */}
          <div className="relative z-0 w-full mb-5 group">
            <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="3,4 ..."
              required
            />
            {formik.touched.quantity && formik.errors.quantity ? (
              <div className="text-red-500">{formik.errors.quantity}</div>
            ) : null}
          </div>

          {/* Category */}
          {/* <div className="relative z-0 w-full mb-5 group">
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Category
            </label>
            <input
              type="text"
              name="category"
              id="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Category..."
              required
            />
            {formik.touched.category && formik.errors.category ? (
              <div className="text-red-500">{formik.errors.category}</div>
            ) : null}
          </div> */}
            <div className="relative z-0 w-full mb-5 group">
          <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Category
          </label>
          <select
            name="category"
            id="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value="" label="Select a category" />
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {formik.touched.category && formik.errors.category ? (
            <div className="text-red-500">{formik.errors.category}</div>
          ) : null}
        </div>


          {/* Location */}
          <div className="relative z-0 w-full mb-5 group">
            <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Location..."
              required
            />
            {formik.touched.location && formik.errors.location ? (
              <div className="text-red-500">{formik.errors.location}</div>
            ) : null}
          </div>

          {/* Description */}
          <div className="relative z-0 w-full mb-5 group">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Description..."
              required
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500">{formik.errors.description}</div>
            ) : null}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>

        {/* File Upload Section */}
        <div className="flex md:w-[40%] w-[100%]">
          <div className="relative w-full mb-5 group">
            <div className="w-full rounded-xl bg-gray-700 m-0 my-4 md:my-0 md:m-4 p-2 flex flex-col justify-start items-center gap-3 pt-16">
              <p className="font-bold">Select Things Images</p>
              <label htmlFor="fileInput" className="flex gap-3 cursor-pointer">
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Choose Images</p>
                  <p className="text-sm text-gray-300">
                    JPG, GIF, or PNG. Max size of 800K
                  </p>
                </div>
              </label>
              {formik.touched.files && Boolean(formik.errors.files) && (
                <p className="text-lg text-red-600">
                  {formik.errors.files}
                </p>
              )}
              <input
                type="file"
                id="fileInput"
                accept=".jpg, .jpeg, .png, .gif"
                multiple
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              {formik.values.files.length > 0 && (
                <div className="mt-3">
                  <p>Selected images:</p>
                  <div className="flex gap-2 flex-col">
                    {formik.values.files.map((file, index) => (
                      <img key={index} src={URL.createObjectURL(file)} alt={`Image ${index}`} className="w-300 h-400 object-cover rounded" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DonateNow;

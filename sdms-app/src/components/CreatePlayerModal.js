import React, { Fragment, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

const CreatePlayerModal = ({ isOpen, setIsOpen, setPlayerData }) => {
  const formRef = useRef(null);
  const nameRef = useRef(null);
  const genderRef = useRef(null);
  const weightRef = useRef(null);
  const ageRef = useRef(null);


	const submitFormData = async (event) => {
		console.log('Submit button clicked!');
    	event.preventDefault();

	const formData = {
		name: nameRef.current.value,
		gender: genderRef.current.value,
    	weight: weightRef.current.value,
    	age: ageRef.current.value,
	};
	try {
		console.log('Form Data:', formData);

		nameRef.current.value = "";
		genderRef.current.value = "";
		weightRef.current.value = "";
		ageRef.current.value = "";

		const response = await fetch('http://54.236.44.210:5000/api/v1/players', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		  });

		  if (!response.ok) {
			throw new Error('Failed to update data');
		  }

		  const updatedData = await response.json();

		  setPlayerData(updatedData);

		  // Close the modal after submitting the data
		  setIsOpen(false);
		} catch (error) {
		  console.error('Error updating data:', error);
		}
	  }

  return (
    <Transition.Root show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={nameRef} onClose={() => setIsOpen(false)}>
        {/* ... (unchanged code for overlay) */}
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 mx-auto">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex flex-shrink-0 items-center justify-center rounded-lg bg-green-100">
              <div className='py-4 px-2'>
                <InformationCircleIcon className="h-6 w-6 text-gray-900" aria-hidden="true" />
              </div>
              <div className='py-4 px-2'>
                Please enter player details
              </div>
            </div>
          </div>
        </div>
        <form className="space-y-6 px-8" onSubmit={submitFormData} ref={formRef}>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name<span className='text-red-500'>*</span></label>
            <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter player name" required ref={nameRef} />
          </div>
          <div>
            <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">Gender<span className='text-red-500'>*</span></label>
            <select name="gender" id="gender" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required ref={genderRef}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-900">Weight<span className='text-red-500'>*</span></label>
            <input type="text" name="weight" id="weight" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter player weight" required ref={weightRef} />
          </div>
          <div>
            <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900">Age<span className='text-red-500'>*</span></label>
            <input type="text" name="age" id="age" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter player age" required ref={ageRef} />
          </div>
          <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
        </form>
        {/* ... (unchanged code for cancel button) */}
      </Dialog>
    </Transition.Root>
  );
};

export default CreatePlayerModal;

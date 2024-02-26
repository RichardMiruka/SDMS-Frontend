import { Fragment, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

export default function AddCoachModal({ isOpen, setIsOpen, setCoaches }) {
  const cancelButtonRef = useRef(null);
  const nameRef = useRef(null);
  const specializationRef = useRef(null);
  const imageUrlRef = useRef(null);
  const formRef = useRef();

  const submitFormData = async (event) => {
    event.preventDefault();

    const formData = {
      name: nameRef.current.value,
      specialization: specializationRef.current.value,
      imageUrl: imageUrlRef.current.value,
    };

    try {
      const response = await fetch('http://54.236.44.210:5000/api/v1/coaches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add coach');
      }

      const updatedCoaches = await response.json();
      setCoaches(updatedCoaches);

      // Clear input values
      nameRef.current.value = '';
      specializationRef.current.value = '';
      imageUrlRef.current.value = '';

      // Close the modal after submitting the data
      setIsOpen(false);
    } catch (error) {
      console.error('Error adding coach:', error);
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={() => setIsOpen(false)}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <InformationCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Add Coach
                    </Dialog.Title>
                    <div className="mt-2">
                      <form onSubmit={submitFormData} ref={formRef}>
                        <div className="mb-4">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            autoComplete="given-name"
                            required
                            className="mt-1 p-2 w-full border rounded-md"
                            ref={nameRef}
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
                            Specialization
                          </label>
                          <input
                            type="text"
                            name="specialization"
                            id="specialization"
                            required
                            className="mt-1 p-2 w-full border rounded-md"
                            ref={specializationRef}
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                            Image URL
                          </label>
                          <input
                            type="text"
                            name="imageUrl"
                            id="imageUrl"
                            className="mt-1 p-2 w-full border rounded-md"
                            ref={imageUrlRef}
                          />
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            Add
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

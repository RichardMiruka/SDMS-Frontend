import { Fragment, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

export default function Modal({ isOpen, setIsOpen, setTeamData }) {
  const cancelButtonRef = useRef(null);
  const nameRef = useRef(null);
  const statusRef = useRef(null);
  const messageRef = useRef(null)
  const formRef = useRef()
  const coachRef = useRef(null);

  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await fetch('http://54.236.44.210:5000/api/v1/coaches');
        if (!response.ok) {
          throw new Error(`Failed to fetch coaches. Status: ${response.status}`);
        }
        const coachesData = await response.json();
        setCoaches(coachesData);
        console.log('Coaches Fetched:', coachesData);
      } catch (error) {
        console.error('Error fetching coaches:', error);
      }
    };
  
    if (isOpen) {
      fetchCoaches();
    }
  }, [isOpen]);

  const submitFormData = async (event) => {
	console.log('Submit button clicked!');
    event.preventDefault();


	const formData = {
		name: nameRef.current.value,
		status: messageRef.current.value,
    coachId: coachRef.current.value,
	  };

	  try {
		console.log('Form Data:', formData);
  
		// Clear input values
		nameRef.current.value = "";
		messageRef.current.value = "";
    coachRef.current.value = "";
  
		  const response = await fetch('http://54.236.44.210:5000/api/v1/teams', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		  });
  
		  if (!response.ok) {
			throw new Error('Failed to update data');
		  }
  
		  // Fetch updated data from the server
		  const updatedData = await response.json();
  
		  // Update the state in the parent component (TeamList)
		  setTeamData(updatedData);
  
		  // Close the modal after submitting the data
		  setIsOpen(false);
		} catch (error) {
		  console.error('Error updating data:', error);
		}
	  }
  

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setIsOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 mx-auto">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex flex-shrink-0 items-center justify-center rounded-lg bg-green-100">
                                            <div className='py-4 px-2'>
                                                <InformationCircleIcon className="h-6 w-6 text-gray-900" aria-hidden="true" />
                                            </div>
                                            <div className='py-4 px-2'>
                                                Please key in your team details
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <form className="space-y-6 px-8" action="#" onSubmit={submitFormData} ref={formRef}>
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name of your Team <span className='text-red-500'>*</span></label>
                                        <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="e.g. Manchester United" required ref={nameRef} />
                                    </div>
                                    <div>
                                        <label htmlFor="coach" className="block mb-2 text-sm font-medium text-gray-900"> Coach <span className="text-red-500">*</span> </label>
                                        <select name="coach" id="coach" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required ref={coachRef}
          >
                                        <option value="" disabled>
                                        Select a coach
                                        </option>
                                        {coaches.map((coach) => (
                                        <option key={coach.id} value={coach.id}>
                                            {coach.name}
                                        </option>
                                        ))}
                                    </select>
                                    </div>
                                    <div>
                                        <label for="phone" className="block mb-2 text-sm font-medium text-gray-900">Status <span className='text-red-500'>*</span></label>
                                        <input type="text" name="phone" id="phone" placeholder="e.g. Affiliated" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required ref={messageRef} />
                                    </div>
                                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
                                </form>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => setIsOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
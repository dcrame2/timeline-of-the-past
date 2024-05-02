import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@nextui-org/react";
import { XMarkIcon } from "@heroicons/react/16/solid";

function UploadModal({
  children,
  uploadDatas,
  selectedAge,
  ageOptions,
  setUploadedImages,
}: {
  children: React.ReactNode;
  uploadDatas: any;
  selectedAge: any;
  ageOptions: any;
  setUploadedImages: any;
}) {
  const [mulitipleImageModalOpen, setMulitipleImageModalOpen] = useState(false);
  const openMutlitplImageModal = () => {
    setMulitipleImageModalOpen(true);
  };

  const doneImageHandler = () => {
    setUploadedImages([]);
    setMulitipleImageModalOpen(false);
  };
  return (
    <>
      <Button
        onPress={openMutlitplImageModal}
        type="button"
        size="sm"
        className="max-w-72 text-white bg-lightOrange border-lightBlue"
      >
        Add Images -{" "}
        {ageOptions[selectedAge]?.label
          ? ageOptions[selectedAge].label
          : "Born"}
      </Button>
      <Transition.Root show={mulitipleImageModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={setMulitipleImageModalOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black  bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-black hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => setMulitipleImageModalOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-black"
                      >
                        Upload images for this age
                      </Dialog.Title>
                      <div className="mt-2">{children}</div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <Button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-green px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={doneImageHandler}
                    >
                      Done
                    </Button>
                    <Button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm ring-1 ring-inset ring-lightBlue hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={doneImageHandler}
                    >
                      Cancel
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default UploadModal;

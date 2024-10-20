import React from 'react'
import { VscError } from "react-icons/vsc";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoWarningOutline } from "react-icons/io5";

export default function Alert() {
    return (
        <div className='Alert'>
            <div aria-live="assertive" class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
                <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
                    <div class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div class="p-4">
                            <div class="flex items-start">
                                <div class="flex-shrink-0">
                                    {/* <VscError className='text-red-400 h-6 w-6'/> */}
                                    {/* <FaRegCircleCheck className='text-red-400 h-6 w-6' /> */}
                                    <IoWarningOutline className='text-yellow-400 h-6 w-6' />
                                </div>
                                <div class="ml-3 w-0 flex-1 pt-0.5">
                                    <p class="text-sm font-medium text-gray-900">Successfully Logged in!</p>
                                    {/* <p class="mt-1 text-sm text-gray-500">File save click here to view folder.</p> */}
                                </div>
                                <div class="ml-4 flex flex-shrink-0">
                                    <button type="button" class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                        <span class="sr-only">Close</span>
                                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

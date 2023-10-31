import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline'
import React from 'react'


export default function EpicerieList(props:any) {
  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
        <span>Épicerie</span>
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              {props.epicerie.map((item:any) => (
                <div key={item.code} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                  <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <img
                      src={item.product? item.product.image_front_url: item.image_front_url}
                      alt={item.product? item.product.abbreviated_product_name: item.abbreviated_product_name}
                      className="h-10 w-10 rounded-lg"
                    />
                  </div>
                  <div>
                    <a href={item.product? item.product.link: item.link} className="font-semibold text-gray-900">
                      {item.product? item.product.abbreviated_product_name: item.abbreviated_product_name}	
                      <span className="absolute inset-0" />
                    </a>
                    <p className="mt-1 text-gray-600">{item.product? item.product.brands_imported: item.brands_imported}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center bg-gray-50">
                <button
                  className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                    onClick={() => props.setOpen(true)}
                >
                  Ajouter
                </button>
                <button
                  className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                    onClick={() => props.setSugOpen(true)}
                >
                  Suggestions
                </button>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

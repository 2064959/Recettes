import React, { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function Example() {
  const [open, setOpen] = useState(true)
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [epicerie, setEpicerie] = useState<any[]>([]);
  const [categorie, setCategorie] = useState<string>("all");

  useEffect(() => {
    setLoading(true);
    fetch(`/api/articles/${categorie}`)
      .then(res => res.json())
      .then(data => {setArticles(data);
      console.log(data);
      setLoading(false);
      });   
  }, []);

  const handleCategorieChange = (cat:string) => {
    setLoading(true);
    
  }

  const addToEpicerie = (article:any) => {
    setEpicerie([...epicerie, article]);
  }


  
    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">Ajouter des articles</Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        {
                          loading ? <div className="flex justify-center mt-8"><div className="loader"></div></div> :
                            <div className="mt-8">
                            <div className="flow-root">
                              <ul role="list" className="-my-6 divide-y divide-neutral-200">
                                {articles.map((article) => (
                                  <li key={article.code} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-neutral-500">
                                      <img
                                        src={article.product.image_front_url}
                                        alt={article.imageAlt}
                                        className="h-full w-full object-cover object-center"
                                      />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-medium text-neutral-900"> 
                                          <h3>
                                            <a href={article.product.link}>{article.product.abbreviated_product_name}</a>
                                          </h3>
                                          <p className="ml-4">{article.product.brands_imported}</p>
                                        </div>
                                        <p className="mt-1 text-sm text-neutral-500">{article.product.categories}</p>
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <p className="text-neutral-600">Code:  {article.code}</p>

                                        <div className="flex">
                                          <button
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                            onClick={() => {
                                              addToEpicerie(article); 
                                              handleCategorieChange(
                                                
                                                  articles.map((article) => article.product.categories).toString()
                                                
                                              );
                                            }}
                                          >
                                            Ajouter
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        }
                      </div>

                      <div className="border-t border-neutral-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Nombre d'articles</p>
                          <p>{epicerie.length}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Catégories principales: </p>
                        <div className="mt-6">
                          <a
                            href="#"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            Finir
                          </a>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    )
}

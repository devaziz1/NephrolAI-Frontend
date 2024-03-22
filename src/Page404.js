import React from 'react'

export default function Page404() {
  return (
    <div className='mt-20 ml-97'>
        <h2 className=" text-2xl font-extrabold dark:text-white text-red-500">
          Page Not Found
        </h2>
      <img
            src={require("./images/Error.png")}
            className="mt-8 w-72 text-3xl "
            alt="Logo"
          />
    </div>
  )
}

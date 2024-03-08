import React, { useState } from 'react'

const CreateTemplate = () => {
  const [formData, setFormData] = useState({
    title:
  });

  return (
    <div className="w-full px-4 lg:px-10 2xl:px-32 py-4 grid grid-cols-1 lg:grid-cols-12">
      {/* left container */}
      <div className="col-span-12 lg:col-span-4 2xl:col-span-3 w-full flex-1 flex items-center justify-start flex-col gap-4 px-2">
        <div className="w-full">
          <p className="text-lg text-txtPrimary">Create a new Template</p>
        </div>

        {/* template ID section */}
        <div className="w-full flex items-center justify-end">
          <p className="text-base text-txtLight uppercase font-semibold">
            TEMP: {" "}
          </p>
          <p className="text-sm text-txtDark capitalize font-bold">
            TEMPLATE 1
          </p>
        </div>

        {/* template title section */}
        <input type="text"/>
      </div>

      {/* right container */}
      <div className="col-span-12 lg:col-span-8 2xl:col-span-9 bg-red-200">Right Side</div>
    </div>
  )
}

export default CreateTemplate;
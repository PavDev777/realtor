import React, { useState } from 'react'
import { Oval } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import { auth } from "../../firebase";
import {ICreateListing} from './types';
import {getStorage, uploadBytesResumable, ref} from 'firebase/storage'
import {v4 as uuid} from 'uuid'

export const CreateListing = () => {
  const [geolocationEnabled, setGeolocationEnabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<ICreateListing>({
    type: 'rent',
    name: '',
    bedrooms: 1,
    bathrooms: 1,
    parking: 'false',
    furnished: 'false',
    address: '',
    description: '',
    offer: 'true',
    regularPrice: 0,
    discountedPrice: 0,
    images: null
  })

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement> &
      React.ChangeEvent<HTMLTextAreaElement> &
      React.MouseEvent<HTMLButtonElement>
  ) => {
    let boolean: string | undefined = null
    if (e.currentTarget.value === 'true') {
      boolean = 'true'
    }

    if (e.currentTarget.value === 'false') {
      boolean = 'false'
    }

    if (e.currentTarget.files) {
      setFormData({ ...formData, images: e.currentTarget.files })
    }

    if (!e.currentTarget.files) {
      setFormData({
        ...formData,
        [e.currentTarget.id]: boolean ?? e.currentTarget.value
      })
    }
  }

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    if (formData.discountedPrice >= formData.regularPrice) {
      setLoading(false)
      toast.error('Discounted price needs to be less than regular price')
      return
    }

    if (formData.images && formData.images?.length > 6) {
      setLoading(false)
      toast.error('maximum images must be 6')
      return
    }

    const storeImage = async image => {
      return new Promise((resolve, reject) => {
        const storage = getStorage()
        const filename = `${auth.currentUser?.uid}-${image.name}-${uuid()}`
        const storageRef = ref(storage, filename)
        const uploadTask = uploadBytesResumable(storageRef, image)
      })
    }

    const imgUrls = await Promise.all(
      [...formData.images].map(async image => storeImage(image))
    )
  }

  if (loading) {
    return (
      <Oval
        height={80}
        width={80}
        color='#4fa94d'
        wrapperStyle={{
          display: 'grid',
          height: '80vh',
          placeContent: 'center'
        }}
        wrapperClass='spinner'
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor='#4fa94d'
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    )
  }

  return (
    <main className='max-w-md px-2 mx-auto mt-6 mb-6'>
      <h1 className='text-3xl text-center font-bold'>create a listing</h1>
      <form className='flex flex-col gap-y-5' onSubmit={onSubmitHandler}>
        <div>
          <p className='text-lg mt-6 font-semibold'>sell / rent</p>
          <div className='flex items-center gap-x-3'>
            <button
              className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg w-full ${
                formData.type === 'rent'
                  ? 'bg-white text-black'
                  : 'bg-slate-600 text-white'
              }`}
              type='button'
              id='type'
              value='sell'
              onClick={onChangeHandler}
            >
              sell
            </button>
            <button
              className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg w-full ${
                formData.type === 'sell'
                  ? 'bg-white text-black'
                  : 'bg-slate-600 text-white'
              }`}
              type='button'
              id='type'
              value='rent'
              onClick={onChangeHandler}
            >
              rent
            </button>
          </div>
        </div>
        <div>
          <label className='text-lg font-semibold' htmlFor='name'>
            name
          </label>
          <input
            className='w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded'
            type='text'
            id='name'
            value={formData.name}
            onChange={onChangeHandler}
            placeholder='Name'
            maxLength={32}
            minLength={10}
            required
          />
        </div>
        <div className='flex items-center justify-start gap-x-3'>
          <div>
            <label className='text-lg font-semibold' htmlFor='bedrooms'>
              beds
            </label>
            <input
              className='px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded text-center w-full'
              type='number'
              id='bedrooms'
              value={formData.bedrooms}
              onChange={onChangeHandler}
              min={1}
              max={50}
              required
            />
          </div>
          <div>
            <label className='text-lg font-semibold' htmlFor='bathrooms'>
              baths
            </label>
            <input
              className='px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded text-center w-full'
              type='number'
              id='bathrooms'
              value={formData.bathrooms}
              onChange={onChangeHandler}
              min={1}
              max={50}
              required
            />
          </div>
        </div>
        <div>
          <p className='text-lg mt-6 font-semibold'>parking spot</p>
          <div className='flex items-center gap-x-3'>
            <button
              className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg w-full ${
                formData.parking === 'false'
                  ? 'bg-white text-black'
                  : 'bg-slate-600 text-white'
              }`}
              type='button'
              id='parking'
              value='true'
              onClick={onChangeHandler}
            >
              yes
            </button>
            <button
              className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg w-full ${
                formData.parking === 'true'
                  ? 'bg-white text-black'
                  : 'bg-slate-600 text-white'
              }`}
              type='button'
              id='parking'
              value='false'
              onClick={onChangeHandler}
            >
              no
            </button>
          </div>
        </div>

        <div>
          <p className='text-lg mt-6 font-semibold'>furnished</p>
          <div className='flex items-center gap-x-3'>
            <button
              className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg w-full ${
                formData.furnished === 'false'
                  ? 'bg-white text-black'
                  : 'bg-slate-600 text-white'
              }`}
              type='button'
              id='furnished'
              value='true'
              onClick={onChangeHandler}
            >
              yes
            </button>
            <button
              className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg w-full ${
                formData.furnished === 'true'
                  ? 'bg-white text-black'
                  : 'bg-slate-600 text-white'
              }`}
              type='button'
              id='furnished'
              value='false'
              onClick={onChangeHandler}
            >
              no
            </button>
          </div>
        </div>
        {/* {!geolocationEnabled && ( */}
        {/*  <div className="flex items-center justify-start gap-x-3"> */}
        {/*    <div> */}
        {/*      <p className="text-lg font-semibold">latitude</p> */}
        {/*      <input */}
        {/*        className="px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded text-center w-full" */}
        {/*        type="number" */}
        {/*        id="latitude" */}
        {/*        value={formData.latitude} */}
        {/*        onChange={onChangeHandler} */}
        {/*        min="-90" */}
        {/*        max="90" */}
        {/*        required */}
        {/*      /> */}
        {/*    </div> */}
        {/*    <div> */}
        {/*      <p className="text-lg font-semibold">longitude</p> */}
        {/*      <input */}
        {/*        className="px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded text-center w-full" */}
        {/*        type="number" */}
        {/*        id="longitude" */}
        {/*        value={formData.longitude} */}
        {/*        onChange={onChangeHandler} */}
        {/*        min="-180" */}
        {/*        max="180" */}
        {/*        required */}
        {/*      /> */}
        {/*    </div> */}
        {/*  </div> */}
        {/* )} */}
        <div>
          <label className='text-lg font-semibold' htmlFor='address'>
            address
          </label>
          <textarea
            className='w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded'
            id='address'
            value={formData.address}
            onChange={onChangeHandler}
            placeholder='Address'
            required
          />
        </div>

        <div>
          <label className='text-lg font-semibold' htmlFor='description'>
            description
          </label>
          <textarea
            className='w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded'
            id='description'
            value={formData.description}
            onChange={onChangeHandler}
            placeholder='Description'
            required
          />
        </div>
        <div>
          <p className='text-lg font-semibold'>offer</p>
          <div className='flex items-center gap-x-3'>
            <button
              className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg w-full ${
                formData.offer === 'false'
                  ? 'bg-white text-black'
                  : 'bg-slate-600 text-white'
              }`}
              type='button'
              id='offer'
              value='true'
              onClick={onChangeHandler}
            >
              yes
            </button>
            <button
              className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg w-full ${
                formData.offer === 'true'
                  ? 'bg-white text-black'
                  : 'bg-slate-600 text-white'
              }`}
              type='button'
              id='offer'
              value='false'
              onClick={onChangeHandler}
            >
              no
            </button>
          </div>
        </div>

        <div className='w-full'>
          <label className='text-lg font-semibold' htmlFor='regularPrice'>
            regular price
          </label>
          <div className='flex items-center gap-x-7'>
            <input
              className='px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded text-center w-full'
              type='number'
              id='regularPrice'
              value={formData.regularPrice}
              onChange={onChangeHandler}
              min={50}
              max={4000000000}
              required
            />
            {formData.type === 'rent' && <p className='w-full'>$ / month </p>}
          </div>
        </div>

        {formData.offer === 'true' && (
          <div className='w-full'>
            <label className='text-lg font-semibold' htmlFor='discountedPrice'>
              discounted price
            </label>
            <div className='flex items-center gap-x-7'>
              <input
                className='px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded text-center w-full'
                type='number'
                id='discountedPrice'
                value={formData.discountedPrice}
                onChange={onChangeHandler}
                min={50}
                max={4000000000}
                required={formData.offer === 'true'}
              />
              {formData.type === 'rent' && <p className='w-full'>$ / month </p>}
            </div>
          </div>
        )}
        <div>
          <p className='text-lg font-semibold'>images</p>
          <p className='text-gray-600'>
            the first image will be the cover (max 6)
          </p>
          <input
            className='w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-400'
            type='file'
            id='images'
            onChange={onChangeHandler}
            accept='.jpg,.png,.jpeg'
            multiple
            required
          />
        </div>
        <button
          className='w-full px-7 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white uppercase font-medium text-sm rounded shadow-md'
          type='submit'
        >
          create listing
        </button>
      </form>
    </main>
  )
}

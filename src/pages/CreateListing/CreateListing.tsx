import { useState, MouseEvent, ChangeEvent } from "react";
import { ICreateListing } from "./types";

export const CreateListing = () => {
  const [formData, setFormData] = useState<ICreateListing>({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: "false",
    furnished: "false",
    address: "",
    description: "",
    offer: "true",
    regularPrice: 0,
    discountedPrice: 0,
  });
  const onChangeHandler = () => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };
  return (
    <main className="max-w-md px-2 mx-auto mt-6 mb-6">
      <h1 className="text-3xl text-center font-bold">create a listing</h1>
      <form className="flex flex-col gap-y-5">
        <div>
          <p className="text-lg mt-6 font-semibold">sell / rent</p>
          <div className="flex items-center gap-x-3">
            <button
              className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg w-full ${
                formData.type === "rent"
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
              type="button"
              id="type"
              value="sale"
              onClick={(e) => onChangeHandler}
            >
              sell
            </button>
            <button
              className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg w-full ${
                formData.type === "sale"
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
              type="button"
              id="type"
              value="sale"
              onClick={onChangeHandler}
            >
              rent
            </button>
          </div>
        </div>
        <div>
          <label className="text-lg font-semibold" htmlFor="name">
            name
          </label>
          <input
            className="w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded"
            type="text"
            id="name"
            value={formData.name}
            onChange={onChangeHandler}
            placeholder="Name"
            maxLength={32}
            minLength={10}
            required
          />
        </div>
        <div className="flex items-center justify-evenly">
          <div>
            <label className="text-lg font-semibold" htmlFor="bedrooms">
              beds
            </label>
            <input
              className="px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded text-center w-full"
              type="number"
              id="bedrooms"
              value={formData.bedrooms}
              onChange={onChangeHandler}
              min={1}
              max={50}
              required
            />
          </div>
          <div>
            <label className="text-lg font-semibold" htmlFor="bathrooms">
              baths
            </label>
            <input
              className="px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded text-center w-full"
              type="number"
              id="bathrooms"
              value={formData.bathrooms}
              onChange={onChangeHandler}
              min={1}
              max={50}
              required
            />
          </div>
        </div>
        <div>
          <p className="text-lg mt-6 font-semibold">parking spot</p>
          <div className="flex items-center gap-x-3">
            <button
              className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg w-full ${
                formData.parking === "false"
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
              type="button"
              id="parking"
              value="true"
              onClick={onChangeHandler}
            >
              yes
            </button>
            <button
              className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg w-full ${
                formData.parking === "true"
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
              type="button"
              id="parking"
              value="false"
              onClick={onChangeHandler}
            >
              no
            </button>
          </div>
        </div>

        <div>
          <p className="text-lg mt-6 font-semibold">furnished</p>
          <div className="flex items-center gap-x-3">
            <button
              className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg w-full ${
                formData.furnished === "false"
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
              type="button"
              id="furnished"
              value="true"
              onClick={onChangeHandler}
            >
              yes
            </button>
            <button
              className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg w-full ${
                formData.furnished === "true"
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
              type="button"
              id="furnished"
              value="false"
              onClick={onChangeHandler}
            >
              no
            </button>
          </div>
        </div>
        <div>
          <label className="text-lg font-semibold" htmlFor="address">
            address
          </label>
          <textarea
            className="w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded"
            id="address"
            value={formData.address}
            onChange={onChangeHandler}
            placeholder="Address"
            required
          />
        </div>

        <div>
          <label className="text-lg font-semibold" htmlFor="description">
            description
          </label>
          <textarea
            className="w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded"
            id="description"
            value={formData.description}
            onChange={onChangeHandler}
            placeholder="Description"
            required
          />
        </div>
        <div>
          <p className="text-lg font-semibold">offer</p>
          <div className="flex items-center gap-x-3">
            <button
              className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg w-full ${
                formData.offer === "false"
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
              type="button"
              id="offer"
              value="true"
              onClick={onChangeHandler}
            >
              yes
            </button>
            <button
              className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg w-full ${
                formData.offer === "true"
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
              type="button"
              id="offer"
              value="false"
              onClick={onChangeHandler}
            >
              no
            </button>
          </div>
        </div>

        <div className="w-full">
          <label className="text-lg font-semibold" htmlFor="regularPrice">
            regular price
          </label>
          <div className="flex items-center gap-x-7">
            <input
              className="px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded text-center w-full"
              type="number"
              id="regularPrice"
              value={formData.regularPrice}
              onChange={onChangeHandler}
              min={50}
              max={4000000000}
              required
            />
            {formData.type === "rent" && <p className="w-full">$ / month </p>}
          </div>
        </div>

        {formData.offer === "true" && (
          <div className="w-full">
            <label className="text-lg font-semibold" htmlFor="discountedPrice">
              discounted price
            </label>
            <div className="flex items-center gap-x-7">
              <input
                className="px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded text-center w-full"
                type="number"
                id="discountedPrice"
                value={formData.discountedPrice}
                onChange={onChangeHandler}
                min={50}
                max={4000000000}
                required={formData.offer === "true"}
              />
              {formData.type === "rent" && <p className="w-full">$ / month </p>}
            </div>
          </div>
        )}
        <div>
          <p className="text-lg font-semibold">images</p>
          <p className="text-gray-600">
            the first image will be the cover (max 6)
          </p>
          <input
            className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-400"
            type="file"
            id="images"
            onChange={onChangeHandler}
            accept=".jpg,.png,.jpeg"
            multiple
            required
          />
        </div>
        <button
          className="w-full px-7 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white uppercase font-medium text-sm rounded shadow-md"
          type="submit"
        >
          create listing
        </button>
      </form>
    </main>
  );
};

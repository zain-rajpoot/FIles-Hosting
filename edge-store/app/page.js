"use client";

import { useEdgeStore } from '../lib/edgestore';
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState();
  const [Hidebtn, setHidebtn] = useState(false);
  const [Progress, setProgress] = useState();
  const [url, setUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const { edgestore } = useEdgeStore();
  return (
    <>

      <form
        className="h-screen flex gap-3 justify-center items-center"
        onSubmit={async (e) => {
          e.preventDefault()
          if (file) {
            const res = await edgestore.publicFiles.upload({
              file,
              onProgressChange: (progress) => {
                if (progress) {
                  setHidebtn(true)
                  setProgress(progress)
                }
                console.log(progress);
              },
            });
            console.log(res);
            setUrl(res?.url.toString());
            setHidebtn(false)
            setFile()
          }
        }}>
        <div className="flex flex-col gap-5">
          {file ?
            <div className="relative text-center flex flex-col gap-2">
              <h3>Selected Image</h3>
              <button
                onClick={() => {
                  setFile()
                  setImageUrl('');
                }}
                className="absolute top-0 right-0 text-white px-3.5 py-2 rounded-full border-2 border-red-600 bg-red-600/50">X</button>
              <img
                className="object-contain object-center w-96 h-96"
                alt={"Selected"}
                src={imageUrl}
              />
              {Progress &&
                <progress className='cursor-progress w-full rounded bg-red-600 text-red-500 ' value={Progress} max="100">
                  {Progress + "%"}
                </progress>
              }
            </div>
            :
            <label className="cursor-pointer h-96 w-96 flex justify-center items-center bg-red-600/20 border-2 border-dashed text-white border-red-600">
              <span className="text-white">Upload here</span>
              <input
                hidden
                type="file"
                required
                accept="image/*"
                onChange={(e) => {
                  setFile(e.target.files?.[0]);
                  setImageUrl(URL.createObjectURL(e.target.files?.[0])); // Set imageUrl when selecting a file
                }}
              />
            </label>
          }
          {Hidebtn ?
            null :
            <button className="bg-red-600 p-3">
              Upload
            </button>
          }
          {url &&
            <div className="text-center text-wrap break-words w-96 text-white text-sm">
              <a target="_blank" href={url}>{url}</a>
            </div>
          }
        </div>
      </form>
    </>
  );
}

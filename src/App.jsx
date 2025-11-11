import axios from 'axios'
import React, { useEffect, useState } from 'react'
import 'remixicon/fonts/remixicon.css'


1
2
// curl -H "Authorization: YOUR_API_KEY" \
//   "https://api.pexels.com/v1/search?query=people"


const API_KEY = "8pKShJtHfEcwdUFHHkZWeqLKsrk1dYuvfgqp6FGCPQCo6p8VibQkICcI";

const option = {
  headers : {
    authorization: API_KEY,
  }
}

const App = () => {

  const [imageData, setImageData] = useState([]);
  const[page, setPage] = useState(1);
  const [query, setQuery]  = useState("nature")
  // console.log(imageData.photos);
  

async function fetchData(){
  let {data} = await axios.get(`https://api.pexels.com/v1/search?query=car&page=1&per_page=12`, option);
  
  setImageData(data.photos);
  console.log(data)
 }

 const searchBar= (e) =>{
  e.preventDefault();

  const val =  e.target.value;
  console.log(val);
  

 }

 useEffect(()=>{
  fetchData()
 }, [])

  return (
    <div className='min-h-screen bg-gray-200 py-12'>
      <h1 className='font-bold text-4xl text-indigo-600 text-center '> 📸 Image Gallery - Nature</h1>
      <form action="" className='text-center mt-12' onSubmit={searchBar}>
        <input  className='p-3 bg-white rounded-l-xl w-[350px]' placeholder='🔍search here' />
        <button className='bg-indigo-600 p-3 px-8 rounded-r-xl hover:scale-105 transition-transform duration-300 text-white font-bold '
        type='submit'>Search</button>
      </form>

      <div className='grid grid-cols-4 gap-12 p-12'>
        {
          imageData.map((item,index)=>(
            <div key={index} className='p-2 rounded-xl flex flex-col justify-between'>
              <img src={item.src?.medium} alt="" className='rounded-xl h-[180px] w-full object-cover hover:scale-105 transition-transform duration-300' />

              <a href=""> <i className  ="ri-download-line mr-1"></i> Download</a>
              <p>{item.photographer}</p>
            </div>
            
          ))
        }
      </div>
    </div>
  )
}

export default App

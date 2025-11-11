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
  const [query, setQuery]  = useState("nature");
  const [loading, setLoading] = useState(false);
  // console.log(imageData.photos);
  

async function fetchData(){
  try{
    setLoading(true);

    let {data} = await axios.get(`https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=12`, option);
    
    setImageData((prev)=>([...prev, ...data.photos]));
    // console.log(data)
  } catch(error){
    console.log(error)
  } finally{
      setLoading(false)
  }
 }

 const searchBar= (e) =>{
  e.preventDefault();

  const val =  e.target[0].value.trim();
  setImageData([])
  setQuery(val);
  console.log(query)


 }
const LoadMoreImage = () =>{
  setPage(page + 1);
  console.log(page)
}


 useEffect(()=>{
  fetchData()
 }, [page,query])

 

  return (
    <div className='min-h-screen bg-gray-200 py-12'>
      <h1 className='font-bold text-4xl text-indigo-600 text-center '> 📸 Image Gallery - Nature</h1>
      <form action="" className='text-center mt-12' onSubmit={searchBar}>
        <input  className='p-3 bg-white rounded-l-xl w-[350px] ' placeholder='🔍search here' />
        <button className='bg-indigo-600 p-3 px-8 rounded-r-xl hover:scale-105 transition-transform duration-300 text-white font-bold '
        type='submit'>Search</button>
      </form>

      <div className='w-full flex justify-center'>

      {
        loading &&  <i className="ri-loader-line inline-block text-5xl text-green-700 animate-spin"></i>
      }
      </div>

      <div className='grid grid-cols-4 gap-12 p-12'>
        {
          imageData.map((item,index)=>(
            <div key={index} className='max-w-sm bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-2'>

            <img src={item.src?.medium} alt="" className='w-full h-48 object-cover' />

            <div className='p-2 rounded-xl flex  items-center justify-between '>
              <a href={item.url} target='_blank' className='block text-xl font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-200'> <i className  ="ri-download-line mr-1"></i> Download</a>
              <p className='mt-2 text-gray-600 text-xl'>{item.photographer}</p>
            </div>
            </div>
            
          ))
        }
      </div>
      <div className='w-full text-center'>

        <button className='py-2 px-16 bg-blue-200 rounded-xl text-blue-900 cursor-pointer hover:bg-blue-500' onClick={LoadMoreImage}>Load More</button>
      </div>
    </div>
  )
}

export default App

import axios from 'axios';
import { useState, useEffect } from 'react'
import { Appwrite } from 'appwrite';

// Init your Web SDK
const appwrite = new Appwrite();

appwrite
  .setEndpoint('http://localhost:8080/v1') // Your Appwrite Endpoint
  .setProject('627d1ff6b672cf951da8') // Your project ID;

  const addBookmark = (url, userId) => {
    console.log(userId)
    let promise = appwrite.database.getDocument('627d22ce27e7cbe044a2', userId);

    promise.then(response => {
        const savedMemesArr = response.savedMemesArr;
        console.log(savedMemesArr);
        const newSavedMemesArr = [...savedMemesArr, url];
        appwrite.database.updateDocument(
          '627d22ce27e7cbe044a2',
          userId,
          {
            savedMemesArr: newSavedMemesArr
          }
        )
    })
    promise.catch(error => {
      console.log(error);
    })
  }
  
  const deleteBookmark = (url, userId) => {
    const promise= appwrite.database.getDocument(
      '627d22ce27e7cbe044a2',
      userId
    )
    promise.then(response => {
      const savedMemesArr = response.savedMemesArr;
      const newSavedMemesArr = savedMemesArr.filter(meme => meme !== url);
      appwrite.database.updateDocument(
        '627d22ce27e7cbe044a2',
        userId,
        {
          savedMemesArr: newSavedMemesArr
        }
      )
    })
  } 

const Home = ({userId}) => {
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [data, setData] = useState(null)
    const [saved, setSaved] = useState([])

    useEffect(() => {
        axios.get('https://meme-api.herokuapp.com/gimme/memes')
        .then(res => {
        setData(res.data)
        })
    }, [])

    const loadMore = () => {
        const res = axios.get('https://meme-api.herokuapp.com/gimme/memes')
        res.then(res => {
        setData(res.data)
        setIsBookmarked(false)
        })
    }

    const removeSaved = (url) => {
        const promise = appwrite.database.getDocument(
          '627d22ce27e7cbe044a2',
          userId
        )
        promise.then(response => {
          const savedMemesArr = response.savedMemesArr;
          const newSavedMemesArr = savedMemesArr.filter(meme => meme !== url);
          appwrite.database.updateDocument(
            '627d22ce27e7cbe044a2',
            userId,
            {
              savedMemesArr: newSavedMemesArr
            }
          )
          setSaved(newSavedMemesArr)
        })
    }

    const toggleBookmark = (url) => {
        if(isBookmarked) {
            deleteBookmark(url, userId)
            setIsBookmarked(false)
            const x = saved.filter(meme => meme !== url)
            setSaved(x)
        } else {
            addBookmark(url, userId)
            setIsBookmarked(true)
            setSaved([...saved, url])
        }
    }
    
    const handleSignout = () => {
        localStorage.removeItem('userId')
        localStorage.removeItem('username')
        localStorage.removeItem('password')
        window.location.reload()
    }

    const toggleSaved = ()=>{
      if(saved.length === 0){
        appwrite.database.getDocument('627d22ce27e7cbe044a2', userId)
        .then(response => {
            setSaved(response.savedMemesArr)
            console.log(saved)
        })}
        else{
          setSaved([])
          console.log('fewf')
        }
    }

    if (!data) return <div>loading...</div>
    if(!data.preview[3]){
        loadMore()
    }

    return (
        <div className="flex flex-col justify-center items-center p-4 min-h-screen bg-gray-100 relative">
        <button className='bg-red-300 py-1 px-2 rounded-md absolute top-3 left-3' onClick={toggleSaved}>
            Saved
        </button>
        <button className='bg-red-300 py-1 px-2 rounded-md absolute top-3 right-3' onClick={handleSignout}>
          Sign Out
        </button>
        <div className='flex'>
            <div className='absolute left-3 h-screen overflow-y-scroll p-4 scrollbar-hide'>
            {saved && saved.map(meme => {
              return (
                <div className='grid-item my-5 shadow-md cursor-pointer hover:shadow-lg p-2 rounded-lg bg-white relative origin-top transition duration-300' key={meme.slice(15)}>
                  <img src={meme} className="w-80" alt='meme' onClick={()=>removeSaved(meme)}/>
                </div>
              )
            })}
          </div>
          <div className="shadow-md hover:shadow-lg p-2 rounded-lg bg-white relative origin-top hover:scale-110 transition duration-300">
              <img src={data.preview[3]} alt="" width={400} className="rounded" />
              <div className="w-5 mt-2 hover:cursor-pointer" onClick={()=>toggleBookmark(data.preview[3])}>
              <svg className={isBookmarked?'fill-black':''} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              </div>
          </div>
        </div>
        <div className="mt-20 bg-blue-400 px-3 py-1 rounded-md text-white hover:shadow-lg hover:scale-110 text-2xl">
            <button onClick={loadMore}>new</button>
        </div>
        <div className='absolute right-2 bottom-2'>
        <img src="https://i.ibb.co/T2zx0cW/Screenshot-2022-05-13-at-3-12-55-AM.png" className='w-20 rounded-lg' alt=""/>
        </div>
        </div>
    );
}
 
export default Home;
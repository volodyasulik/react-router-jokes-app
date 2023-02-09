import { useEffect} from "react"
import {  getJokes } from "../../API/firebase-api"
import useHttp from "../../Hooks/use-http"
import JokeList from "../jokes/JokeList"
import NoJokesFound from "../jokes/NoJokesFound"
import Loader from "../UI/Loader"



const Jokes = () => {
    const {sendHttpRequest,error,status,data: jokes} =  useHttp(getJokes,true)
    useEffect(()=>{sendHttpRequest()},[sendHttpRequest])
    if(status === 'pending'){
        return <div className='centered'>
            <Loader />
        </div>
    }
   if(error){
     return <div className="centered focused">{error}</div>
   }
    if(status === 'complead' && (!jokes || jokes.length === 0)){
        return <NoJokesFound />
    }
    return <JokeList jokes={jokes}/>
}

export default Jokes
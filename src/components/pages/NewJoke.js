import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { addJoke } from "../../API/firebase-api"
import useHttp from "../../Hooks/use-http"
import JokeForm from "../jokes/JokeForm"

const NewJoke = () => {
    const history = useHistory()
    const {sendHttpRequest,status} = useHttp(addJoke)
    useEffect(()=>{
      if(status === 'completed')
      {return history.push('/jokes')} 
    },[status,history])
    const addJokeHandler = (jokeData) => {
    sendHttpRequest(jokeData);
    };
return <JokeForm isLoading={status === 'pending'} onAddJoke={addJokeHandler}/>
}

export default NewJoke
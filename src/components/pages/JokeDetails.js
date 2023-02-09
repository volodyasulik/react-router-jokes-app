import { Fragment, useEffect } from "react"
import { Link, Route, useParams } from "react-router-dom"
import { getJoke } from "../../API/firebase-api"
import useHttp from "../../Hooks/use-http"
import Comments from "../comments/Comments"
import HighlightedJoke from "../jokes/HighlightedJoke"
import NoJokesFound from "../jokes/NoJokesFound"
import Loader from "../UI/Loader"


const JokeDetails = () => {
    const {sendHttpRequest,data: loadedJoke,status,error} = useHttp(getJoke,true)
    const urlUserNow = useParams()
    useEffect(()=>{sendHttpRequest(urlUserNow.jokesList)},[sendHttpRequest,urlUserNow.jokesList]) 
    if(status === 'pending'){
        return <div className='centered'>
            <Loader />
        </div>
    }
   if(error){
     return <div className="centered focused">{error}</div>
   }
    if (!loadedJoke){
        return <NoJokesFound />
    }
    
return (
<Fragment>
 <HighlightedJoke text={loadedJoke.text} topic={loadedJoke.topic}/>
    <Route path={`/jokes/${urlUserNow.jokesList}`} exact>
    <div className="centered">
        <Link to={`/jokes/${urlUserNow.jokesList}/comments/${urlUserNow.jokesList}C`}>Add Comments</Link>
    </div>
    </Route>
    <Route path={`/jokes/${urlUserNow.jokesList}/comments/:commentId`}>
        <Comments />
    </Route>
</Fragment>)

}

export default JokeDetails
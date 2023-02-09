import { useEffect, useRef } from 'react';
import { addComment } from '../../API/firebase-api';
import useHttp from '../../Hooks/use-http';
import Loader from '../UI/Loader';

import styles from './NewCommentForm.module.css';

const NewCommentForm = (props) => {
 const {sendHttpRequest,status,error} = useHttp(addComment)

   const commentTextRef = useRef();
 const {onCommentAdded} = props
useEffect(()=>{
  if(status === 'completed' && !error){
    return onCommentAdded()
  }
},[status,error,onCommentAdded])

  const submitFormHandler = (event) => {
    event.preventDefault();    
    const comment = commentTextRef.current.value
    sendHttpRequest({
      jokeId: props.jokeId,
      commentData:comment
    })
   
    if(error){
      return <div className="centered focused">{error}</div>
    }
  };

  return (
    <form className={styles.form} onSubmit={submitFormHandler}>
      {status === 'pending' && 
      <div className='centered'>
          <Loader />
      </div>}
      <div className={styles.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={styles.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;

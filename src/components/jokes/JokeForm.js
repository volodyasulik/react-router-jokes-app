import { useRef, useState } from 'react';
import { Prompt } from 'react-router-dom';
import Card from '../UI/Card';
import Loader from '../UI/Loader';
import styles from './JokeForm.module.css';

const JokeForm = (props) => {
  const [formInForFocus,setFormFocus] = useState(false)
  const topicInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredTopic = topicInputRef.current.value;
    const enteredText = textInputRef.current.value;

    props.onAddJoke({ topic: enteredTopic, text: enteredText });

    // history.push('/jokes')
  }

  const onFocusHandler = () => {
    setFormFocus(true)
  }

  const sendJokeHandler = () => {
    setFormFocus(false)
  }
  return (
    <Card>
      <Prompt when={formInForFocus} message={((location) => 'Do you realy want to leave this page ?')}/>
      <form onFocus={onFocusHandler} className={styles.form} onSubmit={submitFormHandler}>
        {props.isLoading && (
          <div className={styles.loading}>
            <Loader />
          </div>
        )}

        <div className={styles.control}>
          <label htmlFor='topic'>Topic</label>
          <input type='text' id='topic' ref={topicInputRef} />
        </div>
        <div className={styles.control}>
          <label htmlFor='text'>Text</label>
          <textarea id='text' rows='5' ref={textInputRef}></textarea>
        </div>
        <div className={styles.actions}>
          <button onClick={sendJokeHandler} className='btn'>Add Joke</button>
        </div>
      </form>
    </Card>
  );
};

export default JokeForm;

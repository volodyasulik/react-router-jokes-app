import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import JokeItem from './JokeItem';
import styles from './JokeList.module.css';

const sortJoke = (joke,isAscending) => {
  return joke.sort((joke1,joke2)=> {
    if(isAscending){
     return joke1.id > joke2.id  ? 1 : -1
    } else {
      return joke1.id  < joke2.id  ? 1 : -1
    }
  })
}

const JokeList = (props) => {
 const history = useHistory()
 const location = useLocation()

 const queryParams = new URLSearchParams(location.search)
 const sortingOrder = queryParams.get('sort')
 const isAscending = sortingOrder === 'asc'

 const toggleSortHandler = () => {
history.push('/jokes?sort='+(isAscending ? 'des' : 'asc'))
sortJoke(props.jokes,isAscending) 
  }
  return (
    <Fragment>     
      <div className={styles.sort}> 
        <button onClick={toggleSortHandler}>Sort Jokes {isAscending ? 'Descending' : 'Ascending'}</button>
      </div>    
      <ul className={styles.list}>
        {props.jokes.map((joke) => (
          <JokeItem
            key={joke.id}
            id={joke.id}
            topic={joke.topic}
            text={joke.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default JokeList;

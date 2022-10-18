import {useState, useEffect} from 'react'
import { EventsList } from './EventsList/EventsList';
import { fetchApi } from 'fetchApi/fetchApi';

export const App = () => {
  const [events, setEvents] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (isShown) {
      fetchApi(page).then(resp => setEvents(prevEvents => 
        [...prevEvents, ...resp.data._embedded.events]))
    }
  }, [isShown, page])

  const showEvents = () => {
    setIsShown(true)
  }

  const loadMore = () => {
    setPage(prevPage => prevPage + 1)
  }

  const deleteEvent = (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.filter(event => event.id !== eventId))
  }

  return (
    <>
      {isShown && <EventsList events={events} deleteEvent={deleteEvent} />}
      {!isShown && (<button type='button' onClick={showEvents}>Show events</button>)}
      {isShown && (<button type='button' onClick={loadMore}>Load more</button>)}
    </>
  )
}
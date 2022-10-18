import { useState, useEffect, useContext } from 'react';
import { EventsList } from './EventsList/EventsList';
import { fetchApi } from 'fetchApi/fetchApi';
import { AuthContext } from 'authContext/AuthContext';
import { AuthNav } from './AuthNav/AuthNav';

export const App = () => {
  const [events, setEvents] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [page, setPage] = useState(1);

  const { isAuth } = useContext(AuthContext);

  useEffect(() => {
    if (isShown) {
      fetchApi(page).then(resp =>
        setEvents(prevEvents => [...prevEvents, ...resp.data._embedded.events])
      );
    }
  }, [isShown, page]);

  const showEvents = () => {
    setIsShown(true);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const deleteEvent = eventId => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
  };

  return (
    <>
      <AuthNav />
      {isShown && <EventsList events={events} deleteEvent={deleteEvent} />}
      {!isAuth && <p>You need authorization</p>}
      {!isShown && isAuth && (
        <button type="button" onClick={showEvents}>
          Show events
        </button>
      )}
      {isShown && (
        <button type="button" onClick={loadMore}>
          Load more
        </button>
      )}
    </>
  );
};

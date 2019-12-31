import React, { useEffect, useState, useRef } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './InfiniteScroll.modules.scss';

const id = 'Inifinite-scroll-container';

const InfiniteScroll = ({
  dataLength,
  fetchNext = () => {},
  hasMore,
  children
}) => {
  const [shouldShowLoader, setShouldShowLoader] = useState(false);
  const hasFetched = useRef(false);

  const hasReachedBottom = element => {
    return element
      ? element.getBoundingClientRect().bottom - 50 <= window.innerHeight
      : false;
  };

  const onEndReached = () => {
    const element = document.getElementById(id);
    if (hasReachedBottom(element) && hasMore) {
      // Prevent fetchNext from being called multiple times
      if (hasFetched.current) return;

      hasFetched.current = true;
      setShouldShowLoader(true);
      fetchNext();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onEndReached);

    return () => window.removeEventListener('scroll', onEndReached);
  });

  useEffect(() => {
    setShouldShowLoader(false);
    hasFetched.current = false;
  }, [dataLength]);

  return (
    <>
      <div className={styles.container} id={id}>
        {children}
      </div>
      <div className={styles.container}>
        {shouldShowLoader ? <CircularProgress /> : null}
      </div>
    </>
  );
};

export default InfiniteScroll;

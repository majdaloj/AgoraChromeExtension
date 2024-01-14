import { useState, useEffect } from 'react';
type HistoryData = HistoryItem[]; // Adjust the type according to your actual data structure

// a function to send history data to the server
function sendHistoryToServer(historyData: HistoryData) {
  fetch('http://localhost:3001/storeHistory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ history: historyData }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Server response:', data.message);
    })
    .catch((error) => {
      console.error('Error sending history to server:', error);
    });
}

export const useMaxResults = (defaultMaxItems: number): number => {
  const [maxItems, setMaxItems] = useState<number>(defaultMaxItems);

  useEffect(() => {
    const scrollListener = () => {
      const { scrollHeight, clientHeight, scrollTop } = document.body;
      if (scrollHeight - clientHeight - scrollTop <= 50) {
        setMaxItems((maxItems) => maxItems + 10);
      }
    };

    document.body.addEventListener('scroll', scrollListener);
    return () => {
      document.body.removeEventListener('scroll', scrollListener);
    };
  }, []);

  return maxItems;
};

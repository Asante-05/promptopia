import fetch from 'node-fetch';

async function checkTimeSync() {
  try {
    const response = await fetch('http://worldtimeapi.org/api/timezone/Etc/UTC');
    const data = await response.json();
    const serverTime = new Date();
    const apiTime = new Date(data.utc_datetime);
    const timeDifference = Math.abs(serverTime - apiTime) / 1000; // difference in seconds

    console.log(`Time difference: ${timeDifference} seconds`);
    if (timeDifference > 5) { // threshold in seconds
      console.error('Server time is out of sync with UTC time');
    } else {
      console.log('Server time is synchronized with UTC time');
    }
  } catch (error) {
    console.error('Error fetching time:', error);
  }
}

export default checkTimeSync();

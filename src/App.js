import './App.css';
import { useState, useEffect} from 'react';

function App() {
 const [catImage, setCatImage] = useState('');
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 useEffect (() => {
  const fetchCatImage = async () => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=1&size=full', {
        headers: {
          'x-api-key': 'yourapi'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch cat image');
      }
      const data = await response.json();
      setCatImage(data[0].url);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const lastFetchDate = localStorage.getItem('lastFetchDate');
  const currentDate = new Date().toDateString();

  if (lastFetchDate !== currentDate) {
    fetchCatImage();
    localStorage.setItem('lastFetchDate', currentDate);
  } else {
    const cachedImageUrl = localStorage.getItem('cachedImageUrl');
    if (cachedImageUrl) {
      setCatImage(cachedImageUrl);
      setLoading(false);
    } else {
      fetchCatImage();
    }
  }
}, []);

useEffect(() => {
  if (catImage) {
    localStorage.setItem('cachedImageUrl', catImage);
  }
}, [catImage]);

if (loading) return <div>Cat is loading...</div>;
if (error) return <div>{error}</div>;

 return (
  <div className="App">
    <h1>Cat of the Day</h1>
    <img src={catImage} alt="Cat of the day" style={{ maxWidth: '100%', height: 'auto'}} />
  </div>
 )
}

export default App;

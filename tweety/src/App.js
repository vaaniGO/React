import React, { useState } from 'react';
import TweetInput from './TweetInput.js';
import TweetList from './TweetList.js';
import './App.css';

function App() {
  const [refresh, setRefresh] = useState(false);

  // Function to trigger refresh of tweet list
  const refreshTweets = () => {
    setRefresh(!refresh);
  };

  return (
    <div class = "TopContent" >
      <h1 class = "AppTitle">One-person Twitter</h1>
      <h3 class = "AppSubtitle" >Because I hate people!</h3>
      <TweetInput onTweetPosted={refreshTweets} />
      <TweetList key={refresh} />
    </div>
  );
}

export default App;

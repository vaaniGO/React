import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TweetList.css';

const TweetList = () => {
  const [tweets, setTweets] = useState([]);

  const fetchTweets = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/tweets');
      setTweets(response.data);
    } catch (error) {
      console.error("Error fetching tweets:", error);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <div class = "TweetsList">
      {tweets.map((tweet) => (
        <div class="TweetID" key={tweet.id}>
          <h5 class = "UserName" >@Vaani</h5>
          <p class = "TweetText" >{tweet.text}</p>
          <p class="TweetTimeStamp" >Posted on: {new Date(tweet.timestamp).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default TweetList;

import React, { useState, useEffect, useRef } from "react";
import { TStory } from "@/types/stories";

type TStoryViewProps = {
  story: TStory;
  onClose: () => void;
};

const StoryView: React.FC<TStoryViewProps> = ({ story, onClose }) => {
  // State to track the current image index
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Ref to store the interval ID for clearing the interval later
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start or restart the image slideshow interval
    const startInterval = () => {
      intervalId.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % story.images.length;
          if (nextIndex === 0) {
            onClose(); // Close story view when reaching the end
          }
          return nextIndex;
        });
      }, 5000);
    };

    startInterval();

    // Clean up the interval on component unmount or dependency change
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [story.images.length, onClose]);

  // Restart the interval to reset the slideshow timer
  const restartInterval = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
    intervalId.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % story.images.length;
        if (nextIndex === 0) {
          onClose(); // Close story view when reaching the end
        }
        return nextIndex;
      });
    }, 5000);
  };

  // Handle clicking on the timeline to jump to a specific image
  const handleTimelineClick = (index: number) => {
    setCurrentIndex(index);
    restartInterval();
  };

  // Handle clicking on the image to navigate through images
  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const { clientX } = event;
    const clickPosition = (clientX - rect.left) / rect.width;

    // Navigate images based on click position
    if (currentIndex === 0 && clickPosition < 0.33) {
      return;
    } else if (clickPosition < 0.33) {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex - 1 + story.images.length) % story.images.length
      );
    } else if (clickPosition > 0.33) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % story.images.length);
    }

    restartInterval();
  };

  return (
    <div className="containerForStories">
      <div className="containerForStoriesView">
        {/* Timeline indicators for image navigation */}
        <div className="timelines">
          {story.images.map((_, index) => (
            <div
              key={index}
              className={`timeline ${index === currentIndex ? "active" : ""} ${
                index < currentIndex ? "completed" : ""
              }`}
              onClick={() => handleTimelineClick(index)}
            ></div>
          ))}
        </div>

        {/* Story user information and action button */}
        <div className="storyUserInfo">
          <div className="profileInfo">
            <img src={story.profilePicture} alt={`Profile of ${story.username}`} />
            <div className="ProfileName">
              <h1>{story.username}</h1>
              <h5>Today, 12:30</h5>
            </div>
          </div>
          <div className="actionButton">
            <button onClick={onClose}>X</button>
          </div>
        </div>

        {/* Display current story image */}
        <div className="storyImageContainer">
          <img
            src={story.images[currentIndex]}
            alt={`story ${currentIndex}`}
            onClick={handleImageClick}
          />
        </div>
      </div>
    </div>
  );
};

export default StoryView;

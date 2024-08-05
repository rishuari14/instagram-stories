import React, { useState, useEffect, useRef } from "react";

import { TStory } from "@/types/stories";

type TStoryViewProps = {
  story: TStory;
  onClose: () => void;
};

const StoryView: React.FC<TStoryViewProps> = ({ story, onClose }) => {
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startInterval = () => {
      intervalId.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % story.images.length;
          if (nextIndex === 0) {
            onClose();
          }
          return nextIndex;
        });
      }, 5000);
    };

    startInterval();

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [story.images.length, onClose]);

  const restartInterval = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
    intervalId.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % story.images.length;
        if (nextIndex === 0) {
          onClose();
        }
        return nextIndex;
      });
    }, 5000);
  };

  const handleTimelineClick = (index: number) => {
    setCurrentIndex(index);
    restartInterval();
  };

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const { clientX } = event;
    const clickPosition = (clientX - rect.left) / rect.width;

    if (clickPosition < 0.33) {
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
        <div className="storyUserInfo">
          <div className="profileInfo">
            <img src={story.profilePicture} alt={`story ${currentIndex}`} />
            <div className="ProfileName">
              <h1>{story.username}</h1>
              <h5>Today,12:30</h5>
            </div>
          </div>
          <div className="actionButton">
            <button onClick={onClose}>X</button>
          </div>
        </div>

        <div className="storyImageContainer">
          {/* <div className="overlay"></div> */}

          <img
            src={story.images[currentIndex]}
            alt={`story ${currentIndex}`}
            onClick={handleImageClick}
          />
        </div>
        {/* <div className={styles.storyControls}>
          <button onClick={handlePrev}>&lt;</button>
          <button onClick={onClose}>X</button>
          <button onClick={handleNext}>&gt;</button>
        </div> */}
      </div>
    </div>
  );
};

export default StoryView;

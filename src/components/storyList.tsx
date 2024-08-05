import React from "react";

//types import
import { TStory } from "@/types/stories";


interface TStoryListProps {
  stories: TStory[];
  onStorySelected: (storyId: number) => void;
}

const StoryList: React.FC<TStoryListProps> = ({ stories, onStorySelected }) => {

  const handleStoryPress = (index: number) => {
    onStorySelected(stories[index].id);
  };

  return (
    <div className="containerForStories">
      <div className="logo">
      <img src="/images/instagramLogo.png" alt="instagram"></img>
      </div>
    
      <div className="stories">
        {stories.map((story, index) => (
          <div
            key={story.id}
            className="story"
            onClick={() => handleStoryPress(index)}
          >
            <img
              src={story.profilePicture}
              alt={story.username}
            />
            <p>{story.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryList;

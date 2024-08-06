import React from "react";

// Importing TypeScript types for story data
import { TStory } from "@/types/stories";

// Defining props for the StoryList component
interface TStoryListProps {
  stories: TStory[];
  onStorySelected: (storyId: number) => void;
}

const StoryList: React.FC<TStoryListProps> = ({ stories, onStorySelected }) => {
  // Function to handle story selection
  const handleStoryPress = (index: number) => {
    onStorySelected(stories[index].id);
  };

  return (
    <div className="containerForStories">
      {/* Logo section */}
      <div className="logo">
        <img src="/images/instagramLogo.png" alt="Instagram logo" />
      </div>

      {/* List of stories */}
      <div className="stories">
        {stories.map((story, index) => (
          <div className="story" key={story.id}>
            {/* Story image */}
            <div
              className="storyImage"
              onClick={() => handleStoryPress(index)}
            >
              <img src={story.profilePicture} alt={story.username} />
            </div>
            {/* Username display */}
            <div className="storyUsername">
              {story.username}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryList;

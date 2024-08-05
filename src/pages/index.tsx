import React, { useEffect, useState } from "react";

//components import
import StoryList from "@/components/storyList";
import StoryView from "@/components/storyView";

//apiRequest import
import { getData } from "@/apiRequest/stories";

//types import
import { TStory } from "@/types/stories";

export default function Home() {
  const [selectedStory, setSelectedStory] = useState<number | null>(null);
  const [storiesData, setStoriesData] = useState<TStory[]>([]);

  const handleStorySelect = (storyId: number) => {
    setSelectedStory(storyId);
  };

  const handleCloseStory = () => {
    setSelectedStory(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setStoriesData(data);
      } catch (error) {
        console.log("error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {selectedStory ? (
        <StoryView
          story={storiesData.find((story) => story.id === selectedStory)!}
          onClose={handleCloseStory}
        />
      ) : (
        <StoryList stories={storiesData} onStorySelected={handleStorySelect} />
      )}
    </div>
  );
}

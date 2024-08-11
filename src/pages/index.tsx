import React, { useEffect, useState } from "react";

// Importing components for displaying stories
import StoryList from "@/components/storyList";
import StoryView from "@/components/storyView";

// Importing the API request function and TypeScript types
import { getData } from "@/apiRequest/stories";
import { TStory } from "@/types/stories";

export default function Home() {
  // State to track the selected story and the fetched stories
  const [selectedStory, setSelectedStory] = useState<number | null>(null);
  const [storiesData, setStoriesData] = useState<TStory[]>([]);

  // Function to select a story by ID
  const handleStorySelect = (storyId: number) => {
    setSelectedStory(storyId);
  };

  // Function to clear the selected story (close the view)
  const handleCloseStory = () => {
    setSelectedStory(null);
  };

  // Fetch stories data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setStoriesData(data);
        const ipResponse = await fetch("https://ipapi.co/json/");
        const ipData = await ipResponse.json();

        // Send IP data to your API
        await fetch("/api/location", {
          // Adjust this path to your API route
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ipData),
        });
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Conditionally render StoryView if a story is selected; otherwise, render StoryList */}
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

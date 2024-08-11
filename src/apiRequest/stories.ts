export async function getData() {
  const response = await fetch("/api/stories");

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}


export async function getLocation() {
  const response = await fetch("/api/location");

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}
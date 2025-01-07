export const getNews = async () => {
  const newsURL = `${process.env.NEXT_PUBLIC_API_URL}/main/news`;

  const response = await fetch(newsURL);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const result = await response.json();
  return result;
};

export const getYoutube = async () => {
  const youtubeURL = `${process.env.NEXT_PUBLIC_API_URL}/main/youtube`;

  const response = await fetch(youtubeURL);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const result = await response.json();
  return result;
};

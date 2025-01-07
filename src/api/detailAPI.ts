export const getIdentityDetail = async (id: number) => {
  const identityURL = `${process.env.NEXT_PUBLIC_API_URL}/dictionary/identity/${id}`;

  const response = await fetch(identityURL);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const result = await response.json();
  return result;
};

export const getEgoDetail = async (id: number) => {
  const identityURL = `${process.env.NEXT_PUBLIC_API_URL}/dictionary/ego/${id}`;

  const response = await fetch(identityURL);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const result = await response.json();
  return result;
};

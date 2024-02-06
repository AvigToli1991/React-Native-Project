const Shuffle = (array) => {
  const shuffledArray = array.slice(); // Create a copy of the original array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
    if (i !== j && shuffledArray[i] !== shuffledArray[j]) {
      // Check for duplicates
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ]; // Swap elements
    }
  }
  return shuffledArray;
};

export default Shuffle;

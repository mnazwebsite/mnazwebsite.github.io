// Function to toggle dark mode
const toggleDarkMode = () => {
  document.body.classList.toggle('dark-mode');
};

// Function to toggle news list visibility
const toggleNewsList = () => {
  const newsList = document.getElementById('newsList');
  newsList.classList.toggle('hidden');
};

// Function to toggle sentiments list visibility
const toggleSentimentsList = () => {
  const sentimentsList = document.getElementById('sentimentsList');
  sentimentsList.classList.toggle('hidden');
};

// Adding event listeners after the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const newsDropdownToggle = document.getElementById('newsDropdownToggle');
  const sentimentsDropdownToggle = document.getElementById('sentimentsDropdownToggle');

  darkModeToggle.addEventListener('click', toggleDarkMode);
  newsDropdownToggle.addEventListener('click', toggleNewsList);
  sentimentsDropdownToggle.addEventListener('click', toggleSentimentsList);
});


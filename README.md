# Fave Movie Tracker

## 🚀 Live Demo

[https://fave-movie-tracker.vercel.app/](#)

## 📝 Setup Instructions

```bash
git clone https://github.com/your-username/fave-movie-tracker.git
cd fave-movie-tracker
npm install
npm run dev
```

## 🗂️ Code Structure & Decisions

This project is structured to maximize code clarity, reusability, and maintainability while meeting all challenge requirements:

- **App Structure:**

  - The app uses the Next.js App Router, with pages and layout separated for clarity.
  - Shared UI elements like the Navbar are placed in the layout so they appear on all pages.

- **State Management:**

  - Global state (shows, search query, loading/error states) is managed using React Context (`ShowContext`).
  - Local state (favorites, UI interactions) is managed with `useState` in each page/component.

- **Data Fetching:**

  - A custom hook (`useFetchShows`) handles API requests, loading, and error states, keeping data logic separate from UI.

- **Helpers:**

  - Helper functions are used for grouping, sorting, and generating shows, making logic reusable and testable.

- **Component Design:**

  - Reusable components (e.g., `MovieCard`, `HoverPopup`, `Navbar`) are used across pages to avoid duplication and keep UI consistent.

- **UI/UX:**

  - Tailwind CSS is used for rapid, responsive styling.
  - Loading, error, and empty states are handled in all major views for good user experience.

- **Search & Filtering:**

  - The search bar in the Navbar updates a global search query, which is used to filter shows on both the home and favorites pages.

- **Favorites:**
  - Favorite shows are tracked using localStorage and React state, and can be added/removed from any page.

This structure allows for easy feature expansion, code readability, and a smooth user experience.

- **State Management:**


1. I used the React Context API to store the array of shows gotten from the external api. This way I do not have to recall the api when the user lands on the favorites page.

2. Then I use useState to manage all local states on both pages.

3. I stored the searchQuery state in the context and made it available to both pages. The reason why I did this was basically just to fit with my UI design. I wanted the searchbar to be in the Navbar, but I wanted both pages to have access to what the user inserts in there. What better way to achieve this thant CONTEXT API!

### CUSTOM HOOKS

1. I created a custom hook called useFetchShows to encapsulate the logic for fetching shows from the TV Maze API. This hook manages loading and error states, making it reusable across different components if needed.

### CUSTOM HELPERS

1. Get Shows Generators: You might wonder why I decided to go with a generator function as it is not commonly used. The reason is that it allows me to yield shows one by one, which can be more memory efficient when dealing with large datasets. This way, I can process each show individually without loading the entire dataset into memory at once and for advanced feature if given more time I could implement pagination.

2. Grouped Shows Helper: I created a helper function to group shows by their first letter. This makes it easier to display shows in a structured way, such as in a sidebar or a list view. The grouping logic is encapsulated in this helper function, making it reusable across different components.

3. Sorted Shows Helper: I created a helper function to sort shows based on the user's preferred sort order (ascending or descending). This allows for a more flexible display of shows and can be easily integrated into the UI.

- **Component Design:**


1. I created a MovieCard component in other to avoid repetitions. I realised I could use them on both home page and the favorites page.
2. I created a Navbar component and put it in the layout.ts file since it is going to be showing on all pages.

- **API Integration:**

1. I used the useFetchShows custom hook to fetch data from the TV Maze API. This hook handles loading and error states internally, providing a clean interface for the components that need show data. This way, I can easily manage the fetching logic and keep my components focused on rendering.

2. I used the ShowContext to provide the fetched show data to the entire application. This allows me to avoid prop drilling and makes it easy to access the show data from any component.

- **Styling:**

1. I used Tailwind CSS for styling the application. It allows for rapid UI development with a utility-first approach, making it easy to create responsive designs.

- **Grouping, Sorting, Searching:**

1. So for the logic for grouping, sorting, and searching. I started by first filtering the shows array based on what the user types in the searchQuery. Then I went on to group the shows. I decided to create the groupedShowsHelpers function because I realised I could also use it in the favorite page. The logic is explained in the Custom helpers section above. Then I went ahead to sort the grouped objects since the instructions was to sort them in ascending order based on the show names (alphabetically). Then I rendered the sorted shows. This way I can control the UI.

2. I also implemented a search feature that allows users to quickly find their favorite shows. This was done by filtering the displayed shows based on the user's input in the search bar.

## 💡 Assumptions & Tradeoffs

1. I handled missing data by providing default values and fallbacks in the UI, ensuring a smooth user experience even when some data is unavailable.
  1. I prioritized simplicity and maintainability in the codebase, which may have resulted in some performance tradeoffs (e.g., not implementing memoization for derived state).
  2. I also did memoize some functions in other to prevent unnecessary re-renders of functions.
  3. I decided to move the groupedShowsHelpers function to a separate file for better organization and reusability.
  4. One of the major reason for going ahead with a generator function is instead of loading all shows at once, I can load them in chunks, improving performance and user experience. It also helps with lazy loading as data is fetched on demand.

## 🏗️ What Was Skipped & Why

1. I did not implement pagination for the show list due to time constraints. However, the generator function for fetching shows lays the groundwork for future pagination implementation.

2. I also was trying to implement an api based search feature but didn't have enough time to complete it. I needed to study how it works and ensure i was not putting too much load on the API and my server. So i decided to ship the initial version without it.

## 📚 Additional Notes
- Not much to say here. I enjoyed working on this project and I am looking forward to a positive response from paystack. Thank you.

Reggae Discovery

Reggae Discovery is an application that allows users to discover random reggae tracks by fetching data from the iTunes API. The app also includes a feature to view the song on Apple Music.

Table of Contents
-Installation
-Running the Project Locally
-Technologies Used
-API Integration
-Deployment
-License

Installation:

Clone the Repository

First, clone the repository to your local machine:

bash
Copy
git clone https://github.com/jacobmenlove/reggae-discovery.git
Navigate to the project directory

bash
Copy
cd reggae-discovery
Install Dependencies for Backend

Navigate to the server directory and install the required dependencies:

bash
Copy
cd server
npm install
Install Dependencies for Frontend

Navigate to the client directory and install the required dependencies:

bash
Copy
cd ../client
npm install
Running the Project Locally
Start the Backend Server

In the server directory, run the following command to start the backend server:

bash
Copy
npm run start
The server will start running on http://localhost:9999.

Start the Frontend Development Server

In the client directory, run the following command to start the frontend development server:

bash
Copy
npm run start
The frontend will be available at http://localhost:3000.

Note: The frontend and backend will communicate through the API endpoints defined in the backend (e.g., http://localhost:9999/api/random-track).

Technologies Used:
Frontend: React.js, Tailwind CSS, Framer Motion, Axios

Backend: Node.js, Express, Axios

API Integration: iTunes API (for fetching reggae tracks)

Other Tools: npm, dotenv (for environment variables)

API Integration
This project integrates with the iTunes API to fetch reggae tracks, along with their metadata (e.g., track name, artist, album, genre, etc.). The backend uses axios to send HTTP requests to the iTunes API.

API Endpoint:

GET /api/random-track: Fetches a random reggae track from the iTunes API.

Sample Response:

json
Copy
{
  "title": "Track Title",
  "artist": "Track Artist",
  "album": "Track Album",
  "genre": "Track Genre",
  "duration": "3:45",
  "artwork": "http://image-url.jpg",
  "preview": "http://preview-url.mp3",
  "trackViewUrl": "https://itunes.apple.com/track/xyz"
}
Frontend Integration:

The frontend calls the backend's /api/random-track endpoint to display the random reggae track's details (e.g., title, artist, album, artwork, etc.).

A button allows users to open the song on Apple Music using the trackViewUrl.

Deployment:
Deploying on Vercel
Frontend Deployment

The frontend is deployed to Vercel using the @vercel/static-build builder. This allows it to serve static files after building the React app.

Backend Deployment

The backend is deployed as a serverless function on Vercel using the @vercel/node builder. The backend serves API endpoints for fetching random tracks.

To deploy:

Connect your GitHub repository to Vercel.

Set up the build and deployment commands.

Vercel will automatically deploy the app on each push to the main branch.

License
This project is licensed under the MIT License - see the LICENSE file for details.


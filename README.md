# Live Collaboration Whiteboard Frontend (React)

This is the **frontend** of the Live Collaboration Whiteboard, built with **React**. It allows multiple users to draw in real-time on a shared whiteboard, with various tools and color options. Users can see each other's drawings as they happen, and the app uses **WebSockets** to synchronize the drawings in real-time.

## Features

- **Real-Time Collaboration**: Multiple users can draw on the whiteboard at the same time, and their drawings will be visible to all other connected users.
- **Drawing Tools**: Users can select from different drawing tools:
  - **Circle**
  - **Rectangle**
  - **Text** (users can enter text)
  - **Fill** (fill areas with a selected color)
- **Color Options**: Users can choose from three colors for drawing:
  - **Black**
  - **Blue**
  - **Red**
- **Clear Whiteboard**: Users can clear the whiteboard, resetting the canvas for everyone.

## Technologies Used

- **React**: The frontend is built using React to manage the user interface and state.
- **HTML5 Canvas**: Used for rendering the drawing area and handling user interactions.
- **CSS**: For styling the whiteboard and controls.
- **Socket.IO**: Handles real-time communication with the backend server to synchronize drawings across all users.

## Installation

Follow these steps to set up the frontend project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/romabulani/live-collaboration.git
   cd live-collaboration
2. Install dependencies:
    Run the following command to install all required dependencies:
    ```
    npm install
    ```
3. Start the development server:
    After installing the dependencies, run the following command to start the development server:

    ```
    npm start
    ```

This will start the app in development mode. Open your browser and go to http://localhost:3001 to view the whiteboard.

## How It Works
**Canvas Setup:** The whiteboard is rendered using the HTML5 Canvas element. The drawing area is set up where users can interact with the canvas by selecting different tools (shapes, text, etc.) and colors.

**WebSocket Communication:** The frontend connects to the backend server using Socket.IO to send and receive drawing data in real-time. Each drawing action is sent to the server and broadcast to other connected users, keeping the whiteboard synchronized.

**Drawing Tools:** Users can select the following drawing tools:
- Circle: Draw a circle on the canvas.
- Rectangle: Draw a rectangle on the canvas.
- Text: Users can input text, which is drawn at a specified location.
- Fill: Fill a selected area of the canvas with the chosen color.
- Color Options: The available drawing colors are Black, Blue, and Red .Users can switch between these colors for different drawings.
  
**Clear Whiteboard:** Users can click the "Clear" button to clear the whiteboard, resetting it for all connected users. This triggers the clear event in the backend, resetting the canvas for all clients.

## Frontend URL
The frontend is deployed and live at https://draw-on-whiteboard.netlify.app/.

## Notes
The backend server for this application can be found in the [Live Collaboration Whiteboard repository](https://github.com/romabulani/live-collaboration-whiteboard).
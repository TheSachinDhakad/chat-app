// import { useState, useEffect } from "react";
// import io from "socket.io-client";
// import { nanoid } from "nanoid";
// import "./App.css";

// const socket = io.connect("http://localhost:8000");

// const userName = nanoid(4);

// function App() {
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);

//   const sendChat = (e) => {
//     e.preventDefault();

//     socket.emit("chat", { message, userName });
//     setMessage("");
//   };

//   useEffect(() => {
//     socket.on("chat", (payload) => {
//       setChat([...chat, payload]);
//     });
//   });

//   return (
//     <div className="chat-container">
//       <h1>Chat Application</h1>

//       <div className="chat-box">
//         {chat.map((payload, index) => {
//           return (
//             <p key={index} className="chat-message">
//               <span className="chat-username">{payload.userName}</span>: {payload.message}
//             </p>
//           );
//         })}
//       </div>

//       <form onSubmit={sendChat} className="chat-form">
//         <input
//           type="text"
//           name="chat"
//           placeholder="Type your message..."
//           value={message}
//           onChange={(e) => {
//             setMessage(e.target.value);
//           }}
//         />

//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// }

// export default App;
// import { useState, useEffect } from "react";
// import io from "socket.io-client";
// import { nanoid } from "nanoid";
// import "./App.css";

// const socket = io.connect("http://localhost:8000");

// const userName = nanoid(4);

// function App() {
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);

//   const sendChat = (e) => {
//     e.preventDefault();
//     if (message.trim()) {
//       socket.emit("chat", { message, userName });
//       setMessage("");
//     }
//   };

//   useEffect(() => {
//     const storedChat = JSON.parse(localStorage.getItem("chat")) || [];
//     setChat(storedChat);

//     socket.on("chat", (payload) => {
//       const newChat = [...chat, payload];
//       setChat(newChat);
//       localStorage.setItem("chat", JSON.stringify(newChat));
//     });

//     // Cleanup function to remove the event listener on component unmount
//     return () => socket.off("chat");
//   }, [chat]);

//   return (
//     <div className="chat-container">
//       <h1>Chat Application</h1>

//       <div className="chat-box">
//         {chat.map((payload, index) => (
//           <p key={index} className="chat-message">
//             <span className="chat-username">{payload.userName}</span>: {payload.message}
//           </p>
//         ))}
//       </div>

//       <form onSubmit={sendChat} className="chat-form">
//         <input
//           type="text"
//           name="chat"
//           placeholder="Type your message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />

//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// }

// export default App;


import { useState, useEffect } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";
import "./App.css";

const socket = io.connect("http://localhost:8000");

const userName = nanoid(4);

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("chat", { message, userName });
      setMessage("");
    }
  };

  const clearChat = () => {
    setChat([]);
    localStorage.removeItem("chat");
  };

  useEffect(() => {
    const storedChat = JSON.parse(localStorage.getItem("chat")) || [];
    setChat(storedChat);

    socket.on("chat", (payload) => {
      const newChat = [...chat, payload];
      setChat(newChat);
      localStorage.setItem("chat", JSON.stringify(newChat));
    });

    return () => socket.off("chat");
  }, [chat]);

  return (
    <div className="chat-container">
      <h1>Chat Application</h1>

      <div className="chat-box">
        {chat.map((payload, index) => (
          <p key={index} className="chat-message">
            <span className="chat-username">{payload.userName}</span>: {payload.message}
          </p>
        ))}
      </div>

      <form onSubmit={sendChat} className="chat-form">
        <input
          type="text"
          name="chat"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>

      <button onClick={clearChat} className="clear-button">Clear Chat</button>
    </div>
  );
}

export default App;

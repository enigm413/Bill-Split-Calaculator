import { useState } from "react";

// Define array of Initial Friends
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

//Define Main App Component
export default function App() {
  const [updatedFriends, setUpdatedFriends] = useState(initialFriends);

  // Function to add friends
  function handleAddFriend(friend) {
    setUpdatedFriends((initialFriends) => [...initialFriends, friend]);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList updatedFriends={updatedFriends} />
        <FriendForm onAddFriend={handleAddFriend} />
        <Button>Close</Button>
      </div>
      <SplitBillForm />
    </div>
  );
}

//Define Friend List Component
function FriendList({ updatedFriends }) {
  return (
    <ul>
      {updatedFriends.map((eachFriend) => (
        <Friend friendObj={eachFriend} key={eachFriend.id} />
      ))}
    </ul>
  );
}

//Define Friend Component
function Friend({ friendObj }) {
  return (
    <li>
      <img src={friendObj.image} alt={friendObj.name} />
      <h3>{friendObj.name}</h3>

      <p
        className={
          friendObj.balance < 0 ? "red" : friendObj.balance > 0 ? "green" : ""
        }
      >
        {friendObj.balance < 0
          ? `You owe ${friendObj.name} ${Math.abs(friendObj.balance)}`
          : friendObj.balance > 0
          ? `${friendObj.name} owes you ${friendObj.balance}`
          : `You and ${friendObj.name} are even`}
      </p>

      <Button>Select</Button>
    </li>
  );
}

//Define Friend Form Component
function FriendForm({ onAddFriend }) {
  //Defining state to input name and image URL
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  //Function to handle submit
  function handleSubmitFriendForm(event) {
    //Remove Default form properties
    event.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();

    //Creating new friend object
    const newFriend = {
      id,
      name,
      image: `${image}?u=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    //Resetting name state
    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmitFriendForm}>
      <label>👫 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <label>🌄 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(event) => setImage(event.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

//Define Button Component
function Button({ children }) {
  return <button className="button">{children}</button>;
}

//Define Split Bill Component
function SplitBillForm() {
  return (
    <form className="form-split-bill">
      <h2>Split Bill With Clark</h2>

      <label>💰 Bill value</label>
      <input type="text" />

      <label>🧍‍♀️ Your expense</label>
      <input type="text" />

      <label>💰 Clark expense</label>
      <input type="text" disabled />

      <label>🤑 Who is paying the bill</label>
      <select>
        <option>You</option>
        <option>Clark</option>
      </select>
    </form>
  );
}

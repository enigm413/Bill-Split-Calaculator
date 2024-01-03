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

//Define Reusable Button Component
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

//Define Main App Component
export default function App() {
  const [showFriendForm, setshowFriendForm] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [updatedFriends, setUpdatedFriends] = useState(initialFriends);

  //Function to display friend form
  function handleShowFriendForm() {
    setshowFriendForm((show) => !show);
  }

  // Function to add friends
  function handleAddFriend(friend) {
    setUpdatedFriends((initialFriends) => [...initialFriends, friend]);
    setshowFriendForm(false);
  }

  // Function to display spli form
  function handleSelection(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setshowFriendForm(false);
  }

  function handleSplitBill(value) {
    setUpdatedFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          selectedFriend={selectedFriend}
          updatedFriends={updatedFriends}
          onSelection={handleSelection}
        />
        {showFriendForm && <FriendForm onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowFriendForm}>
          {showFriendForm === false ? "Add Friend" : "Close"}
        </Button>
      </div>
      {selectedFriend && (
        <SplitBillForm
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

//Define Friend List Component
function FriendList({ updatedFriends, onSelection, selectedFriend }) {
  return (
    <ul>
      {updatedFriends.map((eachFriend) => (
        <Friend
          friendObj={eachFriend}
          key={eachFriend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

//Define Friend Component
function Friend({ friendObj, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friendObj.id;
  return (
    <li className={isSelected ? "selected" : ""}>
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

      <Button onClick={() => onSelection(friendObj)}>
        {isSelected ? "Close" : "Select"}
      </Button>
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

//Define Split Bill Component
function SplitBillForm({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [expense, setExpense] = useState("");
  const friendExpense = bill && bill - expense;
  const [whoPaid, setWhoPaid] = useState("user");

  function handleSubmitSplitForm(event) {
    event.preventDefault();

    if (!bill || !expense) return;
    onSplitBill(whoPaid === "user" ? expense : -friendExpense);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmitSplitForm}>
      <h2>Split Bill With {selectedFriend.name}</h2>

      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(event) => setBill(Number(event.target.value))}
      />

      <label>🧍‍♀️ Your expense</label>
      <input
        type="text"
        value={expense}
        onChange={(event) =>
          setExpense(
            Number(event.target.value) > bill
              ? expense
              : Number(event.target.value)
          )
        }
      />

      <label>💰 {selectedFriend.name} expense</label>
      <input type="text" value={friendExpense} disabled />

      <label>🤑 Who is paying the bill</label>
      <select
        value={whoPaid}
        onChange={(event) => setWhoPaid(event.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}

const notifications = document.getElementById("jsNotifications");

export const handleNewUser = ({ nickName }) => {
  sendAlert(`${nickName} has Joined`, "lightblue");
};

export const handleUserDisconenct = ({ nickName }) => {
  sendAlert(`${nickName} has Left`, "pink");
};

const sendAlert = (text, color) => {
  const notification = document.createElement("div");
  notification.innerText = text;
  notification.style.backgroundColor = color;
  notifications.appendChild(notification);
};

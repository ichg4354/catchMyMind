const notifications = document.getElementById("jsNotifications");

export const handleNewUser = ({ nickName }) => {
  sendAlert(`${nickName} has Joined`, "rgb(0, 122, 255)");
};

export const handleUserDisconenct = ({ nickName }) => {
  sendAlert(`${nickName} has Left`, "rgb(255, 149, 0)");
};


const sendAlert = (text, color) => {
  const notification = document.createElement("div");
  const span = document.createElement("span");
  span.innerText = text;
  notification.appendChild(span);
  notification.style.backgroundColor = color;
  notifications.appendChild(notification);
};

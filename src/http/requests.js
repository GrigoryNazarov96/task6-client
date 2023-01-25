import axios from 'axios';

export const fetchMessages = async (name) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/messages/${name}`
    );
    return data.data.messages;
  } catch (e) {
    console.log(e.response);
  }
};

export const sendMessage = async (
  recipient,
  sender,
  messageTitle,
  messageBody
) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/messages`,
      {
        recipient,
        sender,
        messageTitle,
        messageBody,
      }
    );
    return data.data.message;
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const deleteMessage = async (id) => {
  try {
    await axios.patch(`${process.env.REACT_APP_API_URL}/messages`, {
      _id: id,
    });
    return;
  } catch (e) {
    alert(e.response.data.message);
  }
};

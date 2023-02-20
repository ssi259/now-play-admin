import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '/home/vinayak/now-play-admin/now-play-admin/src/NotificationForm.css';

function NotificationForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [receiverType, setReceiverType] = useState('');
  const [receiverList, setReceiverList] = useState([]);

  useEffect(() => {
    async function fetchReceiverList() {
      const response = await axios.get('/api/send_notifications');
      const { playerList, coachList } = response.data;
      if (receiverType === 'player') {
        setReceiverList(playerList);
      } else if (receiverType === 'coach') {
        setReceiverList(coachList);
      }
    }
    fetchReceiverList();
  }, [receiverType]);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('body', body);
      formData.append('receiver_type', receiverType);
      if (image) {
        formData.append('image', image);
      }
      await axios.post('/api/send_notifications', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Clear form on success
      setTitle('');
      setBody('');
      setImage(null);
      setImageUrl('');
      setReceiverType('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="notification-form">
      <h2>Send Notification</h2>
      <label className="form-label">
        Title:
        <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
      </label>
      <label className="form-label">
        Body:
        <input type="text" value={body} onChange={(event) => setBody(event.target.value)} />
      </label>
      <label className="form-label">
        Image:
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </label>
      {imageUrl && <img src={imageUrl} alt="Selected image" />}
      <label className="form-label">
        Receiver Type:
        <select value={receiverType} onChange={(event) => setReceiverType(event.target.value)}>
          <option value="">Select receiver type</option>
          <option value="player">Player</option>
          <option value="coach">Coach</option>
        </select>
      </label>
      {receiverList.length > 0 && (
        <label className="form-label">
          Receiver:
          <select>
            {receiverList.map((receiver) => (
              <option key={receiver.id} value={receiver.id}>
                {receiver.name}
              </option>
            ))}
          </select>
        </label>
      )}
      <button type="submit" className="form-button">Send</button>
    </form>
  );
}

export default NotificationForm;
 

import { useEffect, useState } from 'react';
import { AccountBox } from '@mui/icons-material';

import './ProfilePage.css';
import BGImage from '../../components/BGImage/BGImage';

export default function ProfilePage() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedName = sessionStorage.getItem("username");
    console.log("username: ", storedName);
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  return (
    <div className='profilePage'>
      <BGImage />
      <div className='profileContainer'>
        <div className='profileContent Box'>
          <AccountBox /> <div className='userName'>{userName}</div>
        </div>
      </div>
      
    </div>
  );
}

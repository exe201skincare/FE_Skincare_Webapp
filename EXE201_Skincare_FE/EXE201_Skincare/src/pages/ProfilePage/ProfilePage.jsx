import { AccountBox } from '@mui/icons-material';
import LogoutButton from '../../features/AccountActions/LogoutButton';

import './ProfilePage.css'

export default function ProfilePage() {
  return (
    <div className='profilePage'>
      <AccountBox />

      <LogoutButton />
    </div>
  )
}

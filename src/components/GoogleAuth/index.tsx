import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useState } from 'react';
import { BsGoogle } from 'react-icons/bs';
import './GoogleAuth.css';

const GoogleAuth = () => {
  const [isAuthorized, _setIsAuthorized] = useState<boolean>(
    JSON.parse(sessionStorage.getItem('is-authorized') || 'false')
  );
  const [userPhoto, _setUserPhoto] = useState<string>(
    sessionStorage.getItem('user-photo') || ''
  );

  const setUserPhoto = (newUserPhoto: string) => {
    _setUserPhoto(newUserPhoto);
    sessionStorage.setItem('user-photo', newUserPhoto);
  };

  const setIsAuthorized = (newIsAuthorized: boolean) => {
    _setIsAuthorized(newIsAuthorized);
    sessionStorage.setItem('is-authorized', JSON.stringify(newIsAuthorized));
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const response = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );
      sessionStorage.setItem('token', tokenResponse.access_token);
      setUserPhoto(response.data.picture);
      setIsAuthorized(response.data.email_verified);
    },
  });

  const handleLogout = () => {
    googleLogout();
    setIsAuthorized(false);
    setUserPhoto('');
    sessionStorage.removeItem('token');
  };

  if (isAuthorized) {
    return (
      <div className="google-profile">
        <img
          className="google-profile-pic"
          src={userPhoto}
          alt="User profile pic"
        />
        <button className="google-auth-button" onClick={() => handleLogout()}>
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className="google-profile">
      <button className="google-auth-button" onClick={() => login()}>
        <BsGoogle size={28} />
        Log in
      </button>
    </div>
  );
};

export default GoogleAuth;

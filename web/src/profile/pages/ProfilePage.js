import React, { useContext, useState } from 'react';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import HeaderPage from '../header/pages/HeaderPage';
import ExperiencePage from '../experiences/pages/ExperiencePage';
import EducationPage from '../education/pages/EducationPage';
import OtherPage from '../others/pages/OtherPage';
import ProgressBar from '../../shared/components/UIElements/ProgressBar'
import { AuthContext } from '../../shared/context/auth-context';
import Feedback from '../../user/admin/Feedback'
const ProfilePage = (props) => {
  const auth = useContext(AuthContext);

  const { isLoading, error, clearError, sendRequest } = useHttpClient();

  const [color,setColor]=useState('rgb(68, 148, 240)');
  const [textColor,setTextColor]=useState('white');
  const [textMessage,settextMessage]=useState(`Send Profile to Review`);
  const [active,setDisabled]=useState('');

  const colorHanlder = () => {
    console.log('ta funcionando')
    setColor("rgb(244, 246, 248");
    setTextColor('green')
    settextMessage(`Your Profile has been submitted ✓`)
    setDisabled('disabled')
    }

    const onClickCall = () =>{
      colorHanlder();
      sendAdminEmail();
    }

  const sendAdminEmail = async () => {
  try {
    await sendRequest(
      '/api/users/' + auth.userId + '/send-to-admin',
      'POST',
    );
  } catch (err) {}
};

  return (
    <React.Fragment>
        {!isLoading && (
        <Feedback />
      )}
      {!isLoading && (
        <HeaderPage />
      )}
      {!isLoading && (
        <ProgressBar/>
      )}
      {!isLoading && (
        <ExperiencePage userId={props.userId}/>
      )}
      {!isLoading && (
        <EducationPage userId={props.userId}/>
      )}
      {!isLoading && (
        <OtherPage userId={props.userId}/>
      )}
      
        <div style={{display:'flex', justifyContent:'flex-start', margin:'3% 0 3% 12%'}}>
        <div>
          <button onClick={onClickCall} disabled={active} style={{ backgroundColor: color ,color:textColor, width:'53vw', padding:'20px', fontSize:'17px'}}>
            {textMessage}
          </button>
        </div>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        </div>
    </React.Fragment>
  );
};

export default ProfilePage;

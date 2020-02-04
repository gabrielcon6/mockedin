import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
// import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import {
  VALIDATOR_REQUIRE
  // ,
  // VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import '../../places/pages/PlaceForm.css';

const NewHeader = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: '',
        isValid: false
      },
      jobTitle: {
        value: '',
        isValid: false
      },
      about: {
        value: '',
        isValid: false
      },
      adminComments: {
        value: null,
        isValid: false
      }
    },
    false
  );

  const history = useHistory();

  const headerSubmitHandler = async event => {
    event.preventDefault();
    //BELOW IS FOR WHEN WE HAVE THE IMAGE UPLOAD FULLY WORKING:
  //   try {
  //     const formData = new FormData();
  //     formData.append('name', formState.inputs.name.value);
  //     formData.append('jobTitle', formState.inputs.jobTitle.value);
  //     formData.append('about', formState.inputs.about.value);
  //     formData.append('adminComments', formState.inputs.adminComments.value);
  //     await sendRequest('/api/header', 'POST', formData, {
  //       Authorization: 'Bearer ' + auth.token
  //     });
  //     history.push('/');
  //   } catch (err) {}
  // };
  try {
    await sendRequest(
      '/api/header',
      'POST',
      JSON.stringify({
        name: formState.inputs.name.value,
        jobTitle: formState.inputs.jobTitle.value,
        about: formState.inputs.about.value,
        adminComments: formState.inputs.adminComments.value,
      }),
      { 
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + auth.token
     }
    );
    history.push('/');
  } catch (err) {}
};

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={headerSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="name"
          element="input"
          type="text"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter your name to be displayed."
          onInput={inputHandler}
        />
        <Input
          id="jobTitle"
          element="textarea"
          label="Job Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Job Title (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="about"
          element="input"
          label="About"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter something about yourself."
          onInput={inputHandler}
        />
        <Input
          id="adminComments"
          element="input"
          label="Comment"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Comment by the recruiter."
          onInput={inputHandler}
        />
        {/* <Button type="submit" disabled={!formState.isValid}> */}
        <Button type="submit" >
          ADD HEADER
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewHeader;

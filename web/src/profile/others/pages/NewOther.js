import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../../shared/components/FormElements/Input';
import Button from '../../../shared/components/FormElements/Button';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import { VALIDATOR_REQUIRE } from '../../../shared/util/validators';
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AuthContext } from '../../../shared/context/auth-context';
import '../../../places/pages/PlaceForm.css';

const NewOther = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      startDate: {
        value: '',
        isValid: false
      },
      endDate: {
        value: null,
        isValid: false
      }
    },
    false
  );

  const history = useHistory();

  const otherSubmitHandler = async event => {
    event.preventDefault();
  try {
    await sendRequest(
      '/api/others',
      'POST',
      JSON.stringify({
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
        startDate: formState.inputs.startDate.value,
        endDate: formState.inputs.endDate.value,
      }),
      { 
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + auth.token
     }
    );
    history.push('/' + auth.userId + '/profile');
  } catch (err) {}
};

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={otherSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter your name to be displayed."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          type="text"
          label="Description"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid description."
          onInput={inputHandler}
        />
        <Button type="submit" >
          ADD Other
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewOther;

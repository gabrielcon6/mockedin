import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import Input from '../../../shared/components/FormElements/Input';
import Button from '../../../shared/components/FormElements/Button';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../../shared/components/FormElements/ImageUpload';
import { VALIDATOR_REQUIRE } from '../../../shared/util/validators';
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AuthContext } from '../../../shared/context/auth-context';
import '../../../places/pages/PlaceForm.css';

const NewHeader = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  });

  const searchOptions = {
    types: ['(cities)'],
    componentRestrictions: {country: "au"}
   }
  
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
      location: {
        value: address,
        isValid: false
      },
      about: {
        value: '',
        isValid: false
      },
      file: {
        value: null,
        isValid: false
      }
    },
    false
  );

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  const history = useHistory();

  const headerSubmitHandler = async (event, value) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', formState.inputs.name.value);
      formData.append('file', formState.inputs.file.value);
      formData.append('jobTitle', formState.inputs.jobTitle.value);
      formData.append('location', address);
      formData.append('about', formState.inputs.about.value);
      await sendRequest('/api/header', 'POST', formData, {
        Authorization: 'Bearer ' + auth.token
      });
    } catch (err) {}
    history.push('/');
    history.push('/' + auth.userId + '/profile');
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
        <ImageUpload
          id="file"
          onInput={inputHandler}
          errorText="Please provide a photo."
        />
        <Input
          id="jobTitle"
          element="textarea"
          label="Job Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Job Title."
          onInput={inputHandler}
        />
        <div>
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
          searchOptions={searchOptions}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <h2>Location</h2>
              <input {...getInputProps({ placeholder: "Type address" }) } />
              
              <div>
                {loading ? <div>...loading</div> : null}

                {suggestions.map(suggestion => {
                  const style = {
                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                  };

                  return (
                    <div {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        </div>
        <Input
          id="about"
          element="textarea"
          label="About"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter something about yourself."
          onInput={inputHandler}
        />

        {/* <Input
          id="adminComments"
          element="input"
          label="Comment"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Comment by the recruiter."
          onInput={inputHandler}
        /> */}
        {/* <Button type="submit" disabled={!formState.isValid}> */}
        <Button type="submit" >
          ADD HEADER
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewHeader;

import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import Input from '../../../shared/components/FormElements/Input';
import Button from '../../../shared/components/FormElements/Button';
import Card from '../../../shared/components/UIElements/Card';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import ImageUpload from '../../../shared/components/FormElements/ImageUpload';
import { VALIDATOR_REQUIRE } from '../../../shared/util/validators';
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AuthContext } from '../../../shared/context/auth-context';
import '../../../places/pages/PlaceForm.css';

const UpdateHeader = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedHeader, setLoadedHeader] = useState();
  const [address, setAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  });
  const headerId = useParams().headerId;
  const history = useHistory();

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };


  const [formState, inputHandler, setFormData] = useForm(
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
        value: '',
        isValid: false
      },
      about: {
        value: '',
        isValid: false
      },
      image: {
        value: null,
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const responseData = await sendRequest(
          `/api/header/${headerId}`
        );
        setLoadedHeader(responseData.header);
        setFormData(
          {
            name: {
              value: responseData.header.name,
              isValid: true
            },
            jobTitle: {
              value: responseData.header.jobTitle,
              isValid: true
            },
            location: {
              value: responseData.header.location,
              isValid: true
            },
            about: {
              value: responseData.header.about,
              isValid: true
            },
            image: {
              value: responseData.header.image,
              isValid: true
            }
          },
          true
        );

      } catch (err) {}
    };
    fetchHeader();
  }, [sendRequest, headerId, setFormData]);

  const headerUpdateSubmitHandler = async event => {
    event.preventDefault();
  //   try {
  //     await sendRequest(
  //       `/api/header/${headerId}`,
  //       'PATCH',
  //       JSON.stringify({
  //         name: formState.inputs.name.value,
  //         jobTitle: formState.inputs.jobTitle.value,
  //         about: formState.inputs.about.value
  //       }),
  //       {
  //         'Content-Type': 'application/json',
  //         Authorization: 'Bearer ' + auth.token
  //       }
  //     );
  //     history.push('/' + auth.userId + '/header');
  //   } catch (err) {}
  // };

  try {
    const formData = new FormData();
    formData.append('name', formState.inputs.name.value);
    formData.append('image', formState.inputs.image.value);
    formData.append('jobTitle', formState.inputs.jobTitle.value);
    formData.append('location', address);
    formData.append('about', formState.inputs.about.value);
    await sendRequest(
      `/api/header/${headerId}`,
      'PATCH', 
      formData, {
      Authorization: 'Bearer ' + auth.token
    });
    history.push('/' + auth.userId + '/header');
  } catch (err) {}
};

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedHeader && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find header!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedHeader && (
        <form className="place-form" onSubmit={headerUpdateSubmitHandler}>
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your name."
            onInput={inputHandler}
            initialValue={loadedHeader.name}
            initialValid={true}
          />
          <ImageUpload
            id="image"
            onInput={inputHandler}
            initialValue={loadedHeader.image}
            errorText="Please provide a photo."
          />
          <Input
            id="jobTitle"
            element="textarea"
            label="Job Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your job title."
            onInput={inputHandler}
            initialValue={loadedHeader.jobTitle}
            initialValid={true}
          />
          {/* <Input
            id="location"
            element="textarea"
            label="Location"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your location."
            onInput={inputHandler}
            initialValue={loadedHeader.location}
            initialValid={true}
          /> */}
          <div>
          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <h2>Location</h2>
                <input {...getInputProps({ placeholder: "Type address" } ) } />
                
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
            errorText="Please enter your about text."
            onInput={inputHandler}
            initialValue={loadedHeader.about}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE HEADER
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateHeader;

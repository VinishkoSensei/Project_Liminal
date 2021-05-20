import React, { useState, useEffect } from 'react';
import './card-addtrack.styles.scss';
import FormInput from '../forminputs/forminput/forminput.component';
import FormFileInput from '../forminputs/formfileinput/formfileinput.component';
import CustomButton from '../custombutton/custombutton.component';
import CreatableSelect from 'react-select/creatable';
import { Trans } from '@lingui/macro';

const CardAddTrack = () => {
  const [isLoading, setIsLoading] = useState({
    author: false,
    genre: false,
  });
  const createOption = (label) => ({
    label,
    value: label,
  });
  const initialOptions = {
    author: [
      createOption('TestAuthor1'),
      createOption('TestAuthor2'),
      createOption('TestAuthor3'),
    ],
    genre: [
      createOption('TestGenre1'),
      createOption('TestGenre2'),
      createOption('TestGenre3'),
    ],
  };
  const [options, setOptions] = useState(initialOptions);
  const newTrackInitialState = {
    name: '',
    genre: '',
    author: '',
    file: null,
  };
  const [newTrack, setNewTrack] = useState(newTrackInitialState);
  const { name, genre, author } = newTrack;

  useEffect(() => {
    const getOptions = async () => {
      //
    };

    getOptions();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTrack({ ...newTrack, [name]: value });
  };

  const handleChangeOption = (value, action) => {
    setNewTrack({ ...newTrack, [action.name]: value });
  };

  const handleCreateOption = (name) => (value) => {
    setIsLoading({ ...isLoading, [name]: true });
    setTimeout(() => {
      const newOption = createOption(value);
      setOptions({ ...options, [name]: [...options[name], newOption] });
      setNewTrack({ ...newTrack, [name]: newOption });
      setIsLoading({ ...isLoading, [name]: false });
    }, 500);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(newTrack);
  };

  const fileSelectHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setNewTrack({
        ...newTrack,
        file: {
          content: getFileType(file.type),
          contentPreviewUrl: reader.result,
        },
      });
    };
  };

  const Inputs = [
    {
      name: 'name',
      value: name,
      label: 'name',
      handleChange: handleChange,
      type: '',
      key: 'name',
    },
    {
      name: 'genre',
      value: genre,
      label: 'genre',
      isLoading: isLoading.genre,
      type: 'option',
      key: 'genre',
      options: options.genre,
    },
    {
      name: 'author',
      value: author,
      label: 'author',
      isLoading: isLoading.author,
      type: 'option',
      key: 'author',
      options: options.author,
    },
    {
      name: 'file',
      label: 'file',
      handleChange: fileSelectHandler,
      type: 'file',
      key: 'file',
    },
  ];

  const getFileType = (filetype) => {
    switch (filetype) {
      case 'image/jpeg':
        return '.jpg';
      case 'image/svg+xml':
        return '.svg';
      case 'vnd.microsoft.icon':
        return '.ico';
      case 'png':
        return '.png';
      default:
        return '.dat';
    }
  };

  return (
    <div className="card-admin-main-addtrack">
      <form method="post" onSubmit={handleSubmit}>
        {Inputs.map((input) => {
          switch (input.type) {
            case 'option':
              return (
                <CreatableSelect
                  isClearable
                  isDisabled={input.isLoading}
                  isLoading={input.isLoading}
                  name={input.name}
                  value={input.value}
                  onChange={handleChangeOption}
                  onCreateOption={handleCreateOption(input.name)}
                  options={input.options}
                  className="forminput-select"
                  placeholder="select option..."
                />
              );
            case 'file':
              return (
                <FormFileInput
                  handleChange={fileSelectHandler}
                  key={input.key}
                  required
                />
              );
            default:
              return (
                <FormInput
                  name={input.name}
                  value={input.value}
                  label={input.label}
                  handleChange={input.handleChange}
                  type={input.type}
                  key={input.key}
                  required
                />
              );
          }
        })}

        <CustomButton type="submit">Add</CustomButton>
      </form>
    </div>
  );
};

export default CardAddTrack;

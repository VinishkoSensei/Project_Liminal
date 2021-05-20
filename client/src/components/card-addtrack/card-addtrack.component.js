import React, { useState, useEffect } from 'react';
import './card-addtrack.styles.scss';
import FormInput from '../forminputs/forminput/forminput.component';
import FormFileInput from '../forminputs/formfileinput/formfileinput.component';
import CustomButton from '../custombutton/custombutton.component';
import CreatableSelect from 'react-select/creatable';
import { Trans } from '@lingui/macro';
import * as mm from 'music-metadata-browser';

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
    author: [],
    genre: [],
  };
  const [options, setOptions] = useState(initialOptions);
  const newTrackInitialState = {
    name: '',
    genre: '',
    author: '',
    genrehint: '',
    authorhint: '',
    file: null,
  };
  const [newTrack, setNewTrack] = useState(newTrackInitialState);
  const { name, genre, author, file, authorhint, genrehint } = newTrack;

  useEffect(() => {
    const getOptions = async () => {
      const genresresponse = await fetch(`http://localhost:3001/getgenres`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      });
      const genres = await genresresponse.json();
      const authorsresponse = await fetch(`http://localhost:3001/getauthors`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      });
      const authors = await authorsresponse.json();

      setOptions({
        genre: genres.map((genre) => {
          const gen = { label: genre.name, value: genre.name };
          return gen;
        }),
        author: authors.map((author) => {
          const au = { label: author.nickname, value: author.nickname };
          return au;
        }),
      });
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
    const response = await fetch(`http://localhost:3001/createtrack`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        genre: genre.value,
        author: author.value,
        file,
      }),
    });
    console.log(response);
  };

  const fileSelectHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      mm.parseBlob(file).then((metadata) => {
        console.log(`Completed parsing of ${file.name}:`, metadata);
        setNewTrack({
          ...newTrack,
          name: metadata.common.title && !name ? metadata.common.title : name,
          authorhint:
            metadata.common.artist && !author ? metadata.common.artist : author,
          genrehint:
            metadata.common.genre[0] && !genre
              ? metadata.common.genre[0]
              : genre,
          file: {
            content: '.mp3',
            contentPreviewUrl: reader.result,
          },
        });
      });
    };
  };

  const Inputs = [
    {
      name: 'file',
      label: 'file',
      handleChange: fileSelectHandler,
      type: 'file',
      key: 'file',
    },
    {
      name: 'name',
      value: name,
      label: 'name',
      handleChange: handleChange,
      type: '',
      key: 'name',
    },
    {
      name: 'genrehint',
      value: genrehint,
      label: 'Hint from track',
      handleChange: handleChange,
      type: 'hint',
      key: 'genrehint',
    },
    {
      name: 'genre',
      value: genre,
      label: 'genre',
      isLoading: isLoading.genre,
      type: 'option',
      key: 'genre',
      options: options.genre,
      placeholder: 'Select Genre...',
    },

    {
      name: 'authorhint',
      value: authorhint,
      label: 'Hint from track',
      handleChange: handleChange,
      type: 'hint',
      key: 'authorhint',
    },
    {
      name: 'author',
      value: author,
      label: 'author',
      isLoading: isLoading.author,
      type: 'option',
      key: 'author',
      options: options.author,
      placeholder: 'Select Author...',
    },
  ];

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
                  key={input.key}
                  className="forminput-select"
                  placeholder={input.placeholder}
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
              return input.type !== 'hint' || input.value ? (
                <FormInput
                  name={input.name}
                  value={input.value}
                  label={input.label}
                  handleChange={input.handleChange}
                  type={input.type}
                  key={input.key}
                  required
                />
              ) : null;
          }
        })}

        <CustomButton type="submit">Add</CustomButton>
      </form>
    </div>
  );
};

export default CardAddTrack;

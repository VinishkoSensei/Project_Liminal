export const handleSignIn = async ({ userCredentials, token }) => {
  if (userCredentials) {
    const { email, password } = userCredentials;
    const userdata = await fetch(`http://localhost:3001/signin`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    return userdata;
  } else {
    const userdata = await fetch(`http://localhost:3001/signin`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    });
    return userdata;
  }
};

export const handleGetProfile = async (userId, token) => {
  const userdata = await fetch(`http://localhost:3001/profile/${userId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      authorization: token,
    },
  });
  return userdata;
};

export const handleSignUp = async (
  email,
  firstname,
  lastname,
  date,
  phone,
  file,
  password
) => {
  const response = await fetch(`http://localhost:3001/createprofile`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      firstname: firstname,
      lastname: lastname,
      date: date,
      phone: phone,
      file: file,
      password: password,
    }),
  });

  return response;
};

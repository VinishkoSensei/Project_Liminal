export const handleSignIn = async (email, password) => {
  const userdata = await fetch(`http://localhost:3001/getprofile`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
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

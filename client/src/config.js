export const signInFormControls = [
  {
    id: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    id: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const signUpFormControls = [
  {
    id: "firstname",
    label: "First Name",
    placeholder: "Enter your first name",
    componentType: "input",
    type: "text",
    className: "flex-1", // Half width
  },
  {
    id: "lastname",
    label: "Last Name",
    placeholder: "Enter your last name",
    componentType: "input",
    type: "text",
    className: "flex-1", // Half width
  },
  {
    id: "username",
    label: "Username",
    placeholder: "Choose a username",
    componentType: "input",
    type: "text",
  },
  {
    id: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    id: "gender",
    label: "Gender",
    componentType: "select",
    placeholder: "Select Gender",
    options: [
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
    ],
  },
  {
    id: "age",
    label: "Age",
    placeholder: "Enter your age",
    componentType: "input",
    type: "number",
  },
  {
    id: "password",
    label: "Password",
    placeholder: "Create a password",
    componentType: "input",
    type: "password",
  },
];
export const addNewQuoteFormControls = [
  {
    id: "subject",
    name: "subject",
    label: "Subject",
    type: "text",
  },
  {
    id: "priority",
    name: "priority",
    label: "Priority",
    type: "select",
    options: ["High", "Medium", "Low"],
  },
  {
    id: "description",
    name: "description",
    label: "Description",
    type: "textarea",
  },
];

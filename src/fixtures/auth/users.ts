export type UserCredentials = {
  email: string;
  password: string;
};

export const users = {
  validUser: {
    email: "pranavpatil@patil.co.in",
    password: "Test@9696",
  },
  invalidUser: {
    email: "invalid@email.com",
    password: "Passwo",
  },
} satisfies Record<string, UserCredentials>;

import { User } from './types/User';

export const filterUsers = (args: { users: User[], searchQuery: string }) => {
  const { users, searchQuery } = args;

  const preparedSearchQuery = searchQuery.toLowerCase();

  return users.filter(user => {
    const checkString = `
      ${user.slug.toLowerCase()}
      ${user.name.toLowerCase()}
      ${user.fatherName?.toLowerCase() || ''}
      ${user.motherName?.toLowerCase() || ''}
    `;

    return checkString.includes(preparedSearchQuery);
  });
};

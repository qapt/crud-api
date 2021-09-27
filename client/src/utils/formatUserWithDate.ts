export const formatUserWithDate = (username: string, date: any) => {
    const formattedDate = new Date(date).toLocaleDateString('en-GB');
    return `Posted by ${username} on ${formattedDate}`;
};

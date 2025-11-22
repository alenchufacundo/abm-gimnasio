const generateId = (length: number = 12): string => {
  return Math.random().toString(36).substr(2, length) + Date.now().toString(36);
};

export default generateId;

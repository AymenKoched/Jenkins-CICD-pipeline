import { getHomePage } from '../services/home.service.js';

export const getHome = async (req, res) => {
  const filePath = await getHomePage();
  res.sendFile(filePath);
};

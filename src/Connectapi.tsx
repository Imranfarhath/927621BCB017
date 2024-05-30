import axios from 'axios';

const authEndpoint = 'http://20.244.56.144/test/auth';
const baseUrl = 'http://20.244.56.144/test/companies';

const authData = {
  companyName: "Affordmed",
  ownerName: "Imran Farhath A",
  clientID: "f746a40e-e584-4402-a546-352f017fa484",
  clientSecret: "RggZvyrOmYBrFNpH",
  rollNo: "927621BCB017",
  ownerEmail: "927621bcb017@gmail.com"
};


export const getAccessToken = async () => {
    try {
      const response = await axios.post(authEndpoint, authData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return response.data.access_token; // Adjust based on the actual response structure
    } catch (error) {
      console.error('Error fetching access token', error);
      throw error;
    }
  };
  
  export const getData = async (company, category, token) => {
    try {
      const response = await axios.get(`${baseUrl}/${company}/categories/${category}/products?top=5&minPrice=100&maxPrice=1000`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data for ${company} - ${category}`, error);
      throw error;
    }
  };

  export const getData2 = async (company, category, token,minvalue,maxvalue) => {
    try {
      const response = await axios.get(`${baseUrl}/${company}/categories/${category}/products?top=5&minPrice=${minvalue}&maxPrice=${maxvalue}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data for ${company} - ${category}`, error);
      throw error;
    }
  };


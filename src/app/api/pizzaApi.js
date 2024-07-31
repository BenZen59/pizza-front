import axios from 'axios';

const pizzaApi = {
  getTypeProduit: () => {
    return axios.get(`/api/type-produits/`);
  },
  getArticleWithTypeProduit: (idTypeProduit) => {
    return axios.get(`/api/articles/typeProduit/${idTypeProduit}`);
  },
  getCompositionPizza: (idArticle) => {
    return axios.get(`/api/compositions/${idArticle}`);
  },
  getAllIngredients: () => {
    return axios.get(`/api/ingredients/`);
  },
  getLogin: () => `/api/register/login`,
  register: (data) => {
    return axios.post(`/api/register`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },
  getAccountDetail: (token) => {
    return axios.get(`/api/register/accountdetail?token=${token}`);
  },
  createCommande: (data) => {
    console.log(data);
    return axios.post(`/api/commandes/${data}`);
  },
  getCommande: (idClient) => {
    return axios.get(`/api/commandes/${idClient}`);
  },
  addArticleToCommande: (idCommande, idArticle, qty, compositions) => {
    return axios.post(`/commandes/${idCommande}/articles`, {
      idArticle,
      qty,
      compositions,
    });
  },
};

export default pizzaApi;

import axios from "axios";

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
};

export default pizzaApi;

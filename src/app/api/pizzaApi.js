import axios from "axios";

const pizzaApi = {
  getTypeProduit: () => {
    return axios.get(`/api/type-produits/`);
  },
  getAllArticle: () => {
    return axios.get(`/api/articles/`);
  },
  getArticleWithTaille: (idArticle, taille) => {
    return axios.get(`/api/articles/${idArticle}/${taille}`);
  },
  getArticleWithTypeProduit: (idTypeProduit) => {
    return axios.get(`/api/articles/typeProduit/${idTypeProduit}`);
  },
  getCompositionPizza: (idArticle) => {
    return axios.get(`api/compositions/${idArticle}`);
  },
  getAllIngredients: () => {
    return axios.get(`api/ingredients/`);
  },
};

export default pizzaApi;

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
  getArticleWithTypeProduit: (typeProduit) => {
    return axios.get(`/api/articles/typeProduit/${typeProduit}`);
  },
  getArticleWithTypeProduitAndBase: (typeProduit, base) => {
    return axios.get(`/api/articles/typeProduitAndBase/${typeProduit}/${base}`);
  },
};

export default pizzaApi;

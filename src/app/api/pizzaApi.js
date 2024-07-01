import axios from "axios";

const pizzaApi = {
  getAllArticle: () => {
    return axios.get(`/api/articles/`);
  },
  getArticleWithTaille: (idArticle, taille) => {
    return axios.get(`/api/articles/${idArticle}/${taille}`);
  },
  getArticleWithTypeProduit: (libelle) => {
    return axios.get(`/api/articles/typeProduit/${libelle}`);
  },
};

export default pizzaApi;

import axios from "axios";

const pizzaApi = {
  getArticleWithTaille: (idArticle, taille) => {
    return axios.get(`/api/articles/${idArticle}/${taille}`);
  },
};

export default pizzaApi;

import ArticleCard from "./components/ArticleCard/page";

export default function Home() {
  return (
    <main className="bg-gray-100">
      <ArticleCard idArticle={1} taille={26} libelle={"Pizza"} />
    </main>
  );
}

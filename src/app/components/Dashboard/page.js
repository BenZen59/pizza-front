// src/app/Dashboard/page.js
"use client";

import withAuth from "../../components/withAuth";
import LogoutButton from "../../components/LogoutButton";

const Dashboard = () => {
  return (
    <div>
      <h1>Tableau de bord</h1>
      <p>Bienvenue sur votre tableau de bord !</p>
      <LogoutButton />
    </div>
  );
};

export default withAuth(Dashboard);

import React from "react";
import { IRepository } from "../../types";
import styles from "./RepositoryCard.module.scss";

interface Props {
  repo: IRepository;
}

const RepositoryCard: React.FC<Props> = ({ repo }) => {
  return (
    <div className={styles.card}>
      <img src={repo.owner.avatar_url} alt="avatar" className={styles.avatar} />
      <div className={styles.info}>
        <h2>{repo.name}</h2>
        <p>{repo.description}</p>
        <span>Stars: {repo.stargazers_count}</span>
        <span>Language: {repo.language}</span>
      </div>
    </div>
  );
};

export default RepositoryCard;

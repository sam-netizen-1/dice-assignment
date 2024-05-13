import React, { useState, useEffect } from "react";
import axios from "axios";
import { IGitHubApiResp, IRepository } from "../../types";
import RepositoryCard from "../RepositoryCard";
import styles from "./RepoSearch.module.scss";

const RepoSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState<IRepository[]>([]);
  const [sort, setSort] = useState("stars");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.length > 2) {
      axios
        .get<IGitHubApiResp>(
          `https://api.github.com/search/repositories?q=${debouncedQuery}&sort=${sort}`
        )
        .then((response) => {
          setRepos(response.data.items);
        })
        .catch((error) => console.error("Error fetching repos:", error));
    }
  }, [debouncedQuery, sort]);

  return (
    <div>
      <div className={styles.topBar}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search GitHub Repos"
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className={styles.sortSelect}
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="stars">Stars</option>
          <option value="watchers_count">Watchers Count</option>
          <option value="score">Score</option>
          <option value="name">Name</option>
          <option value="created_at">Created At</option>
          <option value="updated_at">Updated At</option>
        </select>
      </div>
      <div className={styles.repos}>
        {repos.map((repo) => (
          <RepositoryCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
};

export default RepoSearch;

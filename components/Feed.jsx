"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import React from "react";
import Image from "next/image";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16  grid grid-cols-1 \xl:grid-cols-2 promp_layout gap-5">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

function Feed() {
  const [allPosts, setAllPosts] = useState([]);

  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);

    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = filterPrompts(e.target.value);
        setFilteredPosts(searchResults);
      }, 500)
    );
  };

  useEffect(() => {
    const fetchPrompt = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setAllPosts(data);
      setLoading(false);
    };
    fetchPrompt();
  }, []);

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const filtered = filterPrompts(tagName);
    setFilteredPosts(filtered);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="search for prompts"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {loading ? (
        <div className='w-full  flex-center mt-40'>
        <Image
          src='assets/icons/loader.svg'
          width={50}
          height={50}
          alt='loader'
          className='object-contain'
        />
      </div>
      ) : searchText ? (
        <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
}

export default Feed;

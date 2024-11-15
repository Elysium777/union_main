import React from "react";

import SearchBar from "./SearchBar";
import ProfileContainer from "./ProfileContainer";

const PageHeader = () => {
  return (
    <header className="h-16 border-b border-gray-700 w-full sticky top-0 z-40 flex-center bg-[#0a0a0a] min-h-16">
      <SearchBar />
      <ProfileContainer />
    </header>
  );
};

export default PageHeader;

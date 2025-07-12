import React, { useState } from 'react';
import EnhancedWalmartFloorPlan from '../layouts/SmallLayout';
import ChatDrawer from './chatDrawer';


const ChatBotWithLayout = () => {
  const [searchKeyword, setSearchKeyword] = useState(null);

  const handleBotReply = (replyText) => {
    const keyword = extractSectionKeyword(replyText);
    if (keyword) setSearchKeyword(keyword);
  };

  const extractSectionKeyword = (response) => {
    const keywords = [
      'electronics', 'produce', 'pharmacy', 'bakery', 'dairy', 'meat', 'gaming',
      'computers', 'shoes', 'checkout', 'garden', 'furniture', 'decor', 'entrance', 'service'
    ];

    const lower = response.toLowerCase();
    return keywords.find(word => lower.includes(word)) || null;
  };

  return (
    <div>
      <ChatDrawer onBotReply={handleBotReply} />
      <EnhancedWalmartFloorPlan searchKeyword={searchKeyword} />
    </div>
  );
};

export default ChatBotWithLayout;

import React, { useState, useMemo } from "react";
import styled from "styled-components";

interface TagInputProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const TAG_COLORS: { [key: string]: string } = {
  "#F9EEE3": "#FFA500",
  "#E7F7DB": "#7AC555",
  "#F7DBF0": "#E876EA",
  "#DBE6F7": "#76A5EA",
};

const getTagColor = (() => {
  const tagColorMap = new Map<string, string>();
  const availableColors = Object.keys(TAG_COLORS);

  return (tag: string) => {
    if (!tagColorMap.has(tag)) {
      const randomColor =
        availableColors[tagColorMap.size % availableColors.length];
      tagColorMap.set(tag, randomColor);
    }
    return tagColorMap.get(tag) || "#ddd";
  };
})();

const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
  const [tagInput, setTagInput] = useState("");

  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <TagInputContainer>
      <TagInputBox>
        {tags.map((tag, index) => {
          const bgColor = getTagColor(tag);
          const textColor = TAG_COLORS[bgColor];

          return (
            <TagItem key={index} bgColor={bgColor} textColor={textColor}>
              {tag}
              <RemoveBtn onClick={() => handleRemoveTag(index)}>x</RemoveBtn>
            </TagItem>
          );
        })}
        <TagTextInput
          type="text"
          placeholder="태그 입력 후 Enter"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyPress}
        />
      </TagInputBox>
    </TagInputContainer>
  );
};

export default TagInput;

const TagInputContainer = styled.div`
  width: 100%;
`;

const TagInputBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  min-height: 50px;
`;

const TagTextInput = styled.input`
  border: none;
  outline: none;
  font-size: 14px;
  flex-grow: 1;
  min-width: 100px;
`;

const TagItem = styled.span<{ bgColor: string; textColor: string }>`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  border-radius: 16px;
  padding: 4px 12px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  font-size: 12px;
  color: red;
  cursor: pointer;
  padding: 0;
`;

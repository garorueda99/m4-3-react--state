import React, { useState } from 'react';
import styled from 'styled-components';
import MatchFormatter from './MatchFormatter';

const Typeahead = ({ suggestions, handleSelect }) => {
  const [value, setValue] = useState('');
  const [suggestedIndex, setSuggestedIndex] = useState(0);
  let matchedSuggestions = [{ title: '' }];
  matchedSuggestions =
    value.length > 1 &&
    suggestions.filter((book) =>
      book.title.toLowerCase().includes(value.toLowerCase())
    );

  console.log();
  return (
    <>
      <Wrapper>
        <Input
          name='search'
          type='text'
          value={value}
          placeholder='Enter a book title'
          onChange={(e) => {
            setValue(e.target.value);
            setSuggestedIndex(0);
            matchedSuggestions = [{ title: '' }];
          }}
          onKeyDown={(e) => {
            switch (e.key) {
              case 'Enter':
                handleSelect(matchedSuggestions[suggestedIndex].title);
                setValue(matchedSuggestions[suggestedIndex].title);
                break;

              case 'ArrowUp':
                setSuggestedIndex(suggestedIndex < 1 ? 0 : suggestedIndex - 1);
                break;

              case 'ArrowDown':
                setSuggestedIndex(
                  suggestedIndex >= matchedSuggestions.length - 1
                    ? suggestedIndex
                    : suggestedIndex + 1
                );
                break;
              default:
            }
          }}
        ></Input>
        <ClearBtn
          onClick={() => {
            setValue('');
            setSuggestedIndex(0);
          }}
        >
          Clear
        </ClearBtn>
      </Wrapper>
      {!!matchedSuggestions.length && matchedSuggestions[0].title !== value && (
        <Ul>
          {matchedSuggestions.map((element, i) => {
            const isSelected = i === suggestedIndex;
            return (
              <Suggestion
                key={i}
                onClick={(e) => {
                  handleSelect(matchedSuggestions[i].title);
                  setValue(matchedSuggestions[i].title);
                }}
                style={{
                  background: isSelected
                    ? 'hsla(50deg, 100%, 80%, 0.25)'
                    : 'transparent',
                }}
                onMouseEnter={() => {
                  setSuggestedIndex(i);
                }}
              >
                <MatchFormatter book={element} string={value} />
              </Suggestion>
            );
          })}
        </Ul>
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin-top: 50px;
  padding: 10px;
`;

const Input = styled.input`
  width: 60%;
  height: 2rem;
  border-radius: 5px;
`;

const ClearBtn = styled.button`
  border-radius: 5px;
  background-color: blue;
  color: white;
  border: none;
  margin-left: 5px;
  padding: 0 10px;
`;

const Ul = styled.ul`
  position: relative;
  top: -7px;
  left: 20px;
  margin-left: 5px;
  padding: 0 10px;
  width: 500px;
  -webkit-box-shadow: 3px 3px 5px 6px #ccc; /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
  -moz-box-shadow: 3px 3px 5px 6px #ccc; /* Firefox 3.5 - 3.6 */
  box-shadow: 3px 3px 5px 6px #ccc;
  /* &:hover li:first-child {
    background-color: white;
  } */
`;

const Suggestion = styled.li`
  border-radius: 6px;
  padding-left: 15px;
  margin-bottom: 5px;
  /* &:hover {
    background-color: yellow !important;
  }
  &:first-child {
    background-color: yellow;
  } */
`;

export default Typeahead;

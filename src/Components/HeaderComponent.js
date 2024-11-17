import styled from 'styled-components'

//header components saved in seperate folder

export const Header = styled.div`
  color: white;
  background: linear-gradient(135deg, hsl(195, 62%, 35%), hsl(195, 70%, 50%));
  display: flex; 
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  font-size: 40px;
  font-weight: bold;
  font-family: cursive;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  height: 50px; 
  box-shadow: 0 3px 6px 0 #555
  
`;

export const AppNameComponent = styled.div``;

export const SearchMech = styled.div`
  display : flex;
  flex-direction: row;
  background-color: white;
  padding: 5px;
  border-radius: 6px;
  width: 40%; 
  box-shadow: 0 2px 4px 0 #555;
`;

export const SearchInput = styled.input`
  border:none;
  outline:none;
  margin-left: 15px;
  font-size:16px;
  font-weight:bold;
  background-color: white;
  font-family: sans-serif;
`;

export const SearchImg = styled.img`
  height: 32px;
  width: 32px;
`;
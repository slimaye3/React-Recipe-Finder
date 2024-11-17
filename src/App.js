import React, { useState } from 'react';
import Axios from "axios";
import styled from 'styled-components'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import {Header, AppNameComponent, SearchMech, SearchInput, SearchImg} from './Components/HeaderComponent';


//main container 
const Container = styled.div`
  display : flex;
  flex-direction: column;
  background-color: hsl(190, 76%, 92%);
  min-height: 100vh; 
`;

//recipe components 
const RecipeListContainer = styled.div`
  display: flex;
  flex-dircection: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 33px;
  justify-content: space-evenly; 

`;

const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 3px 6px 0 #555;
  padding: 10px;
  width: 300px;
  
`;

const RecipeName = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin: 10px 0;
`;

const IngredientsList = styled.span`
  font-size: 18px;
  border: solid 1px green;
  color: black;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 4px;
  color: green;
  text-align: center;
`;
const SeeMoreText = styled.span`
  font-size: 18px;
  border: solid 1px green;
  color: black;
  margin: 10px 0;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 4px;
  color: green;
  text-align: center;
`;

const MealVideo = styled.span`
  font-size: 18px;
  border: solid 1px green;
  color: black;
  margin: 1px 0;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 4px;
  color: green;
  text-align: center;
`;

const FoodCoverImage = styled.img`
  height: 200px;
  object-fit: cover;
`;

//intro words component
const StartNameContainer = styled.div`
  display : flex;
  flex-direction: row;
  padding: 80px 80px;
  justify-content: center;
`;

const StartName = styled.div`
  display : flex;
  flex-direction: column;
  font-family: cursive;
  font-size: 30px;
  text-align: center;
  line-height: 1.5; 
  color: black;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

//main page images components 
const RecipeImg = styled.div`
  display : flex;
  flex-direction: row;
  padding: 2px 0;
  justify-content: center;
  gap: 13px;
  opacity: 70%;

`;

const RecipeImgContainer = styled.div`
  display : flex;
  flex-direction: column;
  padding: 2px;
  box-shadow: 0 3px 6px 0 #555;
  overflow: hidden;
  margin-top: -44px;
  background-color: hsl(195, 50%, 35%);
  
       
`;

const StyleImage1 = styled.img`
  padding: 20px;
  height: 270px;
  width: 270px;
  object-fit: cover;
`;


//getting the ingrdients
const getIngredients = (recipeObj) => {
  const ingredients = [];
  //assume max is 20 ingredients
  for (let i = 1; i <= 20; i++) { 
    //store keywords for quantity and ingr.
    const ingredient = recipeObj[`strIngredient${i}`];
    const measure = recipeObj[`strMeasure${i}`];
    if (ingredient) { 
      ingredients.push({
        text: ingredient,
        weight: measure || "", 
      });
    }
  }
  return ingredients;
};

//main recipe component
const RecipeComponent = ({ recipeObj }) => {
  const [show, setShow] = React.useState(false);
  const ingredients = getIngredients(recipeObj);

  //for the ingredient box show the dialog box that display the ingredients and quanity
  //link the website where meal is found
  //link the youtube video that users can watch to cook along
  return (
    <>
  <Dialog open={show}>
  <DialogTitle id="alert-dialog-slide-title" style={{ fontSize: '24px' }}>
    Ingredients
  </DialogTitle>
    <DialogContent>
      <table>
        <thead>
          <th style={{ textAlign: 'left' }}>Ingredients</th>
          <th style={{ textAlign: 'left' }}>Quantity</th>
        </thead>
        <tbody>
          {ingredients.map((ingredientObj, index) => (
            <tr key={index}>
              <td style={{ paddingRight: '20px' }}>{ingredientObj.text}</td>
              <td>{ingredientObj.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DialogContent>
    <DialogActions>
      <SeeMoreText onClick={() => window.open(`https://www.themealdb.com/meal/${recipeObj.idMeal}`)} >
        See More
      </SeeMoreText>
      <IngredientsList onClick={() => setShow(false)}>
        Close
      </IngredientsList>
   </DialogActions>
  </Dialog>
  <RecipeContainer>
    <FoodCoverImage src={recipeObj.strMealThumb} alt="Food" />
    <RecipeName>{recipeObj.strMeal}</RecipeName>
    <IngredientsList onClick={() => setShow(true)}>
      Ingredients
    </IngredientsList>
    <SeeMoreText onClick={() => window.open(`https://www.themealdb.com/meal/${recipeObj.idMeal}`)} >
      See Complete Recipe
    </SeeMoreText>
    <MealVideo onClick={() => window.open(recipeObj.strYoutube)}>
      Cook Along!
    </MealVideo>
  </RecipeContainer>
  </>
)
};

//retrieve API from third party using Axios
//implement debouncing to make fewer API calls
function App() {

  const [timeoutId, updateTimeoutId] = useState();
  const [recipeList, updateRecipeList] = useState();
  const [initialLoad, setInitialLoad] = useState(true);

  const fetchRecipe = async (searchString) => {
    try {
      const response = await Axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchString}`
      );
      updateRecipeList(response.data.meals || []);
      setInitialLoad(false)
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    const timeout = setTimeout( () => fetchRecipe(event.target.value), 500);
    updateTimeoutId(timeout);
  };

  

  return <Container>
    <Header> 
      <AppNameComponent> 
        🌿 Find Delicious Recipes 🌿
      </AppNameComponent>
      <SearchMech>
        <SearchImg src = "/search-icon.svg" />
        <SearchInput placeholder="Search Recipe" onChange={onTextChange} />
      </SearchMech>
    </Header>
    {!recipeList || recipeList.length === 0 ? (
        <StartNameContainer>
          <StartName>
            Cook With Ease
            <br />
            Discover meals by searching your favorite dishes!
          </StartName>
        </StartNameContainer>
      ) : null}

    <RecipeListContainer>
      {recipeList && recipeList.length > 0 ? (
            recipeList.map((recipeObj) => <RecipeComponent key={recipeObj.idMeal} recipeObj={recipeObj} />)
          ) : (
            <>
            <RecipeImg>
            <RecipeImgContainer>
              <StyleImage1 src="https://images.squarespace-cdn.com/content/v1/613ce2c584a12d65875f02ff/f8442476-53a4-417a-b80e-addde5961c92/creamy-vegan-pasta-in-a-bowl.png" />
            </RecipeImgContainer>
            <RecipeImgContainer>
              <StyleImage1 src="https://i.ytimg.com/vi/FW2xkJXc1Qg/maxresdefault.jpg" />
            </RecipeImgContainer>
            <RecipeImgContainer>
              <StyleImage1 src="https://www.forksoverknives.com/uploads/greens-things-sandwiches-wordpress.jpg?auto=webp&auto=webp&optimize=high&quality=70&width=1440" />
            </RecipeImgContainer>
          </RecipeImg>
          </>
          )}
    </RecipeListContainer>
    
  </Container>
}

export default App;

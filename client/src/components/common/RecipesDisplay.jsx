import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfiniteScroll from './InfiniteScroll';
import Card from './Card';

const RecipesDisplay = ({
  isFetching,
  recipes,
  fetchNext,
  hasMore = false,
  renderActions
}) => {
  const renderRecipes = () => {
    if (isFetching) {
      return <CircularProgress />;
    }

    if (!recipes.length) {
      return <h1>No Recipes Available</h1>;
    }

    return recipes?.map(recipe => {
      const { id, name, description, image, createdAt } = recipe;
      return (
        <Card
          key={id}
          id={id}
          recipeName={name}
          recipeDescription={description}
          image={image}
          createdAt={createdAt}
          renderActions={() => renderActions?.(recipe)}
        />
      );
    });
  };

  return (
    <InfiniteScroll
      dataLength={recipes?.length}
      fetchNext={fetchNext}
      hasMore={hasMore}
    >
      {renderRecipes()}
    </InfiniteScroll>
  );
};

export default RecipesDisplay;

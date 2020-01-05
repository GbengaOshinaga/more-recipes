import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const IngredientsInput = ({ ingredients, setFieldValue }) => {
  const setEmpyValueToIngredients = () =>
    setFieldValue('ingredients', ingredients.concat(''));

  const removeIngredient = ingredient => {
    setFieldValue(
      'ingredients',
      ingredients.filter(i => i !== ingredient)
    );
  };

  if (!ingredients.length) {
    setEmpyValueToIngredients();
  }

  const setIngredientsInArray = (initialIngredient, ingredient) => {
    const tempIngredients = [...ingredients];
    const indexOfIngredient = tempIngredients.findIndex(
      i => i === initialIngredient
    );
    tempIngredients.splice(indexOfIngredient, 1, ingredient);
    return tempIngredients;
  };

  const renderField = (label, ingredient) => {
    return (
      <ListItem key={label}>
        <IconButton
          aria-label="remove ingredient input"
          onClick={() => removeIngredient(ingredient)}
        >
          <RemoveIcon />
        </IconButton>
        <TextField
          required
          multiline
          label={label}
          variant="outlined"
          value={ingredient}
          onChange={({ target: { value } }) => {
            setFieldValue(
              'ingredients',
              setIngredientsInArray(ingredient, value)
            );
          }}
        />
        <IconButton
          aria-label="add ingredient input"
          onClick={setEmpyValueToIngredients}
        >
          <AddIcon />
        </IconButton>
      </ListItem>
    );
  };

  return ingredients.map((ingredient, index) =>
    renderField(`Ingredient ${index + 1}`, ingredient)
  );
};

export default IngredientsInput;

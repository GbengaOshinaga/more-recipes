import recipesOperations from './recipes/operations';

const operations = actions => ({ ...recipesOperations(actions) });

export default operations;

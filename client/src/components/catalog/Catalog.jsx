import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import NavBar from '../common/NavBar';
import Recipes from './Recipes';
import Search from './Search';
import MostFavoritedRecipes from './MostFavoritedRecipes';
import styles from './Catalog.modules.scss';

const { localStorage } = window;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

const CatalogPage = () => {
  const currentTab = Number(localStorage.getItem('currentTab'));
  const [searchTerm, setSearchTerm] = useState('');
  const [value, setValue] = useState(currentTab);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem('currentTab', newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
    localStorage.setItem('currentTab', index);
  };

  const renderTabs = () => {
    return (
      <Paper className={styles.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Most Favorited" {...a11yProps(1)} />
        </Tabs>
      </Paper>
    );
  };

  const renderSearch = () => {
    return <Search searchTerm={searchTerm} />;
  };

  const renderCatalog = () => {
    return (
      <>
        {renderTabs()}
        <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
          <TabPanel value={value} index={0}>
            <Recipes />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <MostFavoritedRecipes />
          </TabPanel>
        </SwipeableViews>
      </>
    );
  };

  return (
    <div className={styles.container}>
      <NavBar searchTerm={searchTerm} onChangeSearchTerm={setSearchTerm} />
      {searchTerm.length ? renderSearch() : renderCatalog()}
    </div>
  );
};

export default CatalogPage;

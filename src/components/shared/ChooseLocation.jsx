import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import ChooseLocationPage from '../postItem/ChooseLocationPage';
import EditAddressPage from '../postItem/EditAddressPage';

const ChooseLocation = ({ path, onLocationChange, exitPath }) => {
  const history = useHistory();
  const [editedLocation, setEditedLocation] = useState();
  const editAddressPath = '/edit-address';

  const onSelectEditLocation = (location) => {
    setEditedLocation(location);

    history.push(editAddressPath);
  };

  return (
    <Switch>
      <Route exact path={path}>
        <ChooseLocationPage
          onLocationChange={onLocationChange}
          exitPath={exitPath}
          onChooseLocationToEdit={onSelectEditLocation}
        />
      </Route>
      <Route exact path={editAddressPath}>
        <EditAddressPage
          location={editedLocation}
          pathAfterConfirm={path}
        />
      </Route>
    </Switch>
  );
};

ChooseLocation.propTypes = {
  path: PropTypes.string.isRequired,
  onLocationChange: PropTypes.func.isRequired,
  exitPath: PropTypes.string.isRequired,
};

export default ChooseLocation;

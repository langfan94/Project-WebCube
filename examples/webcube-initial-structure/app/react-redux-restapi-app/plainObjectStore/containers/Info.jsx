import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import connectSource from 'redux-source-connect';
import { connect } from 'redux-cube';

import { actions as starWarsActions, starWarsSource } from '../ducks/starWars';
import withNotify from '../../common/hoc/withNotify';
import withBlockUi from '../../common/hoc/withBlockUi';
import StarWarsInfo from '../../common/components/StarWarsInfo';
import Shops from './Shops';

@connectSource(starWarsSource, {
  slice: state => state.starWars,
})
@connect({
  selectors: [
    state => state.starWars.characterId,
    state => state.starWars.shipId,
  ],
  transform: (characterId, shipId) => ({
    characterId,
    shipId,
  }),
  actions: starWarsActions,
})
@withBlockUi()
@withNotify()
export default class Info extends PureComponent {
  render() {
    return (
      <div>
        <Helmet
          title="React + Redux + Restful API App - Plain Object Store"
          meta={[{ name: 'description', content: '' }]}
        />
        <StarWarsInfo {...this.props} />
        <Shops />
      </div>
    );
  }
}

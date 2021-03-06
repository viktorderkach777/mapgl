import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {FlyToInterpolator} from 'react-map-gl';

import ControlPanel from './control-panel';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGVya2FjaCIsImEiOiJjanFjdWFzeGozejZnNDNvYmpsbXR1azJzIn0.03a1jcE5orWtncfaDCxuPA'; // Set your mapbox token here

export default class App extends Component {
  state = {
    viewport: {
      latitude: 37.7751,
      longitude: -122.4193,
      zoom: 11,
      bearing: 0,
      pitch: 0
    }
  };

  _onViewportChange = viewport =>
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    });

  _goToViewport = ({longitude, latitude}) => {
    this._onViewportChange({
      longitude,
      latitude,
      zoom: 11,
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration: 3000
    });
  };

  render() {
    const {viewport, settings} = this.state;

    return (
      <div style={{height: '100%'}}>
        <MapGL
          {...viewport}
          {...settings}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onViewportChange={this._onViewportChange}
          dragToRotate={false}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        />
        <ControlPanel
          containerComponent={this.props.containerComponent}
          onViewportChange={this._goToViewport}
        />
      </div>
    );
  }
}

export function renderToDom(container) {
  render(<App />, container);
}

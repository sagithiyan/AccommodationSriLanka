import React from "react";
import keplerGlReducer from "kepler.gl/reducers";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { taskMiddleware } from "react-palm/tasks";
import { Provider, useDispatch } from "react-redux";
import KeplerGl from "kepler.gl";
import { addDataToMap } from "kepler.gl/actions";
import useSwr from "swr";


const reducers = combineReducers({
  keplerGl: keplerGlReducer
});
const store = createStore(reducers, {}, applyMiddleware(taskMiddleware));

export default function App() {
  return <Provider store={store}>
    <Map/>
    </Provider>;
}

function Map(){
  const dispatch = useDispatch();
  const { data } = useSwr("geo", async () => {
    const response = await fetch("https://raw.githubusercontent.com/sagithiyan/travel-advise/master/geo.json");
    const data = await response.json();
    return data; 
  });
  
console.log(data);
  React.useEffect(() => {
    if (data) {
      dispatch(
        addDataToMap({
          datasets: {
            info: {
              label: "geo",
              id: "geo"
            },
            data
          },
          option: {
            centerMap: true,
            readOnly: false
          },
          config: {}
        })
      );
    }
  }, [dispatch, data]);


  return (
    <KeplerGl
      id="geo"
      mapboxApiAccessToken={'pk.eyJ1Ijoic2FjaGluc2FnaSIsImEiOiJja2ZqZ2J5cm8wNzNnMndxbTBseTRiOXFyIn0.1SIKzv5lwaJil3t_STLsuQ'}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
}
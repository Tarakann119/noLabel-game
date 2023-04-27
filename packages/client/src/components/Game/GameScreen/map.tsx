import { FC, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TGameSettings } from '@typings/app.typings';
import classNames from 'classnames';

import { TGameMap, TGameScreen } from '../Game.typings';
import { GameContext } from '../GameContext';
import { setMap } from '../slice';

const mapsSettings = import.meta.glob(`../../../../public//game/maps/*.json`);

export const MapScreen: FC<TGameScreen> = ({ className }) => {
  const dispatch = useDispatch();
  const { setGameScreen } = useContext(GameContext);
  const [maps, setMaps] = useState<TGameMap[]>([]);

  const handleStartLevel = (mapName: string, mapSettings: TGameSettings) => {
    dispatch(setMap({ mapName, mapSettings }));
    setGameScreen('GAME');
  };

  useEffect(() => {
    const getMaps = async () => {
      const result = Object.keys(mapsSettings).map(async (path) => {
        const beforeMapName = path.lastIndexOf('-') + 1;
        const afterMapName = path.lastIndexOf('.');
        const mapName = path.substring(beforeMapName, afterMapName);

        const settings = await mapsSettings[path]();

        return {
          mapSettings: JSON.parse(JSON.stringify(settings)),
          mapName: mapName,
        };
      });

      const resp = await Promise.all(result);
      setMaps(resp);
    };

    getMaps().catch(console.error);
  }, []);

  return (
    <div className={classNames('game-map', className)}>
      {maps &&
        maps.map(({ mapName, mapSettings }) => (
          <div className='game-card' key={mapName}>
            <div className='game-card__body'>
              <div className='game-card__header'>
                <picture className='game-card__img-wrap'>
                  <img
                    className='game-card__lvl'
                    src={`./game/assets/interface/numbers/num_${mapName}.png`}
                    alt=''
                  />
                </picture>
              </div>
              <div className='game-body'>
                <picture className='game-card__img-wrap'>
                  <img
                    className='game-card__stars'
                    src='./game/assets/interface/table/star_1.png'
                    alt=''
                  />
                </picture>
              </div>
              <div className='game-card__footer'>
                <button
                  className='game-card__button game-button game-button_start'
                  onClick={() => handleStartLevel(mapName, mapSettings)}
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

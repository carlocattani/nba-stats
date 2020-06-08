import React, { useEffect, useState, useMemo, useCallback } from 'react';
import style from './playerPicture.module.scss';
import { Player, fetchPlayerPicture } from '@services';
import noPicture from '@assets/player/no-picture.png';
import { GiBasketballBall } from 'react-icons/gi';

interface PlayerPictureProps {
  player: Player;
}

type PictureUrlByPlayerId = Record<number, string>;

export const PlayerPicture: React.FC<PlayerPictureProps> = ({ player }) => {
  const [loading, setLoading] = useState<boolean>();
  const [pictureUrlByPlayerId, setPictureUrlByPlayerId] = useState<PictureUrlByPlayerId>({});

  const updatePictureUrl = useCallback(
    (playerId: number, pictureUrl: string) => {
      setPictureUrlByPlayerId(pictures => {
        return { ...pictures, [playerId]: pictureUrl };
      });
    },
    [setPictureUrlByPlayerId]
  );

  useEffect(() => {
    if (player && !pictureUrlByPlayerId[player.id]) {
      setLoading(true);
      fetchPlayerPicture(player.first_name, player.last_name)
        .then(picture => {
          if (picture) {
            updatePictureUrl(player.id, window.URL.createObjectURL(picture));
          }
        })
        .catch(() => {
          updatePictureUrl(player.id, noPicture);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    return () => {
      if (pictureUrlByPlayerId) {
        Object.values(pictureUrlByPlayerId).map(window.URL.revokeObjectURL);
      }
    };
  }, [player, pictureUrlByPlayerId]);

  if (!player) {
    return null;
  }

  const loadingAnimation = useMemo(
    () => (
      <div className={style.loading}>
        <GiBasketballBall size='40px' />
      </div>
    ),
    []
  );

  return (
    <div className={style.container}>
      {loading ? (
        loadingAnimation
      ) : (
        <div
          className={style.image}
          style={{ backgroundImage: `url(${pictureUrlByPlayerId[player.id] || noPicture})` }}
        />
      )}
    </div>
  );
};

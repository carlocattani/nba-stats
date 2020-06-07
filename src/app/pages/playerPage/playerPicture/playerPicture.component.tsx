import React, { useEffect, useState, useMemo } from 'react';
import style from './playerPicture.module.scss';
import { Player, fetchPlayerPicture } from '@services';
import noPicture from '@assets/player/no-picture.png';
import { GiBasketballBall } from 'react-icons/gi';

interface PlayerPictureProps {
  player: Player;
}

export const PlayerPicture: React.FC<PlayerPictureProps> = ({ player }) => {
  const [loading, setLoading] = useState<boolean>();
  const [pictureUrl, setPictureUrl] = useState<string>();

  useEffect(() => {
    if (player && !pictureUrl) {
      setLoading(true);
      fetchPlayerPicture(player.first_name, player.last_name)
        .then(picture => {
          if (picture) {
            const imageUrl = window.URL.createObjectURL(picture);
            console.log('createObjectURL', imageUrl);
            setPictureUrl(imageUrl);
          }
        })
        .catch(() => {
          setPictureUrl(noPicture);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    return () => {
      if (pictureUrl && noPicture !== noPicture) {
        window.URL.revokeObjectURL(pictureUrl);
      }
    };
  }, [player, pictureUrl]);

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
          style={{ backgroundImage: `url(${pictureUrl || noPicture}` }}
        />
      )}
    </div>
  );
};

import React from 'react';
import { useParams } from 'react-router-dom';

const PlayerPage: React.FC = () => {
  const { id } = useParams();
  return <h1>Player Page ({id})</h1>;
};

export default PlayerPage;

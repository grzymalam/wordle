import classes from './Tile.module.css';

const Tile = props => {
  const isCorrect = props.correct ? classes.correct : '';
  const isCommon = props.common ? classes.common : '';

  return (
    <div className={`${classes.tile} ${isCorrect} ${isCommon}`}>
      {props.letter}
    </div>
  );
}

export default Tile;
import { DivisionType } from '../../redux/operationsSlice';
import { priceNoDec } from '../../share/utils';
import useLocalStorageState from '../../share/utils/hooks/useLocalStorageState';
import { ArrowIcon } from '../icons/Arrow';
import './Card.scss';

type CardProps = {
  id: DivisionType;
  text: string;
  total: number;
  cardActive: DivisionType;
  setCardActive: (value: DivisionType) => void;
};

const Card = ({ id, text, total, cardActive, setCardActive }: CardProps) => {
  const defaultPercent = Math.floor(Math.random() * (100 - -100 + 1) + -100);
  const [percent] = useLocalStorageState(id, defaultPercent);
  const isPositivePercent = percent > 0;
  const isCurrentActive = cardActive === id;

  return (
    <div
      className={isCurrentActive ? 'active card' : 'card'}
      id={id}
      onClick={() => setCardActive(id)}
    >
      <div
        className={isPositivePercent ? 'percent green-percent' : 'percent red-percent'}
      >
        <ArrowIcon
          stroke={!isCurrentActive && isPositivePercent ? '#54D3C2' : '#FC5C65'}
          rotate={!isPositivePercent ? 180 : undefined}
        />
        {percent} %
      </div>
      <p className="total">₽ {priceNoDec.to(+total)}</p>
      <p className="text">{text}</p>
    </div>
  );
};

export default Card;

/* eslint-disable react/prop-types */

import { priceNoDec } from '../../../utils';
import useLocalStorageState from '../../../utils/hooks/useLocalStorageState';
import { ArrowIcon } from '../icons/Arrow';

import "./Card.scss";

const Card = ({ id, text, total, cardActive, setCardActive }) => {
    const defaultPercent = Math.floor(Math.random() * ((100 - (-100)) + 1) + (-100));
    const [percent] = useLocalStorageState(id, defaultPercent);
    const isPositivePercent = percent > 0;
    const isCurrentActive = cardActive === id;

    return (
        <div className={isCurrentActive ? 'active card' : 'card'} id={id} onClick={() => setCardActive(id)}>
            <div className={isPositivePercent ? 'percent green-percent' : 'percent red-percent'}>
                <ArrowIcon
                    stroke={!isCurrentActive && isPositivePercent ? '#54D3C2' : '#FC5C65'}
                    rotate={!isPositivePercent && 180}
                />
                {percent} %
            </div>
            <p className="total">₽ {priceNoDec.to(+total)}</p>
            <p className="text">{text}</p>
        </div>
    );
};

export default Card;

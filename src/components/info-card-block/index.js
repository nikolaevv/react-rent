import React from 'react';
import InfoCard from '../info-card';

const InfoCardBlock = ({ content }) => {
    return (
        <div className="info-card-block">
            {content.map((data) => (
                <InfoCard {...data} />
            ))}
        </div>
    )
}

export default InfoCardBlock;
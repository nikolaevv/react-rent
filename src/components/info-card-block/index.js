import React from 'react';

const InfoCardBlock = ({ content }) => {
    return (
        <div className="info-card-block">
            <Chip component={company.terminal} />
            <Chip component={`${company.square} М`} />
            <Chip component={`${company.stage}-ый этаж`} />
        </div>
    )
}

export default InfoCardBlock;
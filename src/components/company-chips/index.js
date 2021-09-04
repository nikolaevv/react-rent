import React from 'react';
import { Chip } from '@material-ui/core';

const CompanyChips = ({ company }) => {
    return (
        <div className="chips-block">
            <Chip component={company.terminal} />
            <Chip component={`${company.square} М`} />
            <Chip component={`${company.stage}-ый этаж`} />
        </div>
    )
}

export default CompanyChips;
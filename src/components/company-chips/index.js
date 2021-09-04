import React from 'react';
import { Chip } from '@material-ui/core';

const CompanyChips = ({ company }) => {
    return (
        <div className="chips-block">
            <Chip label={company.terminal} />
            <Chip label={`${company.square} М`} />
            <Chip label={`${company.stage}-ый этаж`} />
        </div>
    )
}

export default CompanyChips;
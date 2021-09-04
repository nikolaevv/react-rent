import React, { useEffect } from 'react';
import {Container, Button, Card, Typography, TextField, CardContent} from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import LockIcon from '@material-ui/icons/Lock';
import DescriptionIcon from '@material-ui/icons/Description';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import CancelIcon from '@material-ui/icons/Cancel';

import { useParams } from "react-router-dom";

import { _api } from '../../../services/consts';
import CompanyChips from '../../company-chips';
import Spinner from '../../spinner';
import InfoCardBlock from '../../info-card-block';
import { useBusiness } from '../../../services/business';

import './styles.css';

const CompanyPage = () => {
    const [ bisiness, getBusiness ] = useBusiness();
    let { id } = useParams();

    useEffect(() => {
        getBusiness(id);
    }, [id]);

    const data = bisiness ? [
        {
            icon: <DescriptionIcon />,
            title: 'Действующий договор',
            text: (
                <span>Текущий договор ренты, заключённый
                <br/> с данной компанией</span>
            ),
            buttonText: 'Скачать',
            onClick: () => window.open(`${_abi}/api/businesses/${id}/agreement`)
        },
        {
            icon: <QueryBuilderIcon />,
            title: 'История платежей',
            text:  'История платежй по договору за определённый период.',
            buttonText: 'Скачать',
            onClick: () => {}
        },
        {
            icon: <LockIcon />,
            title: 'Договор аренды защищён смарт-контрактом',
            text: (
                <span>Действует до: { new Date(bisiness.termination_time).toDateString() }
                <br/>Автоплатёж: {bisiness.autopayment ? 'активирован' : 'не активирован'}
                <br/>Ставка ренты: {bisiness.rent_rate}%<br/>
                {bisiness.debt > 0 && (
                    <span>
                        <Typography  variant="h6">
                            Задолженность
                        </Typography>
                        Сумма неустойки: {bisiness.debt}$
                        <br/>Доля неустойки: {bisiness.debt / bisiness.rent_rate}%
                    </span>
                )}
                {bisiness.debt == 0 && (
                    <Typography  variant="h6">
                        Нет задолженности
                    </Typography>
                )}
                </span>
            ),
            onClick: () => {}
        },
        {
            icon: <CancelIcon />,
            title: 'Расторжения договора',
            text: (
                <span>Отправить арендатору уведомления о
                <br/>краткосрочном расторжении договора
                <br/>аренды.
                <br/>Уведомление автоматически отправится
                <br/>через три дня.</span>
            ),
            buttonText: 'Отправить',
            onClick: () => {}
        },
        {
            icon: <PhoneIcon />,
            title: 'Связь',
            text: (
                <span>Эл. поста: {bisiness.email}
                <br/>Телефон: {bisiness.phone}</span>
            ),
            buttonText: 'Скачать',
            onClick: () => {}
        },
    ] : [];

    return (
        bisiness ? (
            <Container className="company-container">
                <Typography variant="h3">{bisiness.title}</Typography>
                <Card className="company-card">
                    <CompanyChips company={bisiness} />
                    <CardContent>
                        <InfoCardBlock content={data} />
                    </CardContent>
                </Card>
            </Container> 
        ) : <Spinner />
    )
}

export default CompanyPage;
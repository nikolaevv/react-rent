import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Container, Button, Card, Typography, TextField, CardContent} from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import LockIcon from '@material-ui/icons/Lock';
import DescriptionIcon from '@material-ui/icons/Description';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import CancelIcon from '@material-ui/icons/Cancel';

import { withRouter } from 'react-router';
import { useParams } from "react-router-dom";
import {useUser} from '../../../services/user';

import {_api} from '../../../services/consts';
import CompanyChips from '../../company-chips';
import Spinner from '../../spinner';
import InfoCardBlock from '../../info-card-block';
import {useBusiness} from '../../../services/business';
import {useInitPayment} from '../../../services/payments';
import {setCurrentUser} from '../../../actions';


import './styles.css';

const CompanyPage = ({history}) => {
    const [bisiness, getBusiness] = useBusiness();
    const [user, setUser] = useUser();
    const [paymentInit, initPayment] = useInitPayment();
    let currentUser = useSelector((state) => state.businesses);
    let {id} = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        let canceled = false;

        getBusiness(id);

        if(paymentInit) {
            document.location.href = paymentInit.url;
        }
        

        setUser();
        !canceled & dispatch(setCurrentUser(user));
        

        return () => canceled = true;
    }, [id, paymentInit]);

    if (!bisiness || !user) {
        return <div></div>
    }
    console.log(user);
    const data = user.role === 'AIRPORT' ? [
        {
            icon: <PhoneIcon />,
            title: 'Связь',
            text: (
                <span>Эл. почта: {bisiness.email}
                <br/>Телефон: {bisiness.phone}</span>
            ),
            buttonText: 'Перейти в чат',
            onClick: () => {history.push(`/businesses/${bisiness.id}/chat`)}
        },
        {
            icon: <DescriptionIcon />,
            title: 'Действующий договор',
            text: (
                <span>Текущий договор ренты, заключённый
                <br/> с данной компанией</span>
            ),
            buttonText: 'Скачать',
            onClick: () => document.location.href = `${_api}/api/businesses/${id}/agreement`
        },
        {
            icon: <QueryBuilderIcon />,
            title: 'История платежей',
            text:  'История платежй по договору за определённый период.',
            buttonText: 'Скачать',
            onClick: () => document.location.href = `${_api}/api/businesses/${id}/payments`
        },
        {
            icon: <LockIcon />,
            title: 'Договор аренды защищён смарт-контрактом',
            text: (
                <span>Действует до: { new Date(bisiness.termination_time).toDateString() }
                <br/>Автоплатёж: {bisiness.autopayment ? 'активирован' : 'не активирован'}
                <br/>Ставка ренты: {bisiness.rent_rate} ₽<br/>
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
        bisiness.debt > 0 ? {
            icon: <CancelIcon />,
            title: 'Расторжения договора',
            text: (
                <span>Отправить арендатору уведомления о
                <br/>краткосрочном расторжении договора
                <br/>аренды.
                <br/>Уведомление автоматически отправится
                <br/>через несколько дней.</span>
            ),
            buttonText: 'Отправить',
            onClick: () => {}
        } : null,
        
    ] : [
        {
            icon: <PhoneIcon />,
            title: 'Связь',
            text: (
                <span>Эл. почта: rent@svo.aero
                <br/>Телефон: 8(495)578-65-65</span>
            ),
            buttonText: 'Перейти в чат',
            onClick: () => {history.push(`/businesses/${bisiness.id}/chat`)}
        },
        {
            icon: <DescriptionIcon />,
            title: 'Действующий договор',
            text: (
                <span>Текущий договор ренты, заключённый
                <br/> с аэропортом</span>
            ),
            buttonText: 'Скачать',
            onClick: () => document.location.href = `${_api}/api/businesses/${id}/agreement`
        },

        !bisiness.autopayment ? {
            icon: <CancelIcon />,
            title: 'Регулярные платежи',
            text: (
                <span>❗Подключите автоматический платёж 
                <br/>для начала работы</span>
            ),
            buttonText: 'Отправить',
            onClick: () => {
                initPayment(bisiness.id, 1);
                
                
            }
        } : null,
    ];

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

export default withRouter(CompanyPage);
import styled from 'styled-components';
import {Link} from 'react-scroll'
import {Link as LinkR} from 'react-router-dom'

export const Button = styled(Link)`
    border-radius: 50px;
    background: ${({primary}) => (primary ? "#28ADF6" : '#28ADF6')};
    white-space: nowrap;
    padding: ${({big}) => (big ? '14px 48px' : '12px 35px')};
    color: ${({dark}) => (dark ? '#010606': '#fff')};
    font-size: ${({fontBig})=> (fontBig ? '20px': '16px')};
    outline: none;
    border: none;
    cursor: pointer;
    text-align: right;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    /* padding-right: 10px; */
    margin: 0 15px;

    &:hover{
        transition: all 0.2s ease-in-out;
        background: ${({primary}) => (primary ? "#fff":  "#01BF71")};
    }
`
export const ButtonR = styled(LinkR)`
    border-radius: 50px;
    background: ${({primary}) => (primary ? "#005098" : '#005098')};
    white-space: nowrap;
    padding: ${({big}) => (big ? '14px 48px' : '12px 35px')};
    color: ${({dark}) => (dark ? '#010606': '#fff')};
    font-size: ${({fontBig})=> (fontBig ? '20px': '16px')};
    outline: none;
    border: none;
    cursor: pointer;
    text-align: right;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    /* padding-right: 10px; */
    margin: 0 15px;
    text-decoration:none;

    &:hover{
        transition: all 0.2s ease-in-out;
        background: ${({primary}) => (primary ? "#fff":  "#01BF71")};
    }
`
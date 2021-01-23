import styled from 'styled-components'

export const EventHeader = styled.h1`
    color:#28ADF6;
    font-weight: normal;
    font-size: 42px;
`
export const EventContainer = styled.div`
/* border: 1px solid; */
    display: grid;
    /* grid-template-rows: 80px 100px; */
    text-align: left;
    width: 500px;
    height: auto;
    padding-left: 40px;
    padding-bottom: 10px;
	background: #F8F8F8;
    border-radius: 10px;
    margin: 15px 15px;
    /* grid-gap: -10px; */
`
export const EventName = styled.p`
/* border: 1px solid; */
    font-size: 24px;
	/* padding: 0px 0px; */
	margin: 20px 0px;
	color: #28ADF6;
`
export const DescWrapper = styled.div`
    /* border: 1px solid; */
    justify-items: center;
    height: 80px;
    display: flex;
    justify-content:space-evenly;
`
export const SubDesc = styled.div`
    /* border: 1px soslid; */
    display: flex;
    margin: 10px;
    
`
export const Label = styled.p`
    font-size: 10px;
    /* border: 1px solid; */
	/* padding: 0px 0px; */
	/* margin: 20px 0px; */
	color: #28ADF6;
`
export const EventValue = styled.p`
    font-size: 18px;
    font-weight: 200;
    /* border: 1px solid; */
    margin-left: 20px;
	/* padding: 0px 0px; */
	/* margin: 20px 0px; */
    color: ${
    ({score}) => 
    ((score == 1) ? '#7E0C85': (score == 2) ? '#F82E06' : (score == 3) ? '#F6AB00': (score == 4) ? '#06F8DB': (score == 5) ? '#4FEE24' : '#818181')};
`

export const EventListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    grid-template-columns: auto auto;
    grid-column-gap: 50px;
    align-items: center;
   
`
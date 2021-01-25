import styled from 'styled-components'


export const EventCreateContainer = styled.div`
    width:auto;
	padding:30px;
	/* margin:40px auto; */
	background: #B3DFF7;
    /* border-radius: 10px; */
    display: flex;
    justify-content: center;
    @media screen and (max-width: 768px) {
        padding: 100px 0;
    }
`

export const EventCreateWrapper = styled.div`
    width: 400px;
    padding: 30px;
	background: #F8F8F8;
    border-radius: 20px 20px 2px 2px;
    margin-top: 15px;
	margin-bottom: 10px;
`
export const EventContentWrapper = styled.div`
    /* display: grid; */
    justify-content: center;
    height: 100%;
    margin-top: -10px;
    /* border: 1px solid #257C9E; */
`

export const EventHeadLine = styled.p`
    font-size: 36px;
   background: #28ADF6;
	padding: 20px 30px 15px 30px;
	margin: -30px -30px 30px -30px;
	border-radius: 10px 10px 0 0;
	color: #fff;
	/* font: normal 30px 'Bitter', serif; */
	/* border: 1px solid #257C9E; */
    
`
export const Eventh2 = styled.p`
    font-size: 24px;
	/* padding: -20px 0px; */
	/* margin: 20px 0px; */
	color: #28ADF6;
	/* font: normal 30px 'Bitter', serif; */
	/* border: 1px solid #257C9E; */
    
`

export const EventNaming = styled.input`
    display: block;
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
    /* margin: -10px 0; */
	width: 100%;
	padding: 10px;
	border-radius: 6px;
	-webkit-border-radius:6px;
	-moz-border-radius:6px;
	border: 2px solid #fff;
	box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.33);
	-moz-box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.33);
	-webkit-box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.33);
`
export const EventDesc = styled.textarea`
    display: block;
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
    /* margin: -10px 0; */
	width: 100%;
    /* height: 20px; */
	padding: 20px 20px;
	border-radius: 6px;
	-webkit-border-radius:6px;
	-moz-border-radius:6px;
    resize: none;
	border: 2px solid #fff;
	box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.33);
	-moz-box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.33);
	-webkit-box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.33);
`

export const ButtonWrapper = styled.div`
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    padding: 0 15px;
    align-items: center;
`
export const ImgWrap = styled.div`
    max-width: 555px;
    height: 100%;
    @media screen and (max-width: 768px) {
        display: none;
    }
`
export const Img = styled.img`
    width: 100%;
    margin: 0 0 10px 0;
    padding-right: 0;
`
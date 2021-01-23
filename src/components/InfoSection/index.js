import React from 'react'
import { Button, ButtonR } from '../ButtonElement'
import { Column2, Img, ImgWrap, InfoContainer, InfoWrapper, InfoRow, Column1, TextWrapper, TopLine, Heading, Subtitle, BtnWrap } from './InfoElement'

const InfoSection = ({lightBg, id, imgStart, topLine, lightText, headLine, darkText, desc, buttonLabel, img, alt}) => {
    return (
        <>
        <InfoContainer lightBg={lightBg} id={id}>
            <InfoWrapper>
                <InfoRow imgStart={imgStart}>
                    <Column1>
                    <TextWrapper>
                        <TopLine>{topLine}</TopLine>
                        <Heading lightText={lightText}>{headLine}</Heading>
                        <Subtitle darkText={darkText}>{desc}</Subtitle>
                        <BtnWrap>
                            <ButtonR to="/host">{buttonLabel}</ButtonR>
                        </BtnWrap>
                    </TextWrapper>
                    </Column1>
                    <Column2>
                        <ImgWrap>
                        <Img src={img} alt={alt}></Img>
                        </ImgWrap>
                    </Column2>
                </InfoRow>
            </InfoWrapper>
        </InfoContainer>
        </>
    )
}

export default InfoSection

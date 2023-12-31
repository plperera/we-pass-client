import styled from "styled-components"
import ICON_MAPPING from "../../../../../common/icons/iconsObj";
import { AiOutlineDown } from 'react-icons/ai';
import COLOR_MAPPING from "../../../../../common/icons/colorObj";
import { useEffect } from "react";
import { useState } from "react";

export default function SelectIconAndColor ({form, setForm}) {

    const [ selectedIconName, setSelectedIconName ] = useState(form?.iconName || "RiLockPasswordFill") 
    const [ selectedIcon, setSelectedIcon ] = useState(ICON_MAPPING[selectedIconName]) 
    const [ selectedColor, setSelectedColor ] = useState(form?.color || "#0E5708") 
    const [ showCase, setShowCase ] = useState(undefined)

    useEffect(() => {
        setForm({...form, color: selectedColor, iconName: selectedIconName})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedColor, selectedIconName, form?.name])

    useEffect(() => {
        setSelectedIcon(ICON_MAPPING[selectedIconName])
    }, [selectedIconName])

    function handleShowCase(ref){
        if ( ref === showCase) {
            setShowCase(undefined)
            return
        }
        setShowCase(ref)
        return 
    }

    function handleSelect({type, item}){
        if ( type === "color") {
            setSelectedColor(item)
            return
        }
        setSelectedIconName(item)
        return 
    }


    return(
        <Container>

           <IconSelector onClick={() => handleShowCase("showColorShowcase")}>

                <IconPreviewContainer color={selectedColor}>
                    {selectedIcon}
                </IconPreviewContainer>

                <ArrowDownContainer>
                    <AiOutlineDown/>
                </ArrowDownContainer>

                {showCase === "showColorShowcase" ? (
                    <ShowcaseContainer color={selectedColor}>
                        {Object.entries(ICON_MAPPING).map(([iconName, IconComponent], index) => (
                            <IconComponent key={index} onClick={() => handleSelect({type: "icon", item: iconName})}/>
                        ))}
                    </ShowcaseContainer>
                ):(
                    <></>
                )} 

                

           </IconSelector>

           <ColorSelector onClick={() => handleShowCase("showIconShowcase")}>

                <ColorPreviewContainer >
                    <ColorContainer color={selectedColor}/>
                </ColorPreviewContainer>

                <ArrowDownContainer>
                    <AiOutlineDown/>
                </ArrowDownContainer>

                
                {showCase === "showIconShowcase" ? (
                    <ShowcaseContainer color={selectedColor}>
                        {Object.values(COLOR_MAPPING).map((key, index) => (
                            <ColorContainer key={index} color={key} onClick={() => handleSelect({type: "color", item: key})}/>
                        ))}
                    </ShowcaseContainer>
                ):(
                    <></>
                )} 
                
           </ColorSelector>

        </Container>         
    )
}

const Container = styled.div`
    width: auto;
    height: 40px;
    display: flex;
    column-gap: 1.2vw;
    @media (max-width: 1366px) {
        height: 35px;
    }
    @media (max-width: 850px) {
        width: 100%;
        padding-left: 10vw;
    }
`
const IconSelector = styled.div`
    width: 80px;
    background-color: #d9d9d9;
    display: flex;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
`
const ColorSelector = styled(IconSelector)`
`
const IconPreviewContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70%;
    height: 100%;
    svg {
        font-size: 28px;
        color: ${props => props.color};
        @media (max-width: 1366px) {
            font-size: 25px;
        }
    }
`
const ColorPreviewContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70%;
    height: 100%;
    svg {
        font-size: 28px;
        color: #A7A7A7;
        @media (max-width: 1366px) {
            font-size: 25px;
        }
    }
`
const ArrowDownContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30%;
    height: 100%;
`
const ColorContainer = styled.div`
    width: 27px;
    height: 27px;
    background-color: ${props => props.color};
    border-radius: 50px;
    border: 0px outset #4B4B4B;
    cursor: pointer;
    @media (max-width: 1366px) {
        width: 22px;
        height: 22px;
    }
`
const ShowcaseContainer = styled.div`
    position: absolute;
    cursor: initial;
    width: auto;
    height: auto;
    background-color: #d9d9d9;
    z-index: 2;
    top: 4.5vh;
    right: 0;
    border-radius: 5px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    column-gap: .4vw;
    row-gap: .4vw;
    padding: 10px;
    svg {
        color: ${props => props.color};
        padding: 5px;
        font-size: 35px;
        border-radius: 5px;
        cursor: pointer;
        :hover {
            background-color: #CACACA;
        }
    }
    @media (max-width: 1366px) {
        top: 5.5vh;
    }
    @media (max-width: 850px) {
        top: 5.5vh;
        left: 0;
        width: 250px;
        row-gap: 2vh;
    }
`
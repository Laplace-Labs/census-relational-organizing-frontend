import styled from 'styled-components';

export const NavUl = styled('ul')`
           display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            padding-left: 0;
            margin-bottom: 0;
            list-style: none;
            @media (max-width: 768px){
                flex-direction: column;
            }
`;


export const NavLi = styled('li')`

`;
export const NavA = styled('a')`
         padding: .5rem 1rem;
        text-decoration: none;
        text-transform: uppercase;
        color: ${props => props.theme.colors.black};
        font-weight: 700;
        -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
        &:hover,
        &:focus,
        &:active {
            color: ${props => props.theme.colors.green};
            cursor: pointer;
        }
`

export const SNavUl = styled('ul')`
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            padding-left: 0;
            margin-bottom: 0;
            list-style: none;
            flex-direction: column;
`;

export const SNavLi = styled('li')`
`;

export const SNavA = styled('a')`
         padding: .5rem 1rem;
        text-decoration: none;
        text-transform: uppercase;
        font-size: .9rem;
        color: ${props => props.theme.colors.black};
        font-weight: 700;
        -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
        &:hover,
        &:focus,
        &:active {
            color: ${props => props.theme.colors.white};
            cursor: pointer;
        }

`;

export const CrudNavUl = styled('ul')`

            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            padding-left: 0;
            margin-bottom: 0;
            padding: 1rem 0 1rem;
            list-style: none;
            @media (max-width: 768px){
                flex-direction: column;
            }
`;

export const CrudNavLi = styled('li')`
      padding: .5rem 1rem;
        text-decoration: none;
        text-transform: uppercase;
        font-size: .8rem;
        margin: 0 .5rem;
        color: ${props => props.theme.colors.white};
        font-weight: 700;
        background-color: ${props => props.theme.colors.blue};
        -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
        &:first-child {
            margin-left: 0rem;
        }
        &:last-child {
            margin-right: 0rem;
        }
        &:hover,
        &:focus,
        &:active {
            background-color: ${props => props.theme.colors.green};
            color: ${props => props.theme.colors.white};
            cursor: pointer;
        }
`;

export const CrudNavA = styled('a')`
   

`;
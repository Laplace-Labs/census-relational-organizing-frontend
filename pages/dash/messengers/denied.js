import React from "react";
import Page from "../../../components/Page";
import { withTeamAuth } from '../../../components/Auth';
import { DashSideNav } from '../../../components/SideNavs';
import { CurrentUser } from '../../../lib/constructors/UserConstructor';
import { CurrentQuery } from '../../../lib/constructors/BaseQueryConstructor';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

import { gql } from "apollo-boost";
import { Query } from 'react-apollo';
import Link from "next/link";
import { Box } from '../../../components/Util/Layout';
import { H1 } from '../../../components/Util/Typography';
import { LoadingBar,ErrorMessage } from '../../../components/Util/Loading';
import { Pagination } from "../../../components/Util/ListsAndPagination";
import { DashPaths } from "../../../paths";
import {UsersWhere, UsersSort } from '../../../lib/filters';
import { FilterForm, FilterToggler } from "../../../components/Filters";
import { ActionNav } from '../../../components/Util/Navigation'
import { TeamVolCard } from '../../../components/Cards';

import { i18n, withTranslation } from '../../../lib/i18'


export const GET_USERS_TEAM_DASH_QUERY = gql`
    query getTeamUsers($input: TeamUsersInput!){
        teamUsers(input:$input){
            hasMore
            totalCount
            items {
                id
                firstName
                lastName
                email
                address
                city
                state
                zip5
                phone
                active
                globalPermissions
                teamPermissions {
                    team {
                        id
                        name
                    }
                    permissions
                }
            }
        }
    }
`;

class DeniedVolIndex extends React.Component {
    render(){
        let currentUser = CurrentUser(this.props);
        let currentQuery = CurrentQuery(this.props);
        let currentTeam = this.props.currentTeam ? this.props.currentTeam : null;

        return(
            <Page
            currentUser={currentUser}
            sideNavComponent={<DashSideNav currentUser={currentUser} currentTeam={currentTeam}/>}
            pageTitle={`${currentTeam.name} ${this.props.t('DASHBOARD')}`}

            >
                <Container>
                    <Row bsPrefix="row py-5">
                        <Col md={12}>

                        <Query
                            query={GET_USERS_TEAM_DASH_QUERY}
                            fetchPolicy="cache-and-network"
                            variables={{
                                input:{
                                    limit: currentQuery.perPage,
                                    offset: currentQuery.offset,
                                    where: currentQuery.where,
                                    sort: currentQuery.sort,
                                    includePermissions: ['DENIED'],
                                    teamId: currentTeam.id,
                                }
                            }}
                        >
                        {({data, loading, error}) => {
                            return(
                                <React.Fragment>
                                    <Box>
                                        <Row bsPrefix="row align-items-center">
                                            <Col md={3}>
                                                <H1 uppercase> {this.props.t('MESSENGERS')} </H1>
                                            </Col>
                                            <Col md={6}>
                                                {data && data.teamUsers &&
                                                    <Pagination
                                                        totalCount={data.teamUsers.totalCount}
                                                        currentPage={currentQuery.pageNumber}
                                                        perPage={currentQuery.perPage}
                                                        path={DashPaths.vols.index}
                                                        teamSlug={currentTeam.slug}
                                                        t={this.props.t}
                                                    />
                                                }
                                            </Col>
                                            <Col md={3}>
                                                <ActionNav className='justify-content-end'>
                                                     <Link href={{pathname:`${DashPaths.vols.index}`, query: {team: currentTeam.id}}}>
                                                        <Nav.Link href={`${DashPaths.vols.index}?team=${currentTeam.id}`}> {this.props.t('APPLICANTS')} </Nav.Link>
                                                    </Link>
                                                    <FilterToggler />

                                                </ActionNav>
                                            </Col>
                                        </Row>
                                        <LoadingBar active={loading}/>
                                        {error && <ErrorMessage error={error}/>}
                                        

                                        <FilterForm 
                                                primaryFilters={UsersWhere}
                                                sortFilters={UsersSort}
                                                path={DashPaths.vols.index}
                                                currentQuery={currentQuery}
                                                teamSlug={currentTeam.id}

                                            />

                                    </Box>

                                    <Row>
                                        {data && data.teamUsers && data.teamUsers.items && 
                                            data.teamUsers.items.map((item,idx) => {
                                                return(
                                                    <Col lg={4} key={idx}>
                                                        <TeamVolCard vol={item} team={currentTeam}/>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                    <Box>
                                        <LoadingBar active={loading}/>
                                        {data && data.teamUsers &&
                                                    <Pagination
                                                        totalCount={data.teamUsers.totalCount}
                                                        currentPage={currentQuery.pageNumber}
                                                        perPage={currentQuery.perPage}
                                                        path={DashPaths.vols.index}
                                                        teamSlug={currentTeam.slug}
                                                        t={this.props.t}
                                                    />
                                                }
                                    </Box>

                                </React.Fragment>
                            )
                        }}

                        </Query>


                          
                        </Col>
                    </Row>
                </Container>

            </Page>
        )
    }
}

export default withTranslation('common')(withTeamAuth(DeniedVolIndex, {team:['ADMIN'], global:['ADMIN']}));
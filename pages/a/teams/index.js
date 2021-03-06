import React from "react";
import { gql } from "apollo-boost";
import { Query } from 'react-apollo';
import Link from "next/link";
import _ from 'lodash';

import Page from "../../../components/Page";
import { CurrentUser } from '../../../lib/constructors/UserConstructor';
import { CurrentQuery } from '../../../lib/constructors/BaseQueryConstructor';
import { InjectMiddleWhere } from '../../../lib/constructors/InjectMiddleWhere';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

import { Box } from '../../../components/Util/Layout';
import { H1 } from '../../../components/Util/Typography';
import { LoadingBar } from '../../../components/Util/Loading';
import { AdminSideNav } from '../../../components/SideNavs';
import { withGlobalAuth } from "../../../components/Auth";
import { ErrorMessage } from '../../../components/Util/Loading';
import { Pagination } from '../../../components/Util/ListsAndPagination';
import { AdminPaths } from '../../../paths/index';
import { AdminTeamCard } from '../../../components/Cards';
import {TeamsWhere, TeamsSort } from '../../../lib/filters';
import { FilterForm, FilterToggler } from "../../../components/Filters";
import { ActionNav } from '../../../components/Util/Navigation'
import { i18n, withTranslation } from '../../../lib/i18'

export const GET_TEAMS_ADMIN_QUERY = gql`
    query getTeamsAdmin($input: TeamsInput){
        teams(input:$input){
            hasMore
            totalCount
            items {
                id
                name
                description
                active
                slug
                userPermissionSummaryCounts {
                    permission
                    count
                }
                createdAt
                updatedAt
            }
        }
    }
`;
class AdminTeamIndex extends React.Component {
    render(){
        let currentUser = CurrentUser(this.props);
        let currentQuery = CurrentQuery(this.props);
        let sort = currentQuery.sort;
        if(_.isEmpty(sort)){
            sort = {"name": "ASC"}
        }
        return(
            <Page 
                currentUser={currentUser}
                sideNavComponent={<AdminSideNav currentUser={currentUser}/>}
                pageTitle={"Global Admin " + this.props.t('DASHBOARD')}
            >
                <Container>
                    <Row bsPrefix="row py-5">
                        <Col>
                           
                                <Query 
                                    query={GET_TEAMS_ADMIN_QUERY}
                                    variables={{
                                        input: {
                                            limit: currentQuery.perPage,
                                            offset: currentQuery.offset,
                                            where: InjectMiddleWhere(currentQuery.where, {'active': {'eq': true}}),
                                            sort: sort,
                                        }
                                    }}
                                    fetchPolicy="cache-and-network"
                                    >
                                    {({data, loading, error}) => {
                                        return(
                                            <React.Fragment>
                                            <Box>
                                            <Row bsPrefix="row align-items-center">
                                                <Col md={3}>
                                                     <H1>{this.props.t('TEAMS')}</H1>
                                                </Col>
                                                <Col md={6}>
                                                {data && data.teams && 
                                                    <Pagination
                                                        totalCount={data.teams.totalCount}
                                                        currentPage={currentQuery.pageNumber}
                                                        perPage={currentQuery.perPage}
                                                        path={AdminPaths.teams.index}
                                                        trans={this.props.t ? this.props.t : null}
                                                    />
                                                }
                                                </Col>
                                                <Col md={3}>
                                         
                                                        <ActionNav className='justify-content-end'>
                                                            <Link href={AdminPaths.teams.create}>
                                                                <Nav.Link href={AdminPaths.teams.create}> {this.props.t('NEW TEAM')} </Nav.Link>
                                                            </Link>
                                                            <FilterToggler 
                                                            trans={this.props.t ? this.props.t : null}
                                                            />

                                                        </ActionNav>

                                                </Col>
                                            </Row>
                                                <LoadingBar active={loading}/>
                                                {error && <ErrorMessage error={error}/>}
                                               



                                            <FilterForm 
                                                primaryFilters={TeamsWhere}
                                                sortFilters={TeamsSort}
                                                path={AdminPaths.teams.index}
                                                currentQuery={currentQuery}
                                                trans={this.props.t ? this.props.t : null}
                                            />



                                            </Box>
                                                <Row>
                                                    {
                                                        data && data.teams && data.teams.items && 
                                                        data.teams.items.map((item,idx) => {
                                                            return(
                                                                <Col lg={4} key={idx}>
                                                                    <AdminTeamCard team={item} trans={this.props.t ? this.props.t : null}/>
                                                                </Col>
                                                            )
                                                        })
                                                    }
                                                </Row>
                                            <Box>
                                            <LoadingBar active={loading}/>

                                                {data && data.teams && 
                                                    <Pagination
                                                        totalCount={data.teams.totalCount}
                                                        currentPage={currentQuery.pageNumber}
                                                        perPage={currentQuery.perPage}
                                                        path={AdminPaths.teams.index}
                                                        trans={this.props.t ? this.props.t : null}
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

export default withTranslation('common')(withGlobalAuth(AdminTeamIndex, 'ADMIN'));
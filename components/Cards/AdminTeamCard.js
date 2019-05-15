import React from "react";
import Link from "next/link";
import _ from "lodash";
import { Card, CardHeader, CardInner, CardTitle, IconLink, CardParagraph, CardSubTitle, PermContainer, PermTitle, PermCount } from './Styles';
import { Row, Col } from '../Util/Grid';
import { DashPaths, AdminPaths } from '../../paths';

export const AdminTeamCard = (props) => {
    if(!props.team){
        return null;
    }
    const { team } = props;
    const allowedPerms = ["APPLICANT", "MEMBER", "ADMIN"]

    // functional lookup
    const defaultToZero = collection => permission => ({
    permission,
    count: _.get(_.find(collection, { permission }), 'count', 0)
    })

    // partial application to query results
    const paDefaultToZero = defaultToZero(team.userPermissionSummaryCounts)

    // make result
    const permCounts = _(allowedPerms).map(paDefaultToZero).value()

    return(
        <Card>
            <CardHeader>
                    <Link href={{pathname: `${DashPaths.index}`, query: { team: team.slug}}}><IconLink href={`${DashPaths.index}?team=${team.slug}`}><i className="fas fa-tachometer-alt"></i> Dashboard </IconLink></Link>
            </CardHeader>

            <CardInner>
                <CardTitle>{team.name}</CardTitle>
                <CardParagraph>{team.description}</CardParagraph>

                <CardSubTitle> Users </CardSubTitle>
                <PermContainer>
                        {permCounts.map((perm, idx) => {
                        
                            return(
                                <Row key={idx}>
                                    <Col classNames={'col-8'}>
                                        <PermTitle>{perm.permission}</PermTitle>
                                    </Col>
                                    <Col classNames={'col-4'}>
                                        <PermCount>{perm.count}</PermCount>
                                    </Col>
                                </Row>


                                )
                            })}
                </PermContainer>
            </CardInner>

    
     
        </Card>
    )
}

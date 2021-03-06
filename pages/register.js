
import React from "react";
import  {GetCurrentUser}  from '../lib/serverQueries/CurrentUser';
import { CurrentUser } from '../lib/constructors/UserConstructor';
import Page from '../components/Page';
import { RegisterForm } from '../components/Auth/RegisterForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { i18n, withTranslation } from '../lib/i18'


class Index extends React.Component {
  static async getInitialProps({...ctx}) {
    const { currentUser } = await GetCurrentUser(ctx.apolloClient);
    return { currentUser, namespacesRequired:['common'] };
  }

  render(){
    let currentUser = CurrentUser(this.props);
    let teamSlug = null;
    if(this.props.query && this.props.query.team){
        teamSlug = this.props.query.team
    }
    return(
      <Page padTop currentUser={currentUser}>  
        <Container>
            <Row bsPrefix={'row justify-content-center py-5'}>
                <Col md={6}>
                    <RegisterForm teamSlug={teamSlug}/>
                </Col>
            </Row>
        </Container>
      </Page>

    )
  }
}

export default withTranslation('common')(Index);
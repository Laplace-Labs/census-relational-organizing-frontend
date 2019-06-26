import Link from 'next/link';
import { DashPaths } from '../../../paths/index';
import { SNavUl, SNavA, SNavLi } from '../../Util/Navigation';


export const DashSideNav = (props) => {
    if(!props.currentUser){
        return null;
    }
    const { currentUser,currentTeam } = props;
    return(
        <SNavUl>
            {
            (currentUser.hasGlobalPermission('ADMIN') || currentUser.hasTeamPermission(currentTeam.slug, 'ADMIN') || currentUser.hasTeamPermission(currentTeam.slug, 'MEMBER')) && 
              <SNavLi><Link href={{pathname: `${DashPaths.index}`, query: {team: currentTeam.slug}}}><SNavA href={`${DashPaths.index}?team=${currentTeam.slug}`}>Dash</SNavA></Link></SNavLi>
            }
             {
            (currentUser.hasGlobalPermission('ADMIN') || currentUser.hasTeamPermission(currentTeam.slug, 'ADMIN') || currentUser.hasTeamPermission(currentTeam.slug, 'MEMBER')) && 
              <SNavLi><Link href={{pathname: `${DashPaths.targets.index}`, query: {team: currentTeam.slug}}}><SNavA href={`${DashPaths.targets.index}?team=${currentTeam.slug}`}>Peer Targets</SNavA></Link></SNavLi>
            }
              {
            (currentUser.hasGlobalPermission('ADMIN') || currentUser.hasTeamPermission(currentTeam.slug, 'ADMIN')) && 
              <SNavLi><Link href={{pathname: `${DashPaths.vols.index}`, query: {team: currentTeam.slug}}}><SNavA href={`${DashPaths.vols.index}?team=${currentTeam.slug}`}>Volunteers</SNavA></Link></SNavLi>
            }
            {
            (currentUser.hasGlobalPermission('ADMIN') || currentUser.hasTeamPermission(currentTeam.slug, 'ADMIN')) && 
              <SNavLi><Link href={{pathname: `${DashPaths.tibs.questions}`, query: {team: currentTeam.slug}}}><SNavA href={`${DashPaths.tibs.questions}?team=${currentTeam.slug}`}>Questions</SNavA></Link></SNavLi>
            }
            {
            (currentUser.hasGlobalPermission('ADMIN') || currentUser.hasTeamPermission(currentTeam.slug, 'ADMIN')) && 
              <SNavLi><Link href={{pathname: `${DashPaths.tibs.actions}`, query: {team: currentTeam.slug}}}><SNavA href={`${DashPaths.tibs.actions}?team=${currentTeam.slug}`}>Actions</SNavA></Link></SNavLi>
            }
            
        </SNavUl>
    )
}
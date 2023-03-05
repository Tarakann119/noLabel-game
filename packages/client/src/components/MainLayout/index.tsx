import { Component, ReactNode } from 'react'
import HeaderComponent from '../Header'
//import { RoutesNameList, getImagePath } from '../../constant'
import './index.css'

type MainLayoutProps = {
  children: ReactNode
  background: string
}

export class MainLayout extends Component<MainLayoutProps> {
  imageNames: { [key: string]: string } = {
 //   [RoutesNameList.Main]: 'Main',
  //  [RoutesNameList.Forum]: 'Forum',
 //  [RoutesNameList.Login]: 'Login',
  //  [RoutesNameList.Leaderboard]: 'Leaderboard',
  //  [RoutesNameList.Profile]: 'Profile',
  }
//  getBackgroundImgPath(): string {
 //   return getImagePath(`${this.imageNames[this.props.background]}.png`)
  }
 // render() {
//   return (
//      <div
 //       className="layout"
 //      >
 //       <div className="main-wrapper"
 //            style={{
  //             backgroundImage: `url(${this.getBackgroundImgPath()})`,
  //           }}>
   //       <HeaderComponent />
   //       <div className="content-wrapper">{this.props.children}</div>
   //     </div>
   //   </div>
 //   )
//  }
//}

import React, { useContext,Fragment } from "react"
import { Link } from "react-router-dom";
import { AuthContext } from "App"
import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

// images
import MainLogo from '../images/logo.png';
import MainCoverImage from '../images/main-cover-image.png';
import HomeImage from '../../images/restaurant-image.jpg';


const EnhancedSwipeableViews = autoPlay(SwipeableViews);


//divタグに対してデザインを指定している 
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;


const MainLogoImage = styled.img`
  height: 90px;
`

const MainCoverImageWrapper = styled.div`
  text-align: center;
`;

const MainCover = styled.img`
  height: 600px;
`;
const HomesContentsList = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 220px;
  margin-bottom: 150px;

  display: -webkit-flex;
  -webkit-justify-content: space-between;
`;

const HomesContentWrapper = styled.div`
  width: 450px;
  height: 300px;
`;
const ExplainContentWrapper = styled.div`
  width: 450px;
  height: 300px;
`;

const ExplainContentsList = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 150px;
  margin-right: 300px;
  margin-left: 300px;
  display: -webkit-flex;
  -webkit-justify-content: space-between;
`;

const ExplainContentsMessageBox = styled.div`
  background-color: #A9A9A9;
`;
const ExplainContentsMessage = styled.p`
  color: #FFFFFF;
  font-size: 20px;
  line-height: 1.8em;
`;
const ExplainContentsTitle = styled.h1`
  color: #777777;
  font-size: 100px;
`;

const ExplainContentsSubTitle = styled.h2`
  color: #404040;
  font-size: 46px;
`;

const SlideImageNode = styled.img`
  width: 1000px;
  height: 500px;
  padding: 48px;
`;

const HomesImageNode = styled.img`
  width: 80%;
`;

const MainText = styled.p`
  color: black;
  font-size: 18px;
`;

const SubText = styled.p`
  color: black;
  font-size: 12px;
`;
// とりあえず認証済みユーザーの名前やメールアドレスを表示
const Top: React.FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext)

  return (
    <>
      {
 <Fragment>

 <MainCoverImageWrapper>
 {/* <EnhancedSwipeableViews enableMouseEvents>
 <SlideImageNode src={HomeImage} />
 <SlideImageNode src={HomeImage} />
 <SlideImageNode src={HomeImage} />
</EnhancedSwipeableViews> */}
<ExplainContentsList>
 <ExplainContentWrapper>
   <ExplainContentsTitle>Creative</ExplainContentsTitle>
   <ExplainContentsSubTitle>What want you create?</ExplainContentsSubTitle>      
   <MainText>イラスト・写真・音楽・映像</MainText>
   <MainText>クリエイターの創作物を感じましょう</MainText>
 </ExplainContentWrapper>
 <ExplainContentWrapper>
   <ExplainContentsMessageBox>
     <div style={{ padding: '50px' }}>
     <ExplainContentsMessage><h2>Photo · Music · Video</h2></ExplainContentsMessage>
     <ExplainContentsMessage>Let's  post this!</ExplainContentsMessage>
     <ExplainContentsMessage>I made a site that creators can contribute.
                  You can post photos, music and videos on this site. Please choose the work you want to post and post. For heavy-sized files, loading of the site is delayed.
                  The quality is not high, but please enjoy it.</ExplainContentsMessage>
     </div>
   </ExplainContentsMessageBox>
 </ExplainContentWrapper>
</ExplainContentsList>
 </MainCoverImageWrapper>

 <HomesContentsList>
   {

         <Link to={`/photos`} style={{ textDecoration: 'none' }}>
           <HomesContentWrapper>
             <HomesImageNode src={HomeImage} />
             <MainText>サンプルテキスト</MainText>
             <SubText>サブテキスト</SubText>
           </HomesContentWrapper>
         </Link>
   }
    {
         <Link to={`/movies`} style={{ textDecoration: 'none' }}>
           <HomesContentWrapper>
             <HomesImageNode src={HomeImage} />
             <MainText>サンプルテキスト</MainText>
             <SubText>サブテキスト</SubText>
           </HomesContentWrapper>
         </Link>
   }
   {
         <Link to={`/sounds`} style={{ textDecoration: 'none' }}>
           <HomesContentWrapper>
             <HomesImageNode src={HomeImage} />
             <MainText>サンプルテキスト</MainText>
             <SubText>サブテキスト</SubText>
           </HomesContentWrapper>
         </Link>
   }
 </HomesContentsList>
 
</Fragment>

      }
    </>
    
  )
}

export default Top
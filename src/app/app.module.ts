import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Registration2Page } from '../pages/registration2/registration2';
import { WebserviceProvider } from '../providers/webservice/webservice';
import { HttpClientModule } from '@angular/common/http';
import { TokenPage } from '../pages/token/token';
import { Camera } from '@ionic-native/camera';
import { LoginPage } from '../pages/login/login';
import { Registration1Page } from '../pages/registration1/registration1';
import { ProfilePage } from '../pages/profile/profile';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';

import { InternationalPhoneModule } from 'ng4-intl-phone';
import { GetStartedPage } from '../pages/get-started/get-started';

import { Globalization } from '@ionic-native/globalization';

import { ServicepagemodalPage } from '../pages/servicepagemodal/servicepagemodal';
import { CountrymodalPage } from '../pages/countrymodal/countrymodal';
import { LanguagemodalPage } from '../pages/languagemodal/languagemodal';
import { EditservicepagemodalPage } from '../pages/editservicepagemodal/editservicepagemodal';
import { ExplorePage } from '../pages/explore/explore';
import { CommentmodalPage } from '../pages/commentmodal/commentmodal';
import { DotsmodalPage } from '../pages/dotsmodal/dotsmodal';
import { EditpostPage } from '../pages/editpost/editpost';
import { NotificationPage } from '../pages/notification/notification';
import { PointWalletPage } from '../pages/point-wallet/point-wallet';

import { NativeAudio } from "@ionic-native/native-audio";
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { MyWorksPage } from '../pages/my-works/my-works';
import { ReportPage } from '../pages/report/report';
import { ShareAndEarnPage } from '../pages/share-and-earn/share-and-earn';
import { SearchPage } from '../pages/search/search';
import { UserprofilePage } from '../pages/userprofile/userprofile';
import { FriendsPage } from '../pages/friends/friends';
import { RequestServicePage } from '../pages/request-service/request-service';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Geolocation } from '@ionic-native/geolocation';
import { StorypagePage } from '../pages/storypage/storypage';
import { FaqPage } from '../pages/faq/faq';
import { CategoryServiceListPage } from '../pages/category-service-list/category-service-list';
import { ServiceApplyPage } from '../pages/service-apply/service-apply';
import { MypostPage } from '../pages/mypost/mypost';
import { EditservicePage } from '../pages/editservice/editservice';
import { CurrentpostComponent } from '../components/currentpost/currentpost';
import { FriendforsharePage } from '../pages/friendforshare/friendforshare';
import { Ionic2RatingModule } from 'ionic2-rating';
import { CurrentpostPage } from '../pages/currentpost/currentpost';
import { EditexploremodalPage } from '../pages/editexploremodal/editexploremodal';
import { HidesearchbarDirective } from '../directives/hidesearchbar/hidesearchbar';
import { TextchatModalPage } from '../pages/textchat-modal/textchat-modal';
import { NgxMasonryModule } from 'ngx-masonry';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicImageViewerModule } from "ionic-img-viewer";
import { ServiceImageModalPage } from '../pages/service-image-modal/service-image-modal';
import { DetialsModalPage } from '../pages/detials-modal/detials-modal';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SharePreviewPage } from '../pages/share-preview/share-preview';
import { FriendlistPage } from '../pages/friendlist/friendlist';
import { CreategroupchatPage } from '../pages/creategroupchat/creategroupchat';
import { CreategroupPage } from '../pages/creategroup/creategroup';
import { GroupchatPage } from '../pages/groupchat/groupchat';
import { GroupchatditailsPage } from '../pages/groupchatditails/groupchatditails';
import { AddgroupuserPage } from '../pages/addgroupuser/addgroupuser';
import { DetailPage } from '../pages/detail/detail';
import { CreatepostPage } from '../pages/createpost/createpost';
import { DisclaimerPage } from '../pages/disclaimer/disclaimer';
import { LoaderPage } from '../pages/loader/loader';
import { MakePaymentPage } from '../pages/make-payment/make-payment';
import { MapNewPage } from '../pages/map-new/map-new';
import { StoryviewlistPage } from '../pages/storyviewlist/storyviewlist';
import { RatingPage } from '../pages/rating/rating';
import { ServiceAcceptedPage } from '../pages/service-accepted/service-accepted';
import { ServicesListPage } from '../pages/services-list/services-list';
import { ServiceAvailableListPage } from '../pages/service-available-list/service-available-list';
import { StoryuploadloaderPage } from '../pages/storyuploadloader/storyuploadloader';
import { UploadPhotoVideoPage } from '../pages/upload-photo-video/upload-photo-video';
import { UploadStoryPage } from '../pages/upload-story/upload-story';
import { OwnListPage } from '../pages/own-list/own-list';
import { Token2Page } from '../pages/token2/token2';
import { LinksPipe } from '../pipes/links/links';
import { TextMaskModule } from 'angular2-text-mask';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ModalPicPage } from '../pages/modal-pic/modal-pic';
// import { WeblinkPipe } from '../pipes/weblink/weblink';
import { HelpPage } from '../pages/help/help';
import { PaymenthistoryPage } from '../pages/paymenthistory/paymenthistory';
import { WeblinkPipe } from '../pipes/weblink/weblink';
import { HttpModule } from '@angular/http';
import { VideoEditor } from '@ionic-native/video-editor';
import { BlocklistPage } from '../pages/blocklist/blocklist';
// import { FileUploadOptions, FileTransferObject,FileTransfer } from '@ionic-native/file-transfer2';
// import { FileTransfer } from '@ionic-native/file-transfer2';





@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Registration1Page,
    Registration2Page,
    TokenPage,
    LoginPage,
    ProfilePage,
    EditProfilePage,
    GetStartedPage,
    ServicepagemodalPage,
    CountrymodalPage,
    LanguagemodalPage,
    EditservicepagemodalPage,
    ExplorePage,
    CommentmodalPage,
    DotsmodalPage,
    EditpostPage,
    NotificationPage,
    PointWalletPage,
    ChangePasswordPage,
    MyWorksPage,
    ReportPage,
    ShareAndEarnPage,
    SearchPage,
    UserprofilePage,
    FriendsPage,
    RequestServicePage,
    StorypagePage,
    FaqPage,
    CategoryServiceListPage,
    ServiceApplyPage,
    MypostPage,
    EditservicePage,
    CurrentpostComponent,
    CurrentpostPage,
    FriendforsharePage,
    EditexploremodalPage,
    // HidesearchbarDirective
    TextchatModalPage,
    ServiceImageModalPage,
    DetailPage,
    DetialsModalPage,
    SharePreviewPage,
    FriendlistPage,
    CreategroupchatPage,
    CreategroupPage,
    GroupchatPage,
    GroupchatditailsPage,
    AddgroupuserPage,
    // newly added pages
    CreatepostPage,
    DisclaimerPage,
LoaderPage,
MakePaymentPage,
MapNewPage,
StoryviewlistPage ,
RatingPage ,
ServiceAcceptedPage ,
ServiceAvailableListPage ,
ServicesListPage ,
StoryuploadloaderPage ,
UploadPhotoVideoPage ,
UploadStoryPage,
OwnListPage,
Token2Page,
LinksPipe,
ModalPicPage,
HelpPage,
PaymenthistoryPage,
WeblinkPipe,
BlocklistPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    InternationalPhoneModule,
    Ionic2RatingModule,
    NgxMasonryModule,
    BrowserAnimationsModule,
    IonicImageViewerModule,
    TextMaskModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Registration1Page,
    Registration2Page,
    TokenPage,
    LoginPage,
    ProfilePage,
    EditProfilePage,
    GetStartedPage,
    ServicepagemodalPage,
    CountrymodalPage,
    LanguagemodalPage,
    EditservicepagemodalPage,
    ExplorePage,
    CommentmodalPage,
    DotsmodalPage,
    EditpostPage,
    NotificationPage,
    PointWalletPage,
    ChangePasswordPage,
    MyWorksPage,
    ReportPage,
    ShareAndEarnPage,
    SearchPage,
    UserprofilePage,
    FriendsPage,
    RequestServicePage,
    StorypagePage,
    FaqPage,
    CategoryServiceListPage,
    ServiceApplyPage,
    MypostPage,
    EditservicePage,
    CurrentpostComponent,
    CurrentpostPage,
    FriendforsharePage,
    EditexploremodalPage,
    TextchatModalPage, 
    ServiceImageModalPage,
    DetailPage,
    DetialsModalPage,
    SharePreviewPage,
    FriendlistPage,
    CreategroupchatPage,
    CreategroupPage,
    GroupchatPage,
    GroupchatditailsPage,
    AddgroupuserPage,
    //newly added pages
    CreatepostPage,
    DisclaimerPage,
LoaderPage,
MakePaymentPage,
MapNewPage,
StoryviewlistPage ,
RatingPage ,
ServiceAcceptedPage ,
ServiceAvailableListPage ,
ServicesListPage ,
StoryuploadloaderPage ,
UploadPhotoVideoPage ,
UploadStoryPage,
HelpPage,
OwnListPage,
Token2Page,
ModalPicPage,
PaymenthistoryPage,
BlocklistPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WebserviceProvider,
    Camera,
    Globalization,
    NativeAudio,
    AndroidPermissions,
    Geolocation,
    SocialSharing,
    File,
    FilePath,
    VideoEditor,
    // FileTransfer
    ],
  exports: [LinksPipe]
})
export class AppModule {}

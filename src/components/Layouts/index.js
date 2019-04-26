/**
 * @description Layouts component
 *              <AppLayout /> & <ContentLayout /> are layouts for content part
 *              and these layouts should be written inside wrapped component to satisfy high cohesion
 *              <BasicLayout /> is used for the full page,
 *              and should be written in parent component of wrapped component
 */
import BasicLayout from './BasicLayout'                 // BasicLayout: layout for the full page
import AppLayout from './AppLayout'                     // AppLayout: for content needed to be placed in the middle
import ContentLayout from './ContentLayout'             // ContentLayout: for default content and content needed sidebar

export { BasicLayout, AppLayout, ContentLayout }